import Vapor
import Leaf

struct Home: Codable {
    var title: String
    var year: String
    var projects: [Project]?
}

func generateHomePage(for req: Request) throws -> Future<View> {
    let leaf = try req.make(LeafRenderer.self)
    
    let yearFormatter = DateFormatter()
    yearFormatter.dateFormat = "YYYY"
    let year = yearFormatter.string(from: Date())
    let context = Home(title: "hal.codes", year: year,  projects: nil)

    return leaf.render("home", context)
}
