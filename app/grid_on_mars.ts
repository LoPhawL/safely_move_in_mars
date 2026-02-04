import { TRobotCoordinate } from "./types/robotCoordinate.type";
import { TRobotOrientation } from "./types/robotOrientation.type";
import { TRobotInstruction } from "./types/TRobotInstruction";
import { instructionHandlers } from "./utils/robotInstructions";
import { OrientationModifier } from "./utils/robotInstructions/OrientationInstructions/OrientationModifier";
import { PositionModifier } from "./utils/robotInstructions/PositionInstructions/PositionModifier";

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
        const arrayOfInstructions: TRobotInstruction[] = robotSetting.movementInstructions.split('') as TRobotInstruction[];

        instructionOfRobot: for (let instruction of arrayOfInstructions) {

            //rotate
            if (instructionHandlers[instruction] instanceof OrientationModifier) { // orientation modifiers rotate (orient) the robot in its current coordinate.

                robotOrientation = instructionHandlers[instruction].handle(robotOrientation);
                
            } else if (instructionHandlers[instruction] instanceof PositionModifier) { // position modifiers change the coordinates.

                if (losingPositions.includes(`${robotCoordinate[0]} ${robotCoordinate[1]} ${robotOrientation}`)) {
                    
                    continue instructionOfRobot;
                } 

                let newRobotCoordinate: TRobotCoordinate = instructionHandlers[instruction].handle(robotOrientation, robotCoordinate);

                if (newRobotCoordinate[0] < bound_x_0 || newRobotCoordinate[0] > bound_x_1 || newRobotCoordinate[1] < bound_y_0 || newRobotCoordinate[1] > bound_y_1) {

                    // the robot would have been lost
                    losingPositions.push(`${robotCoordinate[0]} ${robotCoordinate[1]} ${robotOrientation}`);
                    console.log(`${robotCoordinate[0]} ${robotCoordinate[1]} ${robotOrientation} LOST`);
                    continue eachRobot;
                } else {

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