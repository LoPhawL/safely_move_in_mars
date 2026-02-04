import { TRobotOrientation } from "../../../types/robotOrientation.type";

export abstract class OrientationModifier {
    handle(robotOrientation: TRobotOrientation): TRobotOrientation {

       return this.rotate(robotOrientation);
    }

    abstract rotate(robotOrientation: TRobotOrientation): TRobotOrientation
}