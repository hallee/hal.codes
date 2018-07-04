import Vapor
import Sass

/// Creates an instance of Application. This is called from main.swift in the run target.
public func app(_ env: Environment) throws -> Application {
    compileStatic()
    var config = Config.default()
    var env = env
    var services = Services.default()
    try configure(&config, &env, &services)
    let app = try Application(config: config, environment: env, services: services)
    try boot(app)
    return app
}

fileprivate func compileStatic() {
    let sassFolder = DirectoryConfig.detect().workDir + "Frontend/Sass/"
    let outputFolder = DirectoryConfig.detect().workDir + "Public/styles/"
    guard let sassFiles = FileManager.default.enumerator(atPath: sassFolder) else { fatalError() }
    while let file = sassFiles.nextObject() as? String {
        let newFileName = URL(fileURLWithPath: file).deletingPathExtension().lastPathComponent + ".css"
        let outputPath = outputFolder + newFileName

        let sassOptions = Sass.Options()
        sassOptions.setOutputStyle(.compressed)
        let sass = Sass(input: sassFolder + file, options: sassOptions, outputFile: outputPath)
        do {
            try sass.compile()
        } catch {
            print("Sass compilation error: \(error.localizedDescription)")
        }
    }
}
