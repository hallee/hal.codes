//
//  PlaygroundLogoColor.swift
//  hal.codes
//
//  Created by Hal Lee on 7/28/18.
//

extension MicroPlayground {
    
    func runLogoColorAttempt(code: String, completion: @escaping (LogoColor) -> Void) {
        let logoCode = code + "\nprint(generateSiteLogo().color)"
        run(code: logoCode) { result in
            if let color = self.parseLogoColor(result.text) {
                completion(color)
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
