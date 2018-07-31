//
//  PlaygroundLogoColor.swift
//  hal.codes
//
//  Created by Hal Lee on 7/28/18.
//

import Vapor

extension MicroPlayground {
    
    func runLogoColorAttempt(code: String) {
        let logoCode = code + "\nprint(generateSiteLogo().color)"
        run(code: logoCode) { result in
            if let color = self.parseLogoColor(result.text) {
                Logo.shared.setColor(color)
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
