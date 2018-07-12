//
//  PlaygroundProvider.swift
//  hal.codes
//
//  Created by Hal Lee on 7/3/18.
//

import Vapor
import Service

public final class PlaygroundProvider: Provider {
    
    let socketPath: String
    
    init(path: String = "playground") {
        socketPath = path
    }
    
    public func register(_ services: inout Services) throws {
        /// Register websocket server
        let wss = NIOWebSocketServer.default()
        wss.get(socketPath) { ws, req in
            // TODO: security / limiting to host
            let playground = MicroPlayground(DirectoryConfig.detect().workDir)
            ws.onText { ws, text in
                do {
                    let result = playground.run(code: text)
                    let encoded = try JSONEncoder().encode(result)
                    guard let jsonString = String(data: encoded, encoding: .utf8) else { fatalError() }
                    ws.send(jsonString)
                } catch {
                    fatalError("Error parsing JSON")
                }
            }
        }
        services.register(wss, as: WebSocketServer.self)
    }
    
    public func didBoot(_ container: Container) throws -> EventLoopFuture<Void> {
        return .done(on: container)
    }

}
