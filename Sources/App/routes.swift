import Vapor

public func routes(_ router: Router) throws {
    
    router.get() { req in
        return "Hello, world!"
    }
    
    /// Redirect all unknown paths to TLD
    router.get(PathComponent.anything) { req in
        return req.redirect(to: "/", type: .normal)
    }
    
}
