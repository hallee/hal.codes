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
        wss.get(socketPath) { socket, request in
            // TODO: security / limiting to host
            self.createPlayground(for: socket)
        }
        services.register(wss, as: WebSocketServer.self)
    }
    
    public func didBoot(_ container: Container) throws -> EventLoopFuture<Void> {
        return .done(on: container)
    }
    
    private func createPlayground(for socket: WebSocket) {
        let playground = MicroPlayground(DirectoryConfig.detect().workDir)
        socket.onText { socket, text in
            self.runCode(text, playground, on: socket)
        }
        
        Logo.shared.addColorChangeObserver(socket)
    }
    
    private func runCode(_ code: String, _ playground: MicroPlayground,
                         on socket: WebSocket) {
        playground.run(code: code) { [weak socket] result in
            try? socket?.sendJSONFormatted(result)
        }
        
        playground.runLogoColorAttempt(code: code)
    }

}
