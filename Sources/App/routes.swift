import Vapor

public func routes(_ router: Router) throws {
    router.get() { req in
        return "Hello, world!"
    }
    
    router.get(PathComponent.anything) { req in
        return "404 here"
    }
}
