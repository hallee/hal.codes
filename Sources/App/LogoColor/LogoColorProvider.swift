//
//  LogoColorProvider.swift
//  App
//
//  Created by Hal Lee on 12/1/18.
//

import Vapor
import MicroPlaygroundProvider

class LogoColorProvider: Provider, MicroPlaygroundDelegate {

    var logger: Logger?

    func register(_ services: inout Services) throws { }

    func didBoot(_ container: Container) throws -> EventLoopFuture<Void> {
        self.logger = try container.make(Logger.self)
        return .done(on: container)
    }

    func microPlayground(_ playground: MicroPlayground, createdFor socket: WebSocket) {
        Logo.shared.addColorChangeObserver(socket)
    }

    func microPlayground(_ playground: MicroPlayground, willRun code: String) {
        logger?.debug("""
        ==== running code ====
        \(code)
        ======================
        """)
        
        runLogoColorAttempt(playground, code: code)
    }

    func runLogoColorAttempt(_ playground: MicroPlayground, code: String) {
        let logoCode = code + "\nprint(siteLogoColor())"
        playground.run(code: logoCode) { result in
            if let color = self.parseLogoColor(result.text) {
                Logo.shared.setColor(color)
                self.logger?.info("Changed logo color to \(color).")
            }
        }
    }

    func parseLogoColor(_ result: String) -> LogoColor? {
        let lines = result.split(separator: "\n")
        if let colorString = lines.last {
            return LogoColor(rawValue: String(colorString))
        }
        return nil
    }


}
