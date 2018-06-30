//
//  MicroPlayground.swift
//  hal.codes
//
//  Created by Hal Lee on 6/26/18.
//

#if os(Linux)
    import Glibc
#else
    import Darwin
#endif

class MicroPlayground {
    
    static let swiftVersion = "4.1.2-RELEASE"
    let projectPath: String
    lazy var toolchainPath: String = {
        return projectPath + "Toolchains/swift-\(MicroPlayground.swiftVersion).xctoolchain/usr/bin"
    }()
    
    init(_ projectDirectoryPath: String) {
        projectPath = projectDirectoryPath
    }
    
}
