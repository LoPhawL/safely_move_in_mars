import { TRobotCoordinate } from "../../../types/robotCoordinate.type";
import { TRobotOrientation } from "../../../types/robotOrientation.type";

export abstract class PositionModifier {
    
    abstract rePosition(robotOrientation: TRobotOrientation, robotCoordinate: TRobotCoordinate): TRobotCoordinate

    handle(robotOrientation: TRobotOrientation, robotCoordinate: TRobotCoordinate): TRobotCoordinate {

        return this.rePosition(robotOrientation, robotCoordinate);
    }
}