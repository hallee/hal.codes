import Vapor
import Leaf

func generateVueRoot(for req: Request) throws -> Future<View> {
    let leaf = try req.make(LeafRenderer.self)

    return leaf.render("index", TemplateData.null)
}
