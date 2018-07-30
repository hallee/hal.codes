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
            self.createPlayground(for: socket, request)
        }
        services.register(wss, as: WebSocketServer.self)
    }
    
    public func didBoot(_ container: Container) throws -> EventLoopFuture<Void> {
        return .done(on: container)
    }
    
    private func createPlayground(for socket: WebSocket, _ request: Request) {
        let playground = MicroPlayground(DirectoryConfig.detect().workDir)
        socket.onText { socket, text in
            self.runCode(text, playground, on: socket, request)
        }
        
        Logo.shared.onColorChange { [weak self] color in
            self?.sendJSONString(color, to: socket)
        }
        
    }
    
    private func runCode(_ code: String, _ playground: MicroPlayground,
                         on socket: WebSocket, _ request: Request) {
        playground.run(code: code) { result in
            self.sendJSONString(result, to: socket)
        }
        
        playground.runLogoColorAttempt(code: code, request)
    }
    
    private func sendJSONString<T: Encodable>(_ output: T, to socket: WebSocket) {
        do {
            let encoded = try JSONEncoder().encode(output)
            guard let jsonString = String(data: encoded, encoding: .utf8) else { return }
            print(jsonString)
            socket.send(jsonString)
        } catch {
            print(error)
        }
    }

}
