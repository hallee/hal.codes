//
//  Logo.swift
//  hal.codes
//
//  Created by Hal Lee on 7/28/18.
//

import Vapor

enum LogoColor: String, Codable {
    case red, orange, yellow, green, blue, indigo, violet
}

class Logo {
    
    static let shared = Logo()
    
    private var color: LogoColor {
        didSet {
            for action in colorChangeActions {
                action?(LogoObject(logoColor: hexValue()))
            }
            print(colorChangeActions.count) // TODO: weak references? dictionary?
        }
    }
    private let colorQueue = DispatchQueue(label: "logoColorQueue", qos: .userInitiated)
    private var colorChangeActions = [((LogoObject) -> Void)?]()
    
    private init(color: LogoColor = .indigo) {
        self.color = color
    }
    
    func onColorChange(_ closure: ((LogoObject) -> Void)?) {
        colorChangeActions.append(closure)
    }
    
    func setColor(_ color: LogoColor) {
        colorQueue.async {
            self.color = color
        }
    }
    
    func hexValue() -> String {
        switch color {
        case .red:
            return "C63333"
        case .orange:
            return "E26723"
        case .yellow:
            return "F2DB66"
        case .green:
            return "4F9261"
        case .blue:
            return "2466D4"
        case .indigo:
            return "5664EC"
        case .violet:
            return "874CC7"
        }
    }
    
}

struct LogoObject: Codable {
    var logoColor: String
}
