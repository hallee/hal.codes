import Vapor

public func routes(_ router: Router) throws {
    
    router.get() { req -> EventLoopFuture<View> in
        try testPlayground(req)
        return try generateHomePage(for: req)
    }

    /// Redirect all unknown paths to TLD
    router.get(PathComponent.catchall) { req in
        return req.redirect(to: "/", type: .normal)
    }
    
}

func testPlayground(_ container: Container) throws {
    let codeText = """
    // testing errors:
    print("Hello World!" * 500.0
    """
    // connect to echo.websocket.org
    let done = try container.client().webSocket("ws://localhost:8080/playground").flatMap { ws -> Future<Void> in
        // setup an on text callback that will print the echo
        ws.onText { ws, text in
            print("rec: \(text)")
            // close the websocket connection after we recv the echo
            ws.close()
        }
        
        // when the websocket first connects, send message
        ws.send(codeText)
        
        // return a future that will complete when the websocket closes
        return ws.onClose
    }
    
    print(done) // Future<Void>
    
    // wait for the websocket to close
//    try done.wait()
}
