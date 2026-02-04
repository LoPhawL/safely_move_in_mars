function analyseRobotPositions (
    gridConfiguration: [number, number],
    robotsSettings: { 
        initialPosition: {
            coordinate: [number, number],
            orientation: 'N'| 'S' | 'W' | 'E'
        },
        movementInstructions: string
    }[]
) {

}


analyseRobotPositions(
    [5, 3],
    [
        {
            initialPosition: {
                coordinate: [1, 1],
                orientation: 'E'
            },
            movementInstructions: 'RFRFRFRF'
        },
        {
            initialPosition: {
                coordinate: [3, 2],
                orientation: 'N'
            },
            movementInstructions: 'FRRFLLFFRRFLL'
        },
        {
            initialPosition: {
                coordinate: [0, 3],
                orientation: 'W'
            },
            movementInstructions: 'LLFFFLFLFL'
        }
    ]
)