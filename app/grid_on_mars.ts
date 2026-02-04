import { TRobotCoordinate } from "./types/robotCoordinate.type";
import { TRobotOrientation } from "./types/robotOrientation.type";
import { TRobotRotation } from "./types/robotRotation.type";
import { rotateRobot } from "./utils/rotateRobot";

function analyseRobotPositions (
    gridConfiguration: [number, number],
    robotsSettings: { 
        initialPosition: {
            coordinate: TRobotCoordinate,
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

    const losingPositions: string[] //[number, number, TRobotOrientation][]
     = [];

    eachRobot: for (const robotSetting of robotsSettings) {

        // initialize robot
        let robotCoordinate: TRobotCoordinate = JSON.parse(JSON.stringify(robotSetting.initialPosition.coordinate));
        let robotOrientation: TRobotOrientation =  robotSetting.initialPosition.orientation;

        // for type safety
        const arrayOfMovementInstructions: TRobotRotation[] = robotSetting.movementInstructions.split('') as TRobotRotation[];

        instructionOfRobot: for (let instruction of arrayOfMovementInstructions) {

            //rotate
            if (instruction === 'L' || instruction === 'R') {

                robotOrientation = rotateRobot(robotOrientation, instruction);
                
            } else if (instruction === 'F') {

                if (losingPositions.includes(`${robotCoordinate[0]} ${robotCoordinate[1]} ${robotOrientation}`)) {
                    
                    continue instructionOfRobot;
                } 

                let newRobotCoordinate: TRobotCoordinate;
                // move forward
                if (robotOrientation === 'N') {

                    // x = x, y = y + 1
                    newRobotCoordinate = [robotCoordinate[0], robotCoordinate[1] + 1];
                } else if (robotOrientation === 'E') { 

                    // x = x + 1, y = y
                    newRobotCoordinate = [robotCoordinate[0] + 1, robotCoordinate[1]];
                } else if (robotOrientation === 'S') {

                    // x = x, y = y - 1
                    newRobotCoordinate = [robotCoordinate[0], robotCoordinate[1] - 1];
                } else {

                    // x = x - 1, y = y
                    newRobotCoordinate = [robotCoordinate[0] - 1, robotCoordinate[1]];
                }

                if (newRobotCoordinate[0] < bound_x_0 || newRobotCoordinate[0] > bound_x_1 || newRobotCoordinate[1] < bound_y_0 || newRobotCoordinate[1] > bound_y_1) {

                    // the robot would have been lost
                    losingPositions.push(`${robotCoordinate[0]} ${robotCoordinate[1]} ${robotOrientation}`);
                    console.log(`${robotCoordinate[0]} ${robotCoordinate[1]} ${robotOrientation} LOST`);
                    continue eachRobot;
                } else {

                    // move it forward
                    robotCoordinate = newRobotCoordinate;
                }
            }
        }
        console.log(`${robotCoordinate[0]} ${robotCoordinate[1]} ${robotOrientation}`);

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