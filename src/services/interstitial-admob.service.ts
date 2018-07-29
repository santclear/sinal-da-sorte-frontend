import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeInterstitialConfig} from "@ionic-native/admob-free";
import { StorageService } from "./storage.service";

@Injectable()
export class InterstitialAdMobService {

	constructor(public admob: AdMobFree, public plataforma: Platform, public storage: StorageService) {
		// this.consomeCredito();
	}
	
    mostreAnuncioInterstitial() {
		let intersticialConfig: AdMobFreeInterstitialConfig = {
			isTesting: true, // Remove in production
			autoShow: true,
			// id: 'ca-app-pub-5335868077868255/2236896705'
		};
		
		this.admob.interstitial.config(intersticialConfig);
	
		this.admob.interstitial.prepare().then(() => {
		}).catch(e => {console.log(e)});

		// setTimeout(() => {
		// 	this.mostreAnuncioInterstitial();
		// }, 120000);
	}
	
	consomeCredito() {
		if(this.plataforma.is('android')) {
			let contadorStr: string = this.storage.getContadorAnuncio();
			let contador;
			if(contadorStr === null) {
				contador = Math.floor((Math.random() * 6) + 7);
				contadorStr = contador.toString();
				this.storage.setContadorAnuncio(contadorStr);
			} else {
				contador = Number(this.storage.getContadorAnuncio());
				if(contador > 0) {
					contador--;
					this.storage.setContadorAnuncio(contador.toString());
				} else {
					contador = Math.floor((Math.random() * 6) + 7);
					contadorStr = contador.toString();
					this.storage.setContadorAnuncio(contadorStr);
					this.mostreAnuncioInterstitial();
				}
			}
		}
	}
}