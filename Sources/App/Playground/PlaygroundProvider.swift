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
            self.createPlayground(for: ws)
        }
        services.register(wss, as: WebSocketServer.self)
    }
    
    public func didBoot(_ container: Container) throws -> EventLoopFuture<Void> {
        return .done(on: container)
    }
    
    private func createPlayground(for socket: WebSocket) {
        let playground = MicroPlayground(DirectoryConfig.detect().workDir)
        socket.onText { ws, text in
            self.runCode(text, playground, on: ws)
        }
    }
    
    private func runCode(_ code: String, _ playground: MicroPlayground, on socket: WebSocket) {
        playground.run(code: code) { result in
            do {
                let encoded = try JSONEncoder().encode(result)
                guard let jsonString = String(data: encoded, encoding: .utf8) else { return }
                socket.send(jsonString)
            } catch {
                fatalError("Error parsing JSON")
            }
        }
        
        playground.runLogoColorAttempt(code: code) { color in
            
        }
    }

}
