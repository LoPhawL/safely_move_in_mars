import { TRobotOrientation } from "./types/robotOrientation.type";
import { TRobotRotation } from "./types/robotRotation.type";
import { rotateRobot } from "./utils/rotateRobot";


function analyseRobotPositions (
    gridConfiguration: [number, number],
    robotsSettings: { 
        initialPosition: {
            coordinate: [number, number],
            orientation: TRobotOrientation
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
        let robotOrientation: TRobotOrientation =  robotSetting.initialPosition.orientation;

        // for type safety
        const arrayOfMovementInstructions: TRobotRotation[] = robotSetting.movementInstructions.split('') as TRobotRotation[];

        for (let instruction of arrayOfMovementInstructions) {

            //rotate
            if (instruction === 'L' || instruction === 'R') {

                robotOrientation = rotateRobot(robotOrientation, instruction);
            }

            
        }
    
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