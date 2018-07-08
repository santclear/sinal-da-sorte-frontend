import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: "ss-navbar-conversao-landscape",
	templateUrl: 'navbar-conversao-landscape.ss.html'
})
export class NavbarConversaoLandscapeSs {
	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	abraContato() {
		this.navCtrl.setRoot('ContatoExternoPage');
	}

	abraConta() {
		this.navCtrl.setRoot('ContaExternoPage');
	}

	abraLogin() {
		this.navCtrl.setRoot('LoginPage');
	}

	goLanding() {
		this.navCtrl.setRoot('LandingPage');
	}
}