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
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
	selector: 'page-conta',
	templateUrl: 'conta.html',
})
export class ContaPage {   

	contaForm: FormGroup;
	estados: EstadoDTO[];
	cidades: CidadeDTO[];
	generos: SelectItem[];
	ptBr: any;
	isNotUpdateContaForm: boolean = true;

	constructor(
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public contaService: ContaService,
		public enderecoService: EnderecoService,
		public alertCtrl: AlertController,
		public http: HttpClient) {

		this.contaForm = this.formBuilder.group({
			nome: ['Sant', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			sobrenome: ['Costa', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			cpf: ['041.793.629-02', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
			dataDeNascimento: [null, [Validators.required]],
			generoId: [1, [Validators.required]],
			email: ['sa@s.com', [Validators.required, Validators.email]],
			senha: ['12345678', [Validators.required, Validators.minLength(8)]],
			confirmeSenha: ['12345678', [Validators.required, Validators.minLength(8), compararCamposValidator('senha')]],
			cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
			logradouro: ['logradouro', [Validators.required]],
			numero: ['334', [Validators.required]],
			complemento: ['303', []],
			bairro: ['bairro', [Validators.required]],
			cidade: ['cidade', [Validators.required]],
			uf: ['ufufuf', [Validators.required]],
			telefone1: ['4832496515', [Validators.required, Validators.minLength(10)]],
			telefone2: ['', [Validators.minLength(10)]],
			telefone3: ['', [Validators.minLength(10)]]
		});

		this.contaForm.get('logradouro').disable();
		this.contaForm.get('bairro').disable();
		this.contaForm.get('cidade').disable();
		this.contaForm.get('uf').disable();

        this.generos = [
            {label: 'Homem', value: '1'},
            {label: 'Mulher', value: '2'},
            {label: 'Outro', value: '3'},
        ];
	}

	ngOnInit() {
        this.ptBr = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            dayNamesMin: ["Do","Se","Te","Qa","Qi","Se","Sá"],
            monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
            monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
            today: 'Hoje',
            clear: 'Clear'
        };
    }

	cadastre() {
		let endereco: EnderecoDto = {
			cep:this.contaForm.value.cep,
			logradouro:this.contaForm.value.logradouro,
			numero: this.contaForm.value.numero,
			complemento:this.contaForm.value.complemento,
			bairro:this.contaForm.value.bairro,
			cidade:this.contaForm.value.cidade,
			uf:this.contaForm.value.uf
		}

		let usuario: UsuarioDTO = {
			id:null,
			nome:this.contaForm.value.nome,
			sobrenome:this.contaForm.value.sobrenome,
			cpf:this.contaForm.value.cpf,
			dataDeNascimento:this.contaForm.value.dataDeNascimento,
			genero:this.contaForm.value.generoId,
			endereco: endereco,
			telefone1:this.contaForm.value.telefone1,
			telefone2:this.contaForm.value.telefone2,
			telefone3:this.contaForm.value.telefone3
		}

		let conta: ContaDTO = {
			id:null,
			email:this.contaForm.value.email,
			senha:this.contaForm.value.senha,
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
		this.enderecoService.findByCep(event.srcElement.value).subscribe(response => {
			this.contaForm = this.formBuilder.group({
				nome: [this.contaForm.value.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
				sobrenome: [this.contaForm.value.sobrenome, [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
				cpf: [this.contaForm.value.cpf, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
				dataDeNascimento: [this.contaForm.value.dataDeNascimento, [Validators.required]],
				generoId: [this.contaForm.value.generoId, [Validators.required]],
				email: [this.contaForm.value.email, [Validators.required, Validators.email]],
				senha: [this.contaForm.value.senha, [Validators.required, Validators.minLength(8)]],
				confirmeSenha: [this.contaForm.value.confirmeSenha, [Validators.required, Validators.minLength(8), compararCamposValidator('senha')]],
				cep: [response.cep, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
				logradouro: [response.logradouro, [Validators.required]],
				numero: [this.contaForm.value.numero, [Validators.required]],
				complemento: [this.contaForm.value.complemento, []],
				bairro: [response.bairro, [Validators.required]],
				cidade: [response.cidade, [Validators.required]],
				uf: [response.uf, [Validators.required]],
				telefone1: [this.contaForm.value.telefone1, [Validators.required, Validators.minLength(10)]],
				telefone2: [this.contaForm.value.telefone2, [Validators.minLength(10)]],
				telefone3: [this.contaForm.value.telefone3, [Validators.minLength(10)]]
			});
		});
		this.isNotUpdateContaForm = false;
	}
}
