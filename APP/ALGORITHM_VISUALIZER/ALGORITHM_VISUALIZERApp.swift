//
//  ALGORITHM_VISUALIZERApp.swift
//  ALGORITHM_VISUALIZER
//
//  Created by New user on 1/21/22.
//

import SwiftUI

@main
struct ALGORITHM_VISUALIZERApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
