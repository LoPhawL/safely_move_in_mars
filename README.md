
# Tool to analyse how Robots move in a Grid🪧

This tool is built with **NodeJs**, **Electron** & **Angular** as a **Desktop** application and uses **npm** for managing the dependencies. 

# Prerequisites 🔘

1. **NodeJs** should be installed if unavailable. (Executing the command `node -v` should not result in error)
2.  **npx** should be available, which is usually automatically available after the previous step. (Executing the command `npx -v` should not result in error)

# How to run? ℹ️

1. **Clone** this repo. 
	` git clone https://github.com/LoPhawL/safely_move_in_mars.git`
2.	 Checkout and pull the **alternate-io** branch.
	`git checkout alternate-io` and `git pull origin alternate-io`.
3.  Go to the **root** directory of the repo (where **package.json** file is present) 
4. Open a terminal in the root directory and execute **`npm start`** command which processes all the required steps to build and open the desktop app.
>Please note that the "npm install" command is not required before executing "npm start" and can be safely skipped.


## I/O structure 🧩

A GUI tool built with Electron & Angular as a Desktop application opens up soon ater executing the "npm start" command. It has the input and output fields required to configure robot settings and see the computed final positions.

<hr>

## Notes to Developers 🏗️

Within this tool, currently, only the below commands are supported to the robots.
- `L` (turn left - modifies **orientation**)
- `R` (turn right - modifies **orientation**) 
- `F` (move forward - modifies **position**)

But, this tool can be **extended** to add new commands. Please follow the below guidelines to add new commands.
**Steps to add new commands to the robots:**
            
1. Identify the action to perform. 🔍
	  - Example: 
		- `B` - move backward;
		-  `L270` - rotate 270 degrees to the left.
2. Classify the type of the action. 🗂️
	- Example: 
		- `B`  - a command that would modify the **position** of the robot, hence **[PositionModifier](https://github.com/LoPhawL/safely_move_in_mars/blob/main/app/utils/robotInstructions/PositionInstructions/PositionModifier.ts)**
		-  `L270` - a command that would modify the **orientation** of the robot, hence **[OrientationModifier](https://github.com/LoPhawL/safely_move_in_mars/blob/main/app/utils/robotInstructions/OrientationInstructions/OrientationModifier.ts)**
3.  By extending either the OrientationModifier or the PositionModifier, create a class representing the new command and implement the extended **Modifier** class. The behavior of the robot for the new instruction or command should be implemented inside the contracted functions. (Refer the implementation of **[MoveForward](https://github.com/LoPhawL/safely_move_in_mars/blob/main/app/utils/robotInstructions/PositionInstructions/MoveForward.ts)**)
	 - Example: 
		- `B`  
			> class  MoveBackward  extends  PositionModifier {
			 implement rePosition()
			} 
		- `L270`  
			> class  270Rotator  extends  OrientationModifier {
			implement rotate()
			}
4. Add the instruction identifier for the new action on the **[TRobotInstruction](https://github.com/LoPhawL/safely_move_in_mars/blob/main/app/types/TRobotInstruction.ts)** type, 🏷️
	 - Example: 
		- `B`  may correspond to MoveBackward
		- `M` may correspond to 270Rotator 
		- 
5.  Configure the **[instructionHandler](https://github.com/LoPhawL/safely_move_in_mars/blob/main/app/utils/robotInstructions/index.ts)** to register the newly added action. ⛓️‍💥
	 - Example: 
		- `MoveBackward`  
			> B: new MoveBackward()
6.  Similarly, configure the [**validator**](https://github.com/LoPhawL/safely_move_in_mars/blob/alternate-io/app/ui/src/validators/instruction.validator.ts#L3) to register the newly added action so that it can be allowed and be correctly validated in the UI. ⚖️

After completing these steps, when the new instruction (or the command) `B` is passed in the input, it will compute the modified position of the robot based on the logic that would be defined in the contracted `rePosition` function in the `MoveBackward` class.
