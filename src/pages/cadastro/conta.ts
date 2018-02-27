import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from 'ionic-angular';
import { CidadeService } from '../../services/cidade.service';
import { EstadoService } from '../../services/estado.service';
import { ContaService } from '../../services/conta.service';
import { EnderecoService } from '../../services/endereco.service';
import { EstadoDTO } from '../../dtos/estado.dto';
import { CidadeDTO } from '../../dtos/cidade.dto';
import { ContaDTO } from '../../dtos/conta.dto';
import { UsuarioDTO } from '../../dtos/usuario.dto';

import { compararCamposValidator } from '../../validators/comparar-campos.validator';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'page-conta',
	templateUrl: 'conta.html',
})
export class ContaPage {

	formGroup: FormGroup;
	estados: EstadoDTO[];
	cidades: CidadeDTO[];

	constructor(
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public cidadeService: CidadeService,
		public estadoService: EstadoService,
		public contaService: ContaService,
		public enderecoService: EnderecoService,
		public alertCtrl: AlertController,
		public http: HttpClient) {

		this.formGroup = this.formBuilder.group({
			nome: ['Elon', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			sobrenome: ['Musk', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			email: ['elon@gmail.com', [Validators.required, Validators.email]],
			generoId: [1, [Validators.required]],
			dataDeNascimento: ['01/01/2005', [Validators.required, Validators.pattern('^(?:(?:3[01]|[12][0-9]|0?[1-9])/(?:10|12|0?[13578])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$')]],
			cpf: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
			senha: ['123', [Validators.required]],
			confirmeSenha: ['123', [Validators.required, compararCamposValidator('senha')]],
			logradouro: ['', [Validators.required]],
			numero: ['25', [Validators.required]],
			complemento: ['Apto 3', []],
			bairro: ['', [Validators.required]],
			cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
			telefone1: ['48998653311', [Validators.required, Validators.minLength(10)]],
			telefone2: ['', [Validators.minLength(11)]],
			telefone3: ['', [Validators.minLength(11)]],
			estadoId: [null, [Validators.required]],
			cidadeId: [null, [Validators.required]]
		});
	}

	// ionViewDidLoad() {
	// 	this.estadoService.findAll()
	// 		.subscribe(response => {
	// 			this.estados = response;
	// 			this.formGroup.controls.estadoId.setValue(this.estados[0].id);
	// 			this.updateCidades();
	// 		},
	// 			error => { });
	// }

	// updateCidades() {
	// 	let estadoId = this.formGroup.value.estadoId;
	// 	this.cidadeService.findAll(estadoId)
	// 		.subscribe(response => {
	// 			this.cidades = response;
	// 			this.formGroup.controls.cidadeId.setValue(null);
	// 		},
	// 			error => { });
	// }

	cadastre() {
		let usuario: UsuarioDTO = {
			id:null,
			nome:this.formGroup.value.nome,
			sobrenome:this.formGroup.value.sobrenome,
			genero:this.formGroup.value.generoId,
			dataDeNascimento:this.formGroup.value.dataDeNascimento,
			cpf:this.formGroup.value.cpf,
			logradouro:this.formGroup.value.logradouro,
			complemento:this.formGroup.value.complemento,
			cep:this.formGroup.value.cep,
			bairro:this.formGroup.value.bairro,
			cidadeId:this.formGroup.value.cidadeId,
			telefone1:this.formGroup.value.telefone1,
			telefone2:this.formGroup.value.telefone2,
			telefone3:this.formGroup.value.telefone3
		}

		let conta: ContaDTO = {
			id:null,
			email:this.formGroup.value.email,
			senha:this.formGroup.value.senha,
			usuario
		};

		this.contaService.insert(conta)
			.subscribe(response => {
				this.showInsertOk();
			}, error => { });
	}

	showInsertOk() {
		let alert = this.alertCtrl.create({
			title: 'Sucesso!',
			message: 'Cadastro efetuado com sucesso',
			enableBackdropDismiss: false,
			buttons: [{
				text: 'Ok',
				handler: () => { this.navCtrl.pop(); }
			}]
		});
		alert.present();
	}

	populeEnderecos(event) {
		this.enderecoService.findByCep(event.value).subscribe(response => {
			this.formGroup = this.formBuilder.group({
				nome: ['Elon', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
				sobrenome: ['Musk', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
				email: ['elon@gmail.com', [Validators.required, Validators.email]],
				generoId: [1, [Validators.required]],
				dataDeNascimento: ['01/01/2005', [Validators.required, Validators.pattern('^(?:(?:3[01]|[12][0-9]|0?[1-9])/(?:10|12|0?[13578])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$')]],
				cpf: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
				senha: ['123', [Validators.required]],
				confirmeSenha: ['123', [Validators.required, compararCamposValidator('senha')]],
				logradouro: [response.logradouro, [Validators.required]],
				numero: ['25', [Validators.required]],
				complemento: ['Apto 3', []],
				bairro: [response.bairro, [Validators.required]],
				cep: [response.cep.replace('-',''), [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
				telefone1: ['48998653311', [Validators.required, Validators.minLength(10)]],
				telefone2: ['', [Validators.minLength(11)]],
				telefone3: ['', [Validators.minLength(11)]],
				estadoId: [null, [Validators.required]],
				cidadeId: [null, [Validators.required]]
			});
		});
	}
}
