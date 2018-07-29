//
//  Logo.swift
//  App
//
//  Created by Hal Lee on 7/28/18.
//

import FluentPostgreSQL
import Vapor

enum LogoColor: String, Codable {
    case red, orange, yellow, green, blue, indigo, violet
}

final class Logo: PostgreSQLModel, PostgreSQLMigration, Codable {
    
    var id: Int?
    var color: LogoColor
    
    init(id: Int? = nil, color: LogoColor) {
        self.id = id
        self.color = color
    }
    
    func hexValue() -> String {
        return ""
    }
    
}
