import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'page-conta',
	templateUrl: 'conta.html',
})
export class ContaPage {

	formGroup: FormGroup;

	constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
		this.formGroup = this.formBuilder.group({
			nome: ['Elon', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			sobrenome: ['Musk', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			email: ['elon@gmail.com', [Validators.required, Validators.email]],
			generoId: [1, [Validators.required]],
			dataDeNascimento: ['1', [Validators.required, Validators.pattern('dd/dd/dddd')]],
			cpf: ['06134596280', [Validators.required, Validators.pattern('ddd.ddd.ddd-ddd')]],
			senha: ['123', [Validators.required]],
			logradouro: ['Rua Via', [Validators.required]],
			numero: ['25', [Validators.required]],
			complemento: ['Apto 3', []],
			bairro: ['Copacabana', [Validators.required]],
			cep: ['10828333', [Validators.required, Validators.pattern('ddddd-ddd')]],
			telefone1: ['977261827', [Validators.required]],
			telefone2: ['', [Validators.minLength(11), Validators.maxLength(30)]],
			telefone3: ['', [Validators.minLength(11), Validators.maxLength(30)]],
			estadoId: [null, [Validators.required]],
			cidadeId: [null, [Validators.required]]
		});
	}

	cadastre() {
		console.log("enviou o form");
	}
}
