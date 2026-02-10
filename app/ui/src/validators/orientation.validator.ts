import { AbstractControl, ValidationErrors } from "@angular/forms";

 export const orientationValidator = (control: AbstractControl): ValidationErrors | null => {

    const val = control?.value;

    if (typeof val !== 'string') {
      
      return { invalidOrientation: true };
    }

    return /^[NSEW]$/i.test(val) ? null : { invalidOrientation: true };
  }