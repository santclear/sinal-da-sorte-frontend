import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-conta',
	templateUrl: 'conta.html',
})
export class ContaPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	cadastre() {
		console.log("enviou o form");
	}
}
