import { rotateRobot } from "../app/utils/rotateRobot";

describe('rotateRobot function', () => {

    it('should rotate the robot to the left correctly', () => {

        expect(rotateRobot('N', 'L')).toBe('W');
        expect(rotateRobot('W', 'L')).toBe('S');
        expect(rotateRobot('S', 'L')).toBe('E');
        expect(rotateRobot('E', 'L')).toBe('N');
    });

    it('should rotate the robot to the right correctly', () => {

        expect(rotateRobot('N', 'R')).toBe('E');
        expect(rotateRobot('E', 'R')).toBe('S');
        expect(rotateRobot('S', 'R')).toBe('W');
        expect(rotateRobot('W', 'R')).toBe('N');
    });
});