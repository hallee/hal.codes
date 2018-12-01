import Vapor
import Leaf
import SimpleFileLogger
import MicroPlaygroundProvider

/// Called before your application initializes.
public func configure(_ config: inout Config, _ env: inout Environment, _ services: inout Services) throws {
    /// Register providers first
    services.register([TemplateRenderer.self, ViewRenderer.self]) { container -> LeafRenderer in
        let leafConfig = LeafConfig(tags: LeafTagConfig.default(),
                                    viewsDir: DirectoryConfig.detect().workDir + "Frontend",
                                    shouldCache: container.environment != .development)
        return LeafRenderer(config: leafConfig,
                            using: container)
    }

    /// File logger
    services.register(Logger.self) { _ -> SimpleFileLogger in
        return SimpleFileLogger(executableName: "hal.codes", includeTimestamps: true)
    }
    config.prefer(SimpleFileLogger.self, for: Logger.self)

    /// Register routes to the router
    let router = EngineRouter.default()
    try routes(router)
    services.register(router, as: Router.self)

    /// Register websocket server
    MicroPlayground.moduleName = "hal.codes"
    let microPlaygroundProvider = MicroPlaygroundProvider()
    let logoColorProvider = LogoColorProvider()
    microPlaygroundProvider.delegate = logoColorProvider
    try services.register(logoColorProvider)
    try services.register(microPlaygroundProvider)

    /// Register middleware
    var middlewares = MiddlewareConfig()
    middlewares.use(FileMiddleware.self) // Serves files from `Public/` directory
    middlewares.use(ErrorMiddleware.self) // Catches errors and converts to HTTP response
    services.register(middlewares)
}
