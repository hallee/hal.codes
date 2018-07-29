//
//  Logo.swift
//  hal.codes
//
//  Created by Hal Lee on 7/28/18.
//

import Vapor

enum LogoColor: String {
    case red, orange, yellow, green, blue, indigo, violet
}

class Logo {
    
    static let shared = Logo()
    
    private var color: LogoColor
    private let colorQueue = DispatchQueue(label: "logoColorQueue", qos: .userInitiated)
    
    private init(color: LogoColor = .indigo) {
        self.color = color
    }
    
    func setColor(_ color: LogoColor) {
        colorQueue.async {
            self.color = color
        }
    }
    
    func hexValue() -> String {
        return ""
    }
    
}
