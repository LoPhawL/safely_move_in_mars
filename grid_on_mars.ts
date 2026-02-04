const cartesianRotationResult = {
    N: {
        L: 'W',
        R: 'E'
    },
    E: {
        L: 'N',
        R: 'S'
    },
    S: {
        L: 'E',
        R: 'W'
    },
    W: {
        L: 'S',
        R: 'N'
    }
}

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

    // initialize grid
    const bound_x_0 = 0;
    const bound_y_0 = 0;

    const bound_x_1 = gridConfiguration[0];
    const bound_y_1 = gridConfiguration[1];

    for (const robotSetting of robotsSettings) {

        // initialize robot
        let robotPosition: [number, number] = JSON.parse(JSON.stringify(robotSetting.initialPosition.coordinate));
        let robotOrientation: string = robotSetting.initialPosition.orientation;


    }
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