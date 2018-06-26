import Vapor
import Leaf

struct Project: Codable {
    var name: String
    var icon: URL?
    var featureImage: URL?
    var description: String
}
