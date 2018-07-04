import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
	selector: "ss-navegadores-suportados",
	templateUrl: 'navegadores-suportados.ss.html'
})
export class NavegadoresSuportadosSs {
	constructor(public toastCtrl: ToastController) {}

	toastNavegadorSuportado(descricao: string) {
		try {
			let toast = this.toastCtrl.create({
				message: descricao,
				duration: 5000,
				position: 'middle',
				cssClass: 'toastNavegadorSuportado'
			});
			toast.present();
        } catch(e) {}
	}

	toastNavegadorNaoSuportado(descricao: string) {
		try {
			let toast = this.toastCtrl.create({
				message: descricao,
				duration: 5000,
				position: 'middle',
				cssClass: 'toastNavegadorNaoSuportado'
			});
			toast.present();
        } catch(e) {}
	}
}