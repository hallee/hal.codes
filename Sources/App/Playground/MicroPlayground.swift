//
//  MicroPlayground.swift
//  hal.codes
//
//  Created by Hal Lee on 6/26/18.
//

import Basic
import Utility
import Foundation
#if os(Linux)
    import Glibc
#else
    import Darwin
#endif

class MicroPlayground {
    
    static let swiftVersion = "4.1.2-RELEASE"
    private let processSet = ProcessSet()
    private let projectPath: String
    lazy var toolchainPath: String = {
        return projectPath + "/Toolchains/swift-\(MicroPlayground.swiftVersion).xctoolchain/usr/bin"
    }()
    
    private var errorParser = PlaygroundErrorParser()
    
    enum Error: Swift.Error {
        case failed(String)
    }
    
    init(_ projectDirectoryPath: String) {
        projectPath = projectDirectoryPath
    }
    
    func run(code: String) -> PlaygroundResult {
        let result = buildAndRun(code: code)
        var outputString = ""
        if let errors = result.errors {
            for error in errors {
                outputString += error.description + "\n"
            }
            return PlaygroundResult(text: "", error: outputString)
        } else {
            outputString += result.text + "\n"
            return PlaygroundResult(text: outputString, error: "")
        }
    }
    
    private func buildAndRun(code: String) -> RunResult {
        do {
            let buildResult = try build(code: code)
            let runResult = try run(binaryPath: buildResult.dematerialize())
            return RunResult(text: try runResult.dematerialize(), errors: nil)
        } catch MicroPlayground.Error.failed(let output) {
            let items = try? errorParser.parse(input: output)
            return RunResult(text: output, errors: items)
        } catch {
            return RunResult(text: error.localizedDescription, errors: nil)
        }
    }
    
    private func build(code: String) throws -> Result<AbsolutePath, Error> {
        let fileSystem = Basic.localFileSystem
        let projectDirectoryPath = AbsolutePath(projectPath)
        
        let temporaryBuildDirectory = try TemporaryDirectory(prefix: ProcessInfo.processInfo.globallyUniqueString)
        let mainFilePath = temporaryBuildDirectory.path.appending(RelativePath("main.swift"))
        let binaryFilePath = temporaryBuildDirectory.path.appending(component: "main")
        let frameworksDirectory = projectDirectoryPath.appending(component: "Frameworks")
        
        try fileSystem.writeFileContents(mainFilePath, bytes: ByteString(encodingAsUTF8: "" + code))
        
        let target: String
        #if os(macOS)
            target = "x86_64-apple-macosx10.11"
        #endif
        #if os(Linux)
            target = "x86_64-unknown-linux-gnu"
        #endif
        
        var cmd = [String]()
        cmd += ["\(toolchainPath)/swift"]
        cmd += ["--driver-mode=swiftc"]
        cmd += ["-swift-version", "4"]
        #if DEBUG
            cmd += ["-v"]
        #endif
        cmd += ["-gnone"]
        cmd += ["-suppress-warnings"]
        cmd += ["-module-name", "SwiftPlayground"]
        #if os(Linux)
            cmd += ["-module-link-name","Glibc"]
        #endif

        cmd += ["-target", target]
        #if os(macOS)
            cmd += ["-F", frameworksDirectory.asString]
            cmd += ["-Xlinker", "-rpath", "-Xlinker", frameworksDirectory.asString]
        #endif
        
        // Optimization or not
        #if os(macOS)
            cmd += ["-sanitize=address"]
        #else
            cmd += ["-O"]
        #endif
        // cmd += ["-enforce-exclusivity=checked"] // needs -Onone
        // Enable JSON-based output at some point.
        // cmd += ["-parseable-output"]
        if let sdkRoot = sdkRoot() {
            cmd += ["-sdk", sdkRoot.asString]
        }
        cmd += ["-o", binaryFilePath.asString]
        cmd += [mainFilePath.asString]
        
        let process = Basic.Process(arguments: cmd, redirectOutput: true, verbose: false)
        try processSet.add(process)
        try process.launch()
        let result = try process.waitUntilExit()
        
        switch result.exitStatus {
        case .terminated(let exitCode) where exitCode == 0:
            return Result.success(binaryFilePath)
        case .signalled(let signal):
            return Result.failure(Error.failed("Terminated by signal \(signal)"))
        default:
            return Result.failure(Error.failed(try (result.utf8Output() + result.utf8stderrOutput()).chuzzle() ?? "Terminated."))
        }
    }
    
    private func run(binaryPath: AbsolutePath) throws -> Result<String, Error> {
        var cmd = [String]()
        #if os(macOS)
            // Use sandbox-exec on macOS. This provides some safety against arbitrary code execution.
            cmd += ["sandbox-exec", "-p", sandboxProfile()]
        #endif
        cmd += [binaryPath.asString]
        
        let process = Basic.Process(arguments: cmd, environment: [:], redirectOutput: true, verbose: false)
        try processSet.add(process)
        try process.launch()
        let result = try process.waitUntilExit()
        
        // Remove container directory. Cleanup after run.
        try FileManager.default.removeItem(atPath: binaryPath.parentDirectory.asString)
        
        switch result.exitStatus {
        case .terminated(let exitCode) where exitCode == 0:
            return Result.success(try result.utf8Output().chuzzle() ?? "")
        case .signalled(let signal):
            return Result.failure(Error.failed("Terminated by signal \(signal)"))
        default:
            return Result.failure(Error.failed(try (result.utf8Output() + result.utf8stderrOutput()).chuzzle() ?? "Terminated."))
        }
    }
    
    private func sandboxProfile() -> String {
        var output = """
        (version 1)
        (deny default)
        (import \"system.sb\")
        (allow file-read*)
        (allow process*)
        (allow sysctl*)
        (allow file-write*
        """
        for directory in Platform.darwinCacheDirectories() {
            output += "    (regex #\"^\(directory.asString)/org\\.llvm\\.clang.*\")"
            output += "    (regex #\"^\(directory.asString)/xcrun_db.*\")"
        }
        output += ")\n"
        return output
    }
    
    private var _sdkRoot: AbsolutePath?
    private func sdkRoot() -> AbsolutePath? {
        if let sdkRoot = _sdkRoot {
            return sdkRoot
        }
        
        // Find SDKROOT on macOS using xcrun.
        #if os(macOS)
            let foundPath = try? Process.checkNonZeroExit(
                args: "xcrun", "--sdk", "macosx", "--show-sdk-path")
            guard let sdkRoot = foundPath?.chomp(), !sdkRoot.isEmpty else {
                return nil
            }
            _sdkRoot = AbsolutePath(sdkRoot)
        #endif
        
        return _sdkRoot
    }
    
    private struct RunResult {
        let text: String
        let errors: [PlaygroundError]?
    }
    
    struct PlaygroundResult: Codable {
        let text: String
        let error: String
    }

}
