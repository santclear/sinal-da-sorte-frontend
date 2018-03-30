import { FormControl, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export function emailOrEmptyValidator(control: AbstractControl): ValidationErrors | null {
    return control.value === '' ? null : Validators.email(control);
}