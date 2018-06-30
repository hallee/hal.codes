import Vapor

/// Called after your application has initialized.
public func boot(_ app: Application) throws {
    let playground = MicroPlayground(DirectoryConfig.detect().workDir)
    let codeText = """
    // testing errors:
    print("Hello World!" * 500.0
    """
    let result = playground.run(code: codeText)
    print(result)
}
