import Vapor
import Leaf

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

    /// Register routes to the router
    let router = EngineRouter.default()
    try routes(router)
    services.register(router, as: Router.self)
    
    /// Register websocket server
    try services.register(PlaygroundProvider())
        
    /// Register middleware
    var middlewares = MiddlewareConfig() // Create _empty_ middleware config
    middlewares.use(FileMiddleware.self) // Serves files from `Public/` directory
    middlewares.use(ErrorMiddleware.self) // Catches errors and converts to HTTP response
    services.register(middlewares)
}
