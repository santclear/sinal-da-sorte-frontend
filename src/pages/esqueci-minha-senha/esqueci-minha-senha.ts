import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { CredenciaisDTO } from '../../dtos/credenciais.dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-esqueci-minha-senha',
	templateUrl: 'esqueci-minha-senha.html',
})
export class EsqueciMinhaSenhaPage {

	esqueciSenhaForm: FormGroup;

	constructor(
		public navCtrl: NavController,
		public menu: MenuController,
		public navParams: NavParams,
		public formBuilder: FormBuilder, 
		public auth: AuthService, 
		public alertCtrl: AlertController) {
		
		this.esqueciSenhaForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}

	ionViewDidEnter() {
		this.menu.swipeEnable(false);
	}

	ionViewWillLeave() {
		this.menu.swipeEnable(true);
	}

	envieNovaSenha() {
		let credenciais: CredenciaisDTO = {
			email: this.esqueciSenhaForm.value.email,
			senha: ''
		}
		this.auth.envieNovaSenha(credenciais).subscribe(response => {
			console.log(response);
			this.mostreEnvioOk(this.esqueciSenhaForm.value.email);
		}, erro => {});
	}

	mostreEnvioOk(email: string) {
		let alert = this.alertCtrl.create({
			title: 'Sucesso!',
			message: 'Uma nova senha foi enviada, acesse a caixa do seu e-mail: '+ email,
			enableBackdropDismiss: false,
			buttons: [{
				text: 'Ok',
				handler: () => { this.navCtrl.pop(); }
			}]
		});
		alert.present();
	}
}
