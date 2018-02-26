import { FormControl } from '@angular/forms';

export function compararCamposValidator(otherControlName: string) {

	let thisControl: FormControl;
	let otherControl: FormControl;

	return function compararCamposValidator(control: FormControl) {

		if (!control.parent) {
			return null;
		}

		// Initializing the validator.
		if (!thisControl) {
			thisControl = control;
			otherControl = control.parent.get(otherControlName) as FormControl;
			if (!otherControl) {
				throw new Error('compararCamposValidator(): other control is not found in parent group');
			}
			otherControl.valueChanges.subscribe(() => {
				thisControl.updateValueAndValidity();
			});
		}

		if (!otherControl) {
			return null;
		}

		if (otherControl.value !== thisControl.value) {
			return {
				matchOther: true
			};
		}

		return null;

	}

}