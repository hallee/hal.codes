//
//  PlaygroundErrorParser.swift
//  hal.codes
//
//  Created by Hal Lee on 6/26/18.
//

import Basic
import Utility
import Foundation

struct PlaygroundError: Codable {
    let location: CodeLocation
    let description: String
}

struct CodeLocation: Codable {
    let row: Int
    let column: Int
}

class PlaygroundErrorParser {
    
    var offset: Int
    
    init(rowOffset: Int = 0) {
        offset = rowOffset
    }
    
    func parse(input: String) throws -> [PlaygroundError] {
        var items = [PlaygroundError]()
        let results = try RegEx(pattern: ".*.swift:((\\d+?)\\:(\\d+?))\\: (error)\\: (.*)\\n(.*)\\n(.*)").matchGroups(in: input)
        for result in results {
            guard let row = Int(result[1]), let column = Int(result[2]) else { continue }
            let description: String
            if result.count > 6 {
                description = "hal.codes:\(row):\(column) error: \(result[4])\n\(result[5])\n\(result[6])"
            } else {
                description = "hal.codes:\(row):\(column) error: \(result[4])"
            }
            items += [PlaygroundError(location: CodeLocation(row: row + offset, column: column),
                                      description: description)]
        }
        return items
    }
    
}
