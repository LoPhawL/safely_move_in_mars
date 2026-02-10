import { AbstractControl, ValidationErrors } from "@angular/forms";

export const ALLOWED_ROBOT_INSTRUCTIONS = ['L', 'R', 'F'];

const INSTRUCTION_REGEX = new RegExp(`^[${ALLOWED_ROBOT_INSTRUCTIONS.join('')}]+$`, 'i');

export const instructionValidator = (control: AbstractControl): ValidationErrors | null => {

    const val = control?.value;

    if (typeof val !== 'string') {

        return { invalidInstructions: true };
    }

    return INSTRUCTION_REGEX.test(val) ? null : { invalidInstructions: true };
}
