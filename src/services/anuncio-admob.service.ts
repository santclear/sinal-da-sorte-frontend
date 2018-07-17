import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from "@ionic-native/admob-free";

@Injectable()
export class AnuncioAdMobService {

	constructor(public admob: AdMobFree, public plataforma: Platform) {
		if(this.plataforma.is('android')) {
			this.mostreAnuncioBanner();
			this.mostreAnuncioInterstitial();
		}
	}

	mostreAnuncioBanner() {
 
        let bannerConfig: AdMobFreeBannerConfig = {
            // isTesting: true, // Remove in production
            autoShow: true,
            id: 'ca-app-pub-5335868077868255/5246799894'
        };
 
        this.admob.banner.config(bannerConfig);
 
        this.admob.banner.prepare().then(() => {
            console.log('banner')
        }).catch(e => console.log(e));
 
	}
	
    mostreAnuncioInterstitial() {
		let interstitialConfig: AdMobFreeInterstitialConfig = {
			// isTesting: true, // Remove in production
			autoShow: true,
			id: 'ca-app-pub-5335868077868255/2236896705'
		};
	
		this.admob.interstitial.config(interstitialConfig);
	
		this.admob.interstitial.prepare().then(() => {
		}).catch(e => {console.log(e)});

		setTimeout(() => {
			this.mostreAnuncioInterstitial();
		}, 120000);
    }
}