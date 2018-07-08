import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-landing',
	templateUrl: 'landing.html',
})
export class LandingPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
	}

	ionViewDidEnter() {
		this.menu.swipeEnable(false);
	}

	ionViewWillLeave() {
		this.menu.swipeEnable(true);
	}

	abraContato() {
		this.navCtrl.push('ContatoPage', { 'exibeLogo': false, vemDePush: true });
	}

	abraConta() {
		this.navCtrl.push('ContaPage', {vemDePush: true});
	}

	abraLogin() {
		this.navCtrl.setRoot('LoginPage');
	}
}
