import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from 'ionic-angular';
import { ContaService } from '../../services/conta.service';
import { EnderecoService } from '../../services/endereco.service';
import { EstadoDTO } from '../../dtos/estado.dto';
import { CidadeDTO } from '../../dtos/cidade.dto';
import { ContaDTO } from '../../dtos/conta.dto';
import { UsuarioDTO } from '../../dtos/usuario.dto';

import { compararCamposValidator } from '../../validators/comparar-campos.validator';
import { HttpClient } from '@angular/common/http';
import { EnderecoDto } from '../../dtos/endereco.dto';

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
		public contaService: ContaService,
		public enderecoService: EnderecoService,
		public alertCtrl: AlertController,
		public http: HttpClient) {

		this.formGroup = this.formBuilder.group({
			nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
			dataDeNascimento: ['', [Validators.required]],
			generoId: [null, [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			senha: ['', [Validators.required]],
			confirmeSenha: ['', [Validators.required, compararCamposValidator('senha')]],
			cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
			logradouro: ['', [Validators.required]],
			numero: ['', [Validators.required]],
			complemento: ['', []],
			bairro: ['', [Validators.required]],
			cidade: ['', [Validators.required]],
			uf: ['', [Validators.required]],
			telefone1: ['', [Validators.required, Validators.minLength(10)]],
			telefone2: ['', [Validators.minLength(11)]],
			telefone3: ['', [Validators.minLength(11)]]
		});

		this.formGroup.get('logradouro').disable();
		this.formGroup.get('bairro').disable();
		this.formGroup.get('cidade').disable();
		this.formGroup.get('uf').disable();
	}

	cadastre() {
		let endereco: EnderecoDto = {
			cep:this.formGroup.value.cep,
			logradouro:this.formGroup.value.logradouro,
			numero: this.formGroup.value.numero,
			complemento:this.formGroup.value.complemento,
			bairro:this.formGroup.value.bairro,
			cidade:this.formGroup.value.cidade,
			uf:this.formGroup.value.uf
		}

		let usuario: UsuarioDTO = {
			id:null,
			nome:this.formGroup.value.nome,
			sobrenome:this.formGroup.value.sobrenome,
			cpf:this.formGroup.value.cpf,
			dataDeNascimento:this.formGroup.value.dataDeNascimento,
			genero:this.formGroup.value.generoId,
			endereco: endereco,
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
				nome: [this.formGroup.value.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
				sobrenome: [this.formGroup.value.sobrenome, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
				cpf: [this.formGroup.value.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
				dataDeNascimento: [this.formGroup.value.dataDeNascimento, [Validators.required, Validators.pattern('^(?:(?:3[01]|[12][0-9]|0?[1-9])/(?:10|12|0?[13578])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$')]],
				generoId: [this.formGroup.value.generoId, [Validators.required]],
				email: [this.formGroup.value.email, [Validators.required, Validators.email]],
				senha: [this.formGroup.value.senha, [Validators.required]],
				confirmeSenha: [this.formGroup.value.confirmeSenha, [Validators.required, compararCamposValidator('senha')]],
				cep: [response.cep.replace('-',''), [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
				logradouro: [response.logradouro, [Validators.required]],
				numero: [this.formGroup.value.numero, [Validators.required]],
				complemento: [this.formGroup.value.complemento, []],
				bairro: [response.bairro, [Validators.required]],
				cidade: [response.cidade, [Validators.required]],
				uf: [response.uf, [Validators.required]],
				telefone1: [this.formGroup.value.telefone1, [Validators.required, Validators.minLength(10)]],
				telefone2: [this.formGroup.value.telefone2, [Validators.minLength(11)]],
				telefone3: [this.formGroup.value.telefone3, [Validators.minLength(11)]]
			});
		});
	}
}
