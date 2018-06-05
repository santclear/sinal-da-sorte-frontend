import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';
import { ContatoDto } from '../../dtos/contato.dto';
import { EmailService } from '../../services/email.service';

@IonicPage()
@Component({
	selector: 'page-contato',
	templateUrl: 'contato.html',
})
export class ContatoPage extends PaginaBase {

	public contatoForm: FormGroup;
	public exibeReCaptcha: string = 'block';
	public reCaptchaTimeout: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private formBuilder: FormBuilder,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private emailService: EmailService) {

		super();
		this.setTitulo("Contato");
		this.instancieContatoForm();
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
		let contato: ContatoDto = {
			para:this.contatoForm.value.tipoContato,
			assunto:this.contatoForm.value.assunto,
			mensagem:this.contatoForm.value.mensagem,
			contato: this.contatoForm.value.contato
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
		(<any>window).grecaptcha.reset();
		clearTimeout(this.reCaptchaTimeout);
		this.instancieContatoForm();
	}
	
	reCaptcha(ev) {
		if (ev) this.contatoForm.controls['reCaptcha'].setValue(true);
		this.exibeReCaptcha = 'none';
		this.reCaptchaTimeout = setTimeout(() => {
			this.exibeReCaptcha = 'block';
			this.contatoForm.controls['reCaptcha'].setValue(null);
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
		}, 40000);
	}
}
