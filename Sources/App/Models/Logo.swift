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
            notificationQueue.async {
                NotificationCenter.default.post(self.colorChangeNotification)
            }
        }
    }
    
    private let notificationQueue = DispatchQueue(label: "logoNotificationQueue")
    private let colorQueue = DispatchQueue(label: "logoColorQueue", qos: .userInitiated, attributes: .concurrent)
    
    static let notificationName = Notification.Name(rawValue: "LogoColorChanged")
    private var colorChangeNotification: Notification {
        return Notification(name: Logo.notificationName,
                            object: self,
                            userInfo: ["logoColor": hexValue()])
    }
    
    private init(color: LogoColor = .indigo) {
        self.color = color
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
                hexString = "FFD14F"
            case .green:
                hexString = "0D9C59"
            case .blue:
                hexString = "0779B9"
            case .indigo:
                hexString = "5664EC"
            case .violet:
                hexString = "AC79C6"
            }
        }
        return hexString
    }
    
    func addColorChangeObserver(_ observer: WebSocket) {
        NotificationCenter.default.addObserver(forName: Logo.notificationName,
                                               object: nil,
                                               queue: nil) { [weak observer] notification in
            if let newLogoColor = notification.userInfo as? [String: String] {
                try? observer?.sendJSONFormatted(newLogoColor)
            }
        }
    }
    
}
