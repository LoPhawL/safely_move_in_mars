import { TRobotCoordinate } from "../../../types/robotCoordinate.type";
import { TRobotOrientation } from "../../../types/robotOrientation.type";
import { PositionModifier } from "./PositionModifier";

export class MoveForward extends PositionModifier {

    override rePosition(robotOrientation: TRobotOrientation, robotCoordinate: TRobotCoordinate) {

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

        return newRobotCoordinate;
    }
}