import Vapor
import Leaf

struct RootPage: Codable {
    var logoColor: String
}

func generateVueRoot(for req: Request) throws -> Future<View> {
    let leaf = try req.make(LeafRenderer.self)
    let page = RootPage(logoColor: Logo.shared.hexValue())
    return leaf.render("index", page)
}
