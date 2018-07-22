import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";

@Injectable()
export class BannerAdMobService {

	constructor(public admob: AdMobFree, public plataforma: Platform) {
		if(this.plataforma.is('android')) {
			this.mostreAnuncioBanner();
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
        }).catch(e => console.log(e));
	}
}