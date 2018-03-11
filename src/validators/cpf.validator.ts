import { FormControl } from '@angular/forms';

var weightCpf: number[] = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

export function cpfValidator() {

	return function cpfValidator(control: FormControl) {

		if (!control.parent) {
			return null;
		}

		// Inicializa o validador
		if (!control) control.updateValueAndValidity();
		
		let cpf: string = control.value;
		let cpfNumeros: string = cpf.replace(/\./g,'');
		cpfNumeros = cpfNumeros.replace(/_/g,'');
		cpfNumeros = cpfNumeros.replace(/-/g,'');

		if(!isValidCPF(cpfNumeros)) return { matchOther: true };

		return null;

	}
}

function calculate(str: string, weight: number[]) {
	let sum: number = 0;

	for (let i = str.length - 1, digit; i >= 0; i--) {
		digit = Number(str.substring(i, i + 1));
		sum += digit * weight[weight.length - str.length + i];
	}

	sum = 11 - sum % 11;

	return sum > 9 ? 0 : sum;
}

function isValidCPF(cpf: string) {
	if(cpf === "" || null) return false;
	var regex = new RegExp(cpf.charAt(0) +"{11}", "g");
	let match = regex.exec(cpf);

	if ((cpf === null) || (cpf.length !== 11) || match !== null) return false;

	let digit1: number = calculate(cpf.substring(0, 9), weightCpf);
	let digit2: number = calculate(cpf.substring(0, 9) + digit1, weightCpf);

	return cpf === cpf.substring(0, 9) + digit1.toString() + digit2.toString();
}