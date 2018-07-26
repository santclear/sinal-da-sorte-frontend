import { Component, Input } from '@angular/core';
import { /* Platform, AlertController */ NavController, LoadingController } from 'ionic-angular';
import { RewardVideoAdMobService } from '../../services/rewarded-admob.service';

@Component({
	selector: "ss-atualizar-resultados",
	templateUrl: 'atualizar-resultados.ss.html'
})
export class AtualizarResultadosSs {
	
	@Input() public nomeLoteriaInput;
	
	constructor(
		// private plataforma: Platform, 
		// private alertCtrl: AlertController,
		private rewardVideoAdMobService: RewardVideoAdMobService,
		private navCtrl: NavController,
		private loadingCtrl: LoadingController) {
	}

	atualizarResultados() {
		// if(this.plataforma.is('mobileweb') || this.plataforma.is('core')) {
		// 	let alert = this.alertCtrl.create({
		// 		title: 'Atualize pelo seu celular Android',
		// 		message: `
		// 			Baixe o aplicativo para o seu celular Android e nele clique nesse mesmo botão. 
		// 			Depois tente novamente por aqui.
		// 			Disponível no Google Play, procure por Sinal da Sorte. Dúvidas? Fale com o nosso suporte: sinaldasorteweb@gmail.com`,
		// 		enableBackdropDismiss: false,
		// 		buttons: [{
		// 			text: 'Ok',
		// 		}]
		// 	});
		// 	alert.present();
		// } else {

			let loading = this.loadingCtrl.create({
				content: 'Aguarde, carregando...'
			});

			loading.present();
			this.rewardVideoAdMobService.mostreAnuncioRewardVideo();

			this.rewardVideoAdMobService.dismiss.subscribe(response => {
				loading.dismiss();
				this.navCtrl.setRoot('ResultadoPage');
			});
		// }
	}
}