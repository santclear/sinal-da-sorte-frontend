import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController, IonicPage, MenuController } from 'ionic-angular';
import { ContaService } from '../../services/conta.service';
// import { EnderecoService } from '../../services/endereco.service';
import { ContaNewDto } from '../../dtos/conta-new.dto';
import { UsuarioDto } from '../../dtos/usuario.dto';
// import { EnderecoDto } from '../../dtos/endereco.dto';

import { compararCamposValidator } from '../../validators/comparar-campos.validator';
// import { cpfValidator } from '../../validators/cpf.validator';
import { SelectItem } from 'primeng/components/common/selectitem';

@IonicPage()
@Component({
	selector: 'page-conta',
	templateUrl: 'conta.html',
})
export class ContaPage {

	public contaForm: FormGroup;
	public ptBr: any;
	public generos: SelectItem[];
	public exibeReCaptcha: string = 'block';
	public reCaptchaTimeout: any;

	constructor(
		private navCtrl: NavController,
		public menu: MenuController,
		private formBuilder: FormBuilder,
		private contaService: ContaService,
		// private enderecoService: EnderecoService,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController) {

		this.instancieContaForm();
	}

	ionViewDidEnter() {
		this.menu.swipeEnable(false);
	}

	ionViewWillLeave() {
		this.menu.swipeEnable(true);
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
            clear: 'Limpar'
		};
    }

	cadastre() {
		// if(this.contaForm.controls['cep'].valid) {
		// 	this.enderecoService.findByCep(this.contaForm.value.cep).subscribe(response => {
		// 		this.contaForm.controls['logradouro'].setValue(response.logradouro);
		// 		this.contaForm.controls['bairro'].setValue(response.bairro);
		// 		this.contaForm.controls['cidade'].setValue(response.cidade);
		// 		this.contaForm.controls['uf'].setValue(response.uf);

				// let endereco: EnderecoDto = {
				// 	cep:this.contaForm.value.cep,
				// 	logradouro:this.contaForm.value.logradouro,
				// 	numero: this.contaForm.value.numero,
				// 	complemento:this.contaForm.value.complemento,
				// 	bairro:this.contaForm.value.bairro,
				// 	cidade:this.contaForm.value.cidade,
				// 	uf:this.contaForm.value.uf
				// }
		
				let date = this.contaForm.value.dataDeNascimento;
				let mes = date.getMonth() + 1;
				let dataDeNascimento = date.getFullYear() +'-'+ mes +'-'+ date.getDate();
		
				let usuario: UsuarioDto = {
					id:null,
					nome:this.contaForm.value.nome,
					sobrenome:this.contaForm.value.sobrenome,
					// cpf:this.contaForm.value.cpf,
					dataDeNascimento: dataDeNascimento,
					genero:this.contaForm.value.generoId,
					// endereco: endereco,
					// telefone1:this.contaForm.value.telefone1,
					// telefone2:this.contaForm.value.telefone2,
					// telefone3:this.contaForm.value.telefone3
				}
		
				let conta: ContaNewDto = {
					id:null,
					email:this.contaForm.value.email,
					senha:this.contaForm.value.senha,
					usuario
				};
		
				this.contaService.insert(conta).subscribe(response => {
					this.showInsertOk(conta.email);
				}, error => { });
			// }, erro => {
			// 	this.contaForm.controls['cep'].setValue('');
			// 	this.contaForm.controls['logradouro'].setValue('');
			// 	this.contaForm.controls['bairro'].setValue('');
			// 	this.contaForm.controls['cidade'].setValue('');
			// 	this.contaForm.controls['uf'].setValue('');

			// 	let toast = this.toastCtrl.create({
			// 		message: erro.message,
			// 		showCloseButton: true,
			// 		closeButtonText: 'Ok',
			// 		duration: 5000,
			// 		position: 'top',
			// 		cssClass: 'toastGeral'
			// 	});
			// 	toast.present();
			// });
		// }
	}

	showInsertOk(email: string) {
		let alert = this.alertCtrl.create({
			title: 'Sucesso!',
			message: 'Cadastro efetuado com sucesso.\nSiga as instruções enviadas para o e-mail: '+ email,
			enableBackdropDismiss: false,
			buttons: [{
				text: 'Ok',
				handler: () => { this.navCtrl.pop(); }
			}]
		});
		alert.present();
		try {
			(<any>window).grecaptcha.reset();
			clearTimeout(this.reCaptchaTimeout);
		} catch(err) {err}
	}

	// populeEnderecos(event) {
	// 	if(this.contaForm.controls['cep'].valid) {
	// 		this.enderecoService.findByCep(event.srcElement.value).subscribe(response => {
	// 			this.contaForm.controls['logradouro'].setValue(response.logradouro);
	// 			this.contaForm.controls['bairro'].setValue(response.bairro);
	// 			this.contaForm.controls['cidade'].setValue(response.cidade);
	// 			this.contaForm.controls['uf'].setValue(response.uf);
	// 		}, erro => {
	// 			this.contaForm.controls['cep'].setValue('');
	// 			this.contaForm.controls['logradouro'].setValue('');
	// 			this.contaForm.controls['bairro'].setValue('');
	// 			this.contaForm.controls['cidade'].setValue('');
	// 			this.contaForm.controls['uf'].setValue('');

	// 			let toast = this.toastCtrl.create({
	// 				message: erro.message,
	// 				showCloseButton: true,
	// 				closeButtonText: 'Ok',
	// 				duration: 5000,
	// 				position: 'top',
	// 				cssClass: 'toastGeral'
	// 			});
	// 			toast.present();
	// 		});
	// 	}
	// }

	instancieContaForm() {
		this.contaForm = this.formBuilder.group({
			nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			// cpf: ['', [Validators.required, cpfValidator()]],
			dataDeNascimento: [new Date('1990-1-1'), [Validators.required]],
			generoId: [null, [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			confirmeEmail: ['', [compararCamposValidator('email')]],
			senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
			confirmeSenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100), compararCamposValidator('senha')]],
			// cep: ['', [Validators.required, Validators.minLength(8)]],
			// logradouro: ['', []],
			// numero: ['', [Validators.maxLength(6), Validators.pattern('\\d+')]],
			// complemento: ['', [Validators.maxLength(100)]],
			// bairro: ['', []],
			// cidade: ['', [Validators.required]],
			// uf: ['', [Validators.required]],
			// telefone1: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(16), Validators.pattern('\\d+')]],
			// telefone2: ['', [Validators.minLength(10), Validators.maxLength(16), Validators.pattern('\\d+')]],
			// telefone3: ['', [Validators.minLength(10), Validators.maxLength(16), Validators.pattern('\\d+')]],
			reCaptcha: [null, [Validators.required]],
		});

        this.generos = [
            { label: 'Homem', value: '1' },
            { label: 'Mulher', value: '2' },
            { label: 'Outro', value: '3' },
		];
	}

	voltar() {
        this.navCtrl.setRoot('LoginPage');
	}
	
	reCaptcha(ev) {
		if (ev) this.contaForm.controls['reCaptcha'].setValue(true);
		this.exibeReCaptcha = 'none';
		this.reCaptchaTimeout = setTimeout(() => {
			this.exibeReCaptcha = 'block';
			this.contaForm.controls['reCaptcha'].setValue(null);
			try {
				(<any>window).grecaptcha.reset();
				let toast = this.toastCtrl.create({
					message: 'O tempo do reCaptcha expirou! Para seguir com a atualização é necessário realizar o desafio do reCaptcha novamente.',
					showCloseButton: true,
					closeButtonText: 'Ok',
					duration: 15000,
					position: 'middle',
					cssClass: 'toastGeral'
				});
				toast.present(toast);
			} catch(err) {err} finally {
				clearTimeout(this.reCaptchaTimeout);
			}
		}, 40000);
	}
}
