import { TRobotInstruction } from "../../types/TRobotInstruction";
import { LeftRotator } from "./OrientationInstructions/LeftRotator";
import { OrientationModifier } from "./OrientationInstructions/OrientationModifier";
import { RightRotator } from "./OrientationInstructions/RightRotator";
import { MoveForward } from "./PositionInstructions/MoveForward";
import { PositionModifier } from "./PositionInstructions/PositionModifier";

// a robot instruction in something that can alter the robot's orientation (TOrientation) or coordinates (TRobotCoordinate)
export const instructionHandlers:
{ [key in TRobotInstruction]: OrientationModifier | PositionModifier }
 = {
    L: new LeftRotator(),
    R: new RightRotator(),
    
    F: new MoveForward()
}