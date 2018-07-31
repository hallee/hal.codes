//
//  WebSocketExtensions.swift
//  hal.codes
//
//  Created by Hal Lee on 7/31/18.
//

import Vapor

extension WebSocket {
    
    public func sendJSONFormatted<T: Encodable>(_ object: T) throws {
        let encoded = try JSONEncoder().encode(object)
        guard let jsonString = String(data: encoded, encoding: .utf8) else { return }
        self.send(jsonString)
    }
    
}
