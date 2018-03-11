import { FormControl } from '@angular/forms';

export function compararCamposValidator(otherControlName: string) {

	let thisControl: FormControl;
	let otherControl: FormControl;

	return function compararCamposValidator(control: FormControl) {

		if (!control.parent) {
			return null;
		}

		// Inicializa o validador
		if (!thisControl) {
			thisControl = control;
			otherControl = control.parent.get(otherControlName) as FormControl;
			if (!otherControl) {
				throw new Error('compararCamposValidator(): O outro controle não foi encontrado no grupo');
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