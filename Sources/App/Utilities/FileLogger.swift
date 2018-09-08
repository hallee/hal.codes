//
//  FileLogger.swift
//  hal.codes
//
//  Created by Hal Lee on 9/8/18.
//

import Vapor

final class FileLogger: Logger {
    
    let executableName: String
    let fileManager = FileManager.default
    lazy var logFileURL: URL? = {
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
        
        /// Append file name
        baseURL?.appendPathComponent("log.log")
        
        return baseURL
    }()
    lazy var fileHandle: Foundation.FileHandle? = {
        guard let url = logFileURL else { return nil }
        return try? FileHandle(forWritingTo: url)
    }()
    
    init(executableName: String = "Vapor") {
        // TODO: sanitize executableName for path use
        self.executableName = executableName
    }
    
    deinit {
        fileHandle?.closeFile()
    }
    
    func log(_ string: String, at level: LogLevel, file: String, function: String, line: UInt, column: UInt) {
        saveToFile(string)
    }
    
    @discardableResult func saveToFile(_ string: String) -> Bool {
        guard let url = logFileURL else { return false }
        let output = string + "\n"
        do {
            if !fileManager.fileExists(atPath: url.path) {
                try output.write(to: url, atomically: true, encoding: .utf8)
            } else {
                guard let fileHandle = fileHandle else { return false }
                fileHandle.seekToEndOfFile()
                guard let data = output.data(using: .utf8) else { return false }
                fileHandle.write(data)
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
