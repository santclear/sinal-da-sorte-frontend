import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-landing',
	templateUrl: 'landing.html',
})
export class LandingPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	abraContato() {
		this.navCtrl.push('ContatoPage', { 'exibeLogo': false });
	}

	abraConta() {
		this.navCtrl.push('ContaPage');
	}

	abraLogin() {
		this.navCtrl.push('LoginPage');
	}
}
