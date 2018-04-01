import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, IonicPage } from 'ionic-angular';
import { BemVindoPage } from '../bem-vindo/bem-vindo';
import { ContaPage } from '../conta/conta';
import { EsqueciMinhaSenhaPage } from '../esqueci-minha-senha/esqueci-minha-senha';
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
		public contaService: ContaService
	) {
		this.bd = ConexaoFabrica.getConexao();
	}

	// Desabilita o menu quando entra na página. Não deve ter menu na view de login.
	ionViewWillEnter() {
		this.menu.swipeEnable(false);
	}

	// Habilita o menu quando sai da página. Não deve ter menu na view de login.
	ionViewDidLeave() {
		this.menu.swipeEnable(true);
	}

	login() {
		this.auth.authenticate(this.credenciais)
			.subscribe(response => {
				this.setRootPage(response);
			}, error => { });
	}

	setRootPage(response) {
		this.auth.successfulLogin(response.headers.get('Authorization'));
		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		this.contaService.encontrePorEmail(contaLocal.email).subscribe(conta => {
			if(conta.situacao === 'ATIVO') {
				this.bd.get('sessao').then((sessao) => {
					let indiceLoteria = sessao.loteria.id - 1;
					let resultadoSincronizePromise = this.menuService.sincronizeOsConcursosDaLoteria(this.menuService.getLoterias()[indiceLoteria]);
					resultadoSincronizePromise.then(resultadoSincronize => {
						this.navCtrl.setRoot(BemVindoPage);
					});
				});
			} else {
				let alert = this.alertCtrl.create({
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
		this.navCtrl.push(ContaPage);
	}

	esqueciMinhaSenha() {
		this.navCtrl.push(EsqueciMinhaSenhaPage);
	}
}