import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, AlertController, MenuController } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';
import { ContatoDto } from '../../dtos/contato.dto';
import { EmailService } from '../../services/email.service';
import { StorageService } from '../../services/storage.service';
import { ContaLocalDTO } from '../../dtos/conta-local.dto';

@IonicPage()
@Component({
	selector: 'page-contato',
	templateUrl: 'contato.html',
})
export class ContatoPage extends PaginaBase {

	public contatoForm: FormGroup;
	public exibeReCaptcha: string = 'block';
	public reCaptchaTimeout: any;
	public exibeLogo;

	constructor(
		public navCtrl: NavController,
		public menu: MenuController,
		public navParams: NavParams, 
		private formBuilder: FormBuilder,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private emailService: EmailService,
		private storage: StorageService) {

		super();
		this.exibeLogo = navParams.get('exibeLogo');
		if(this.exibeLogo === true || this.exibeLogo === undefined) {
			this.exibeLogo = true;
		}
		this.setTitulo("Contato");
		this.instancieContatoForm();
	}

	ionViewDidEnter() {
		if(!(this.exibeLogo === true || this.exibeLogo === undefined)) {
			this.menu.swipeEnable(false);
		}
	}

	ionViewWillLeave() {
		this.menu.swipeEnable(true);
	}

	instancieContatoForm() {
		this.contatoForm = this.formBuilder.group({
			tipoContato: ['sinaldasorteweb@gmail.com', [Validators.required]],
			assunto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			mensagem: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
			contato: ['', [Validators.maxLength(100)]],
			reCaptcha: [null, [Validators.required]],
		});
	}

	envieContato() {
		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		let emailLogin: string;
		if(contaLocal !== null) emailLogin = contaLocal.email;
		let contato: ContatoDto = {
			para: this.contatoForm.value.tipoContato,
			assunto: this.contatoForm.value.assunto,
			mensagem: this.contatoForm.value.mensagem,
			contato: this.contatoForm.value.contato,
			emailLogin: emailLogin
		};

		this.emailService.envie(contato).subscribe(() => {
			this.showInsertOk();
		}, error => { });
	}

	showInsertOk() {
		let alert = this.alertCtrl.create({
			title: 'Sucesso!',
			message: 'Obrigado pelo seu contato, sua mensagem será processada, se necessário retornaremos em breve.',
			enableBackdropDismiss: false,
			buttons: [{
				text: 'Ok'
			}]
		});
		alert.present();
		this.exibeReCaptcha = 'block';
		try {
			(<any>window).grecaptcha.reset();
			clearTimeout(this.reCaptchaTimeout);
		} catch(err) {err}
		this.instancieContatoForm();
	}
	
	reCaptcha(ev) {
		if (ev) this.contatoForm.controls['reCaptcha'].setValue(true);
		this.exibeReCaptcha = 'none';
		this.reCaptchaTimeout = setTimeout(() => {
			this.exibeReCaptcha = 'block';
			this.contatoForm.controls['reCaptcha'].setValue(null);
			try {
				(<any>window).grecaptcha.reset();
				let toast = this.toastCtrl.create({
					message: 'O tempo do reCaptcha expirou! Para enviar o seu contato é necessário realizar o desafio do reCaptcha novamente.',
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
