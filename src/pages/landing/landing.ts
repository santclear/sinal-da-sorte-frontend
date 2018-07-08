import { Component } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-landing',
	templateUrl: 'landing.html',
})
export class LandingPage {

	constructor(public menu: MenuController) {
	}

	ionViewDidEnter() {
		this.menu.swipeEnable(false);
	}

	ionViewWillLeave() {
		this.menu.swipeEnable(true);
	}
}
