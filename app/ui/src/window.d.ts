import { bootstrapApplication } from '@angular/platform-browser';

declare global {
    interface Window {
        electron_backbone: {
            sendMessage: (
                input: {
                    gridDimensions: [number, number],
                    robotSettings: {
                        initialPosition: {
                            coordinate: [number, number],
                            orientation: string
                        },
                        movementInstructions: string
                    }[]
                }
            ) => void
        }
    }
}