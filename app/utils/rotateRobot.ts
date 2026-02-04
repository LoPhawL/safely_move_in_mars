import { TRobotOrientation } from "../types/robotOrientation.type";
import { TRobotRotation } from "../types/robotRotation.type";

const cartesianRotationResult: {
    [key in TRobotOrientation]: {
        [key in TRobotRotation]: TRobotOrientation
    }
} = {
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

export function rotateRobot(currentOrientation: TRobotOrientation, rotation: TRobotRotation): TRobotOrientation {

    return cartesianRotationResult[currentOrientation][rotation];
}
