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
            for action in self.colorChangeActions {
                actionQueue.async {
                    action?(LogoObject(logoColor: self.hexValue()))
                }
            }
            print(colorChangeActions.count) // TODO: weak references? dictionary?
        }
    }
    private let actionQueue = DispatchQueue(label: "logoColorActionQueue")
    private let colorQueue = DispatchQueue(label: "logoColorQueue", qos: .userInitiated, attributes: .concurrent)
    private var colorChangeActions = [((LogoObject) -> Void)?]()
    
    private init(color: LogoColor = .indigo) {
        self.color = color
    }
    
    func onColorChange(_ closure: ((LogoObject) -> Void)?) {
        colorChangeActions.append(closure)
    }
    
    func setColor(_ color: LogoColor) {
        colorQueue.async(flags: .barrier) {
            self.color = color
        }
    }
    
    func hexValue() -> String {
        var hexString = ""
        colorQueue.sync {
            switch self.color {
            case .red:
                hexString = "C63333"
            case .orange:
                hexString = "E26723"
            case .yellow:
                hexString = "F2DB66"
            case .green:
                hexString = "4F9261"
            case .blue:
                hexString = "2466D4"
            case .indigo:
                hexString = "5664EC"
            case .violet:
                hexString = "874CC7"
            }
        }
        return hexString
    }
    
}

struct LogoObject: Codable {
    var logoColor: String
}
