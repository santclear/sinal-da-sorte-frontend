import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage, MenuController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { CredenciaisDTO } from '../../dtos/credenciais.dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContaLocalDTO } from '../../dtos/conta-local.dto';
import { StorageService } from '../../services/storage.service';

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
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public storage: StorageService) {
		
		this.esqueciSenhaForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}

	ionViewDidEnter() {
		this.menu.swipeEnable(false);
		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		if(!contaLocal) {
			let vemDePush: boolean = this.navParams.get('vemDePush');
			if(!vemDePush) this.navCtrl.setRoot('LoginPage');
		}
	}

	ionViewWillLeave() {
		this.menu.swipeEnable(true);
	}

	envieNovaSenha() {
		let credenciais: CredenciaisDTO = {
			email: this.esqueciSenhaForm.value.email,
			senha: ''
		}

		let loading = this.loadingCtrl.create({
			content: 'Por favor aguarde, a sua requisição está sendo processada...'
		});

		loading.present();

		this.auth.envieNovaSenha(credenciais).subscribe(response => {
			loading.dismiss();
			this.mostreEnvioOk(this.esqueciSenhaForm.value.email);
		}, erro => {
			loading.dismiss();
		});
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
