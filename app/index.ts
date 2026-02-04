import { analyseRobotPositions } from "./grid_on_mars";
import { TRobotCoordinate } from "./types/robotCoordinate.type";
import { TRobotOrientation } from "./types/robotOrientation.type";

process.stdout.write('Instructions:\n\t1. Please type "run" to continue executing the default input that is given in the problem sheet.\n\t2. Please provide your custom input in the below format (grid size and the bot position are separated by a comma) and enter "run" at the end of the input.\n\t\tExample:\n\t\t\t5,3\n\t\t\t1,1,E\n\t\t\tRFRFRFRF\n\t\t\t3,2,N\n\t\t\tFRRFLLFFRRFLL\n\t\t\t0,3,W\n\t\t\tLLFFFLFLFL\n\t\t\trun\n\n');

let entry = '';

process.stdin.on('data',function(data){

    const ucData = data.toString().toUpperCase();

    entry += ucData;

    if (ucData.includes('RUN')) {

        if (entry.trim() !== 'RUN') {

            try {

                entry = entry.replace('RUN', '').trim();
                const lines = entry.split('\n').map(line => line.trim()).map(line => line.replace(/\s+/g, '')).filter(line => line.length > 0);

                const lenLines = lines.length;
                if (lenLines - 1 === 0 || (lenLines - 1) % 2 !== 0) {

                    throw new Error('invalid input');
                }

                const robotsSettings = [];
                const gridSize = lines[0].split(',').map(num => parseInt(num)) as [number, number];
                for (let i = 1; i < lenLines; i += 2) {

                    const initialPositionParts = lines[i].split(',');
                    const movementInstructions = lines[i + 1];

                    robotsSettings.push({
                        initialPosition: {
                            coordinate: [parseInt(initialPositionParts[0]), parseInt(initialPositionParts[1])] as TRobotCoordinate,
                            orientation: initialPositionParts[2] as TRobotOrientation
                        },
                        movementInstructions
                    });
                }

                console.log('Inputs:', JSON.stringify({
                    gridSize,
                    robotsSettings
                }));
                console.log('');
                analyseRobotPositions(
                    gridSize,
                    robotsSettings
                );
                console.log('');
                
            } catch (error: any) {
                console.log(error);

                if (!(error.message.includes('E1:') || error.message.includes('E2:'))) { 
                    
                    console.error('Unexpected input format. The input should have the grid size on the first line and then pairs of two lines for each robot, the first line being the position and the orientation while the second line representing the commands to the robot.');
                }
                
            }

        } else {

            console.log('');
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
            );
            console.log('');
        }

        process.exit();
    } 

    
})