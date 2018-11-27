//
//  PlaygroundLogoColor.swift
//  hal.codes
//
//  Created by Hal Lee on 7/28/18.
//

import Vapor

extension MicroPlayground {

    func runLogoColorAttempt(code: String, logger: Logger? = nil) {
        let logoCode = code + "\nprint(siteLogoColor())"
        run(code: logoCode) { result in
            if let color = self.parseLogoColor(result.text) {
                Logo.shared.setColor(color)
                logger?.info("Changed logo color to \(color).")
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
