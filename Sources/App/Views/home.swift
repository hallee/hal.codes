import Vapor
import Leaf

struct Home: Codable {
    var title: String
    var message: String
}

func generateHomePage(for req: Request) throws -> Future<View> {
    let leaf = try req.make(LeafRenderer.self)
    let context = Home(title: "hal.codes", message: "Hello World!")

    return leaf.render("home", context)
}
