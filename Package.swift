// swift-tools-version:4.0
import PackageDescription

let package = Package(
    name: "hal.codes",
    dependencies: [
        .package(url: "https://github.com/vapor/vapor.git", from: "3.0.0"),
        .package(url: "https://github.com/vapor/leaf.git", from: "3.0.0"),
        .package(url: "https://github.com/apple/swift-package-manager.git", from: "0.1.0"),
        .package(url: "https://github.com/hallee/micro-playground-provider.git", from: "0.0.2"),
        .package(url: "https://github.com/hallee/vapor-simple-file-logger.git", from: "1.0.0")
    ],
    targets: [
        .target(name: "App", dependencies: ["Vapor", "Leaf", "SPMUtility", "SimpleFileLogger", "MicroPlaygroundProvider"]),
        .target(name: "Run", dependencies: ["App"]),
        .testTarget(name: "AppTests", dependencies: ["App"])
    ]
)
