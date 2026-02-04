import { TRobotOrientation } from "../../../types/robotOrientation.type";
import { rotateRobot } from "../../rotateRobot";
import { OrientationModifier } from "./OrientationModifier";

export class LeftRotator extends OrientationModifier {

    override rotate(robotOrientation: TRobotOrientation): TRobotOrientation {

        return rotateRobot(robotOrientation, 'L');
        
    }
}