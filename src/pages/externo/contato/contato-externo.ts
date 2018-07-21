import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, AlertController, MenuController, LoadingController } from 'ionic-angular';
import { PaginaBase } from '../../pagina.base';
import { ContatoDto } from '../../../dtos/contato.dto';
import { EmailService } from '../../../services/email.service';
import { StorageService } from '../../../services/storage.service';
import { ContaLocalDTO } from '../../../dtos/conta-local.dto';
import { UtilService } from '../../../services/util.service';

@IonicPage()
@Component({
	selector: 'page-contato-externo',
	templateUrl: 'contato-externo.html',
})
export class ContatoExternoPage extends PaginaBase {

	public contatoForm: FormGroup;
	public exibeReCaptcha: string = 'block';
	public reCaptchaTimeout: any;
	public exibeNavegadores: boolean;

	constructor(
		public navCtrl: NavController,
		public menu: MenuController,
		public navParams: NavParams, 
		private formBuilder: FormBuilder,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private emailService: EmailService,
		private storage: StorageService,
		public loadingCtrl: LoadingController,
		public utilService: UtilService) {

		super();
		this.setTitulo("Contato");
		this.instancieContatoForm();
	}

	ionViewDidEnter() {
		this.menu.swipeEnable(false);
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

		let loading = this.loadingCtrl.create({
			content: 'Por favor aguarde, o seu contato está sendo enviado...'
		});

		loading.present();
		this.emailService.envie(contato).subscribe(() => {
			loading.dismiss();
			this.showInsertOk();
		}, error => { 
			loading.dismiss();
		});
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
		this.utilService.reCaptchaProcessResponse(ev).subscribe(() => {
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
		}, erro => {
			let toast = this.toastCtrl.create({
				message: `[Erro: ${erro}] - Reprovado no desafio. TENTE NOVAMENTE.`,
				showCloseButton: true,
				closeButtonText: 'Ok',
				position: 'middle',
				cssClass: 'toastNavegadorNaoSuportado'
			});
			toast.present();
		});
	}
}
