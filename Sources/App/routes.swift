import Vapor

public func routes(_ router: Router) throws {
    
    router.get() { req -> EventLoopFuture<View> in
        return try generateVueRoot(for: req)
    }
    
    router.get("playground/version") { req in
        return MicroPlayground.swiftVersionNumber
    }

    /// Create Vue root page for all paths
    /// Vue will handle routing client-side
    router.get(PathComponent.catchall) { req in
        return try generateVueRoot(for: req)
    }
    
}
