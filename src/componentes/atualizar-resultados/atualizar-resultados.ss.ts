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
		private rewardVideoAdMobService: RewardVideoAdMobService,
		private navCtrl: NavController,
		private loadingCtrl: LoadingController) {
	}

	atualizarResultados() {
		let loading = this.loadingCtrl.create({
			content: 'Aguarde, carregando...'
		});

		loading.present();
			
		this.rewardVideoAdMobService.mostreAnuncioRewardVideo(loading);

		this.rewardVideoAdMobService.dismiss.subscribe(response => {
			loading.dismiss();
			this.navCtrl.popAll();
			this.navCtrl.setRoot('ResultadoPage');
		});
	}
}