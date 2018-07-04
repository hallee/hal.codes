import Vapor

public func routes(_ router: Router) throws {
    
    router.get() { req -> EventLoopFuture<View> in
        return try generateVueRoot(for: req)
    }

    /// Create Vue root page for all paths
    /// Vue will handle routing client-side
    router.get(PathComponent.catchall) { req in
        return try generateVueRoot(for: req)
    }
    
}
