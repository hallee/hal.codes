//
//  FileLogger.swift
//  hal.codes
//
//  Created by Hal Lee on 9/8/18.
//

import Vapor

final class FileLogger: Logger {
    
    let executableName: String
    let includeTimestamps: Bool
    let fileManager = FileManager.default
    lazy var logDirectoryURL: URL? = {
        var baseURL: URL?
        #if os(macOS)
        /// ~/Library/Caches/
        if let url = fileManager.urls(for: .cachesDirectory, in: .userDomainMask).first {
            baseURL = url
        } else { print("Unable to find caches directory.") }
        #endif
        #if os(Linux)
        baseURL = URL(fileURLWithPath: "/var/log/")
        #endif
        
        /// Append executable name; ~/Library/Caches/executableName/ (macOS),
        /// or /var/log/executableName/ (Linux)
        do {
            if let executableURL = baseURL?.appendingPathComponent(executableName, isDirectory: true) {
                try fileManager.createDirectory(at: executableURL, withIntermediateDirectories: true, attributes: nil)
                baseURL = executableURL
            }
        } catch { print("Unable to create \(executableName) log directory.") }
        
        return baseURL
    }()
    
    init(executableName: String = "Vapor", includeTimestamps: Bool = false) {
        // TODO: sanitize executableName for path use
        self.executableName = executableName
        self.includeTimestamps = includeTimestamps
    }
    
    func log(_ string: String, at level: LogLevel, file: String, function: String, line: UInt, column: UInt) {
        let fileName = level.description.lowercased() + ".log"
        var output = "[ \(level.description) ] \(string) (\(file):\(line))"
        if includeTimestamps {
            output = "\(Date() ) " + output
        }
        saveToFile(output, fileName: fileName)
    }
    
    @discardableResult func saveToFile(_ string: String, fileName: String) -> Bool {
        guard let baseURL = logDirectoryURL else { return false }
        let url = baseURL.appendingPathComponent(fileName)
        let output = string + "\n"
        do {
            if !fileManager.fileExists(atPath: url.path) {
                try output.write(to: url, atomically: true, encoding: .utf8)
            } else {
                let fileHandle = try FileHandle(forWritingTo: url)
                fileHandle.seekToEndOfFile()
                guard let data = output.data(using: .utf8) else { return false }
                fileHandle.write(data)
                fileHandle.closeFile()
            }
        } catch {
            print("FileLogger could not write to file \(url).")
            return false
        }
        
        return true
    }
    
}

extension FileLogger: ServiceType {
    
    static var serviceSupports: [Any.Type] {
        return [Logger.self]
    }
    
    static func makeService(for worker: Container) throws -> FileLogger {
        return FileLogger()
    }
    
}
