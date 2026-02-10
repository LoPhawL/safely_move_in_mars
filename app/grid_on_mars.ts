import { TRobotCoordinate } from "./types/robotCoordinate.type";
import { TRobotOrientation } from "./types/robotOrientation.type";
import { TRobotInstruction } from "./types/TRobotInstruction";
import { instructionHandlers } from "./utils/robotInstructions";
import { OrientationModifier } from "./utils/robotInstructions/OrientationInstructions/OrientationModifier";
import { PositionModifier } from "./utils/robotInstructions/PositionInstructions/PositionModifier";

export function analyseRobotPositions (
    gridConfiguration: [number, number],
    robotsSettings: { 
        initialPosition: {
            coordinate: TRobotCoordinate,
            orientation: TRobotOrientation
        },
        movementInstructions: string
    }[]
) {
    const result: string[] = [];

    // initialize grid
    const bound_x_0 = 0;
    const bound_y_0 = 0;

    const bound_x_1 = gridConfiguration[0];
    const bound_y_1 = gridConfiguration[1];

    if (bound_x_1 > 50 || bound_y_1 > 50) {

        throw new Error(`E1: Mars cannot be split into more than 50 units in any cartesian direction.😑 (${bound_x_1}, ${bound_y_1})`);
    }

    const losingPositions: string[] //[number, number, TRobotOrientation][]
     = [];

    eachRobot: for (const robotSetting of robotsSettings) {

        // initialize robot
        let robotCoordinate: TRobotCoordinate = JSON.parse(JSON.stringify(robotSetting.initialPosition.coordinate));
        let robotOrientation: TRobotOrientation =  robotSetting.initialPosition.orientation;

        // for type safety
        const arrayOfInstructions: TRobotInstruction[] = robotSetting.movementInstructions.split('') as TRobotInstruction[];

        if (arrayOfInstructions.length > 100) {

            throw new Error('E2: No robot is built to withstand more than 100 commands at once.😴');
        }

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
                    const position = `${robotCoordinate[0]} ${robotCoordinate[1]} ${robotOrientation} LOST`;
                    console.log(position);
                    result.push(position)
                    continue eachRobot;
                } else {

                    robotCoordinate = newRobotCoordinate;
                }
            }
        }
        const position = `${robotCoordinate[0]} ${robotCoordinate[1]} ${robotOrientation}`
        console.log(position);
        result.push(position)
    }

    return result;
}
