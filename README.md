
# Notice of some recent additions: 📢

- A UI based I/O, available as a **Desktop application** (built with **Electron** and **Angular**) is pushed to the [alternate-io](https://github.com/LoPhawL/safely_move_in_mars/tree/alternate-io) branch.
- **(However, only the commits that are in the "main" branch were made within the 2-3 hour mark.)**
- Please visit that branch to see the simplified UI specific installation instructions.

<hr>
<hr>

Following details are specific to only the "main" branch.

# CLI App - A tool to analyse how Robots move in a Grid🪧

This tool is built with **NodeJs** as a **CLI** application and uses **npm** for managing the dependencies. 

# Prerequisites ✅

1. **NodeJs** should be installed if unavailable. (Executing the command `node -v` should not result in error)
2.  **npm** should be installed, which is usually automatically done in the previous step. (Executing the command `npm -v` should not result in error)

# How to run? ℹ️

1. **Clone** this repo.
2.  Go to the **root** directory of the repo (where **package.json** file is present) 
3. Open a terminal in the root directory and execute `npm install` command and wait for it's completion.
4. Then execute `npm start` command which starts the tool and follow the instructions on screen.

## I/O structure 🧩

(This tool is built as a CLI application and the terminal's stdin and stdout have to be used to interact with it.)
To provide the inputs with the grid and robot details, follow these instructions after starting the application using `npm start`:
> Please type `run` to continue executing the default input that is given in the problem sheet.

Or,
> Please provide your custom input in the below format (grid size and the bot position are separated by a comma) and enter `run` at the end of the input.
>
	Example:
		 5,3
	     1,1,E
	     RFRFRFRF
	     3,2,N
	     FRRFLLFFRRFLL
	     0,3,W
	     LLFFFLFLFL
         run

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
		- `B`  - a command that would modify the **position** of the robot, hence **[Position Modifier](https://github.com/LoPhawL/safely_move_in_mars/blob/main/app/utils/robotInstructions/PositionInstructions/PositionModifier.ts)**
		-  `L270` - a command that would modify the **orientation** of the robot, hence **[Orientation Modifier](https://github.com/LoPhawL/safely_move_in_mars/blob/main/app/utils/robotInstructions/OrientationInstructions/OrientationModifier.ts)**
3.  By extending either the OrientationModifier or the PositionModifier, create a class representing the new command and implement the extended **Modifier** class. The behavior of the robot for the new instruction or command should be implemented inside the contracted functions. (Refer the implementation of **[MoveForward](https://github.com/LoPhawL/safely_move_in_mars/blob/main/app/utils/robotInstructions/PositionInstructions/MoveForward.ts)**)✍️
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
5.  Configure the **[instructionHandler](https://github.com/LoPhawL/safely_move_in_mars/blob/main/app/utils/robotInstructions/index.ts)** to register the newly added action. ⛓️‍💥
	 - Example: 
		- `MoveBackward`  
			> B: new MoveBackward()


After completing these steps, when the new instruction (or the command) `B` is passed in the input, it will compute the modified position of the robot based on the logic that would be defined in the contracted `rePosition` function in the `MoveBackward` class.
