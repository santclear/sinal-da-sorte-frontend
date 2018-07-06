import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, IonicPage, LoadingController } from 'ionic-angular';
import { CredenciaisDTO } from '../../dtos/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';
import { ContaLocalDTO } from '../../dtos/conta-local.dto';
import { StorageService } from '../../services/storage.service';
import { ContaService } from '../../services/conta.service';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	public bd: any;
	public exibeNavegadores: boolean;

	credenciais: CredenciaisDTO = {
		email: "",
		senha: ""
	}

	constructor(
		public navCtrl: NavController, 
		public menu: MenuController, 
		public auth: AuthService, 
		public storage: StorageService,
		public alertCtrl: AlertController,
		public menuService: MenuService,
		public contaService: ContaService,
		public loadingCtrl: LoadingController
	) {
		this.bd = ConexaoFabrica.getConexao();
	}

	// Desabilita o menu quando entra na página. Não deve ter menu na view de login.
	ionViewDidEnter() {
		this.menu.swipeEnable(false);
	}

	// Habilita o menu quando sai da página. Não deve ter menu na view de login.
	ionViewWillLeave() {
		this.menu.swipeEnable(true);
	}

	login() {
		let loading = this.loadingCtrl.create({
			content: 'Entrando...'
		});
		loading.present();
		this.auth.authenticate(this.credenciais).subscribe(response => {
			loading.dismiss();
			this.setRootPage(response);
		}, error => { 
			loading.dismiss();
		});
	}

	setRootPage(response) {
		this.auth.successfulLogin(response.headers.get('Authorization'));
		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		this.contaService.encontrePorEmail(contaLocal.email).subscribe(conta => {
			let alert;
			switch(conta.situacao) {
				case 'ATIVO':
					this.bd.get('sessao').then((sessao) => {
						let indiceLoteria = sessao.loteria.id - 1;
						let resultadoSincronizePromise = this.menuService.sincronizeOsConcursosDaLoteria(this.menuService.getLoterias()[indiceLoteria]);
						resultadoSincronizePromise.then(resultadoSincronize => {
							this.navCtrl.setRoot('ResultadoPage');
						});
					});
					break;
				case 'INATIVO_PERMANENTE':
					alert = this.alertCtrl.create({
						title: 'Credenciais inválidas',
						message: 'As credenciais informadas são inválidas',
						enableBackdropDismiss: false,
						buttons: [{
							text: 'Ok',
							handler: () => {  }
						}]
					});
					alert.present();
					this.storage.setContaLocal(null);
					this.navCtrl.setRoot('LoginPage');
					break;
				default:
					alert = this.alertCtrl.create({
						title: 'Conta inativa',
						message: 'Sua conta não está ativada.\nPara ativar, clique no link enviado para o e-mail '+ contaLocal.email +'.',
						enableBackdropDismiss: false,
						buttons: [{
							text: 'Ok',
							handler: () => {  }
						}]
					});
					alert.present();
			}
		});
	}

	cadastrar() {
		this.navCtrl.push('ContaPage');
	}

	esqueciMinhaSenha() {
		this.navCtrl.push('EsqueciMinhaSenhaPage');
	}

	goLanding() {
		this.navCtrl.setRoot('LandingPage');
	}
}