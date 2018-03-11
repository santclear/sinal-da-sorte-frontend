import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { BemVindoPage } from '../bem-vindo/bem-vindo';
import { ContaPage } from '../cadastro/conta';
import { CredenciaisDTO } from '../../dtos/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';

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

	constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService, public menuService: MenuService) {
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
		this.bd.get('sessao').then((sessao) => {
			let indiceLoteria = sessao.loteria.id - 1;
			let resultadoSincronizePromise = this.menuService.sincronizeOsConcursosDaLoteria(this.menuService.getLoterias()[indiceLoteria]);
			resultadoSincronizePromise.then(resultadoSincronize => {
				this.navCtrl.setRoot(BemVindoPage);
			});
		});
	}

	cadastrar() {
		this.navCtrl.push(ContaPage);
	}
}