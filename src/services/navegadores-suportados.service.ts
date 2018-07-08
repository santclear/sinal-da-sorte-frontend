import { Injectable } from "@angular/core";
import { ToastController, Platform } from 'ionic-angular';

@Injectable()
export class NavegadoresSuportadosService {
	constructor(private toastCtrl: ToastController,
		public plataforma: Platform) {
		if(this.plataforma.is('mobileweb') || this.plataforma.is('core')) {
			// var nAgt = navigator.userAgent;
			// var browserName = navigator.appName;
			// var fullVersion = '' + parseFloat(navigator.appVersion);
			// var majorVersion = parseInt(navigator.appVersion, 10);
			// var nameOffset, verOffset, ix;

			// // In Opera, the true version is after "Opera" or after "Version"
			// if ((verOffset = nAgt.indexOf("Opera")) != -1) {
			// 	browserName = "Opera";
			// 	fullVersion = nAgt.substring(verOffset + 6);
			// 	if ((verOffset = nAgt.indexOf("Version")) != -1)
			// 		fullVersion = nAgt.substring(verOffset + 8);
			// }
			// // In MSIE, the true version is after "MSIE" in userAgent
			// else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
			// 	browserName = "Microsoft Internet Explorer";
			// 	fullVersion = nAgt.substring(verOffset + 5);
			// 	this.toastNavegadorNaoSuportado('MS INTERNET EXPLORER');
			// }
			// // In Chrome, the true version is after "Chrome" 
			// else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
			// 	browserName = "Chrome";
			// 	fullVersion = nAgt.substring(verOffset + 7);
			// }
			// // In Safari, the true version is after "Safari" or after "Version" 
			// else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
			// 	browserName = "Safari";
			// 	fullVersion = nAgt.substring(verOffset + 7);
			// 	if ((verOffset = nAgt.indexOf("Version")) != -1)
			// 		fullVersion = nAgt.substring(verOffset + 8);
			// 	this.toastNavegadorNaoSuportado('SAFARI');
			// }
			// // In Firefox, the true version is after "Firefox" 
			// else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
			// 	browserName = "Firefox";
			// 	fullVersion = nAgt.substring(verOffset + 8);
			// }
			// // In most other browsers, "name/version" is at the end of userAgent 
			// else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
			// 	browserName = nAgt.substring(nameOffset, verOffset);
			// 	fullVersion = nAgt.substring(verOffset + 1);
			// 	if (browserName.toLowerCase() == browserName.toUpperCase()) {
			// 		browserName = navigator.appName;
			// 	}
			// 	this.toastNavegadorNaoSuportado(browserName.toUpperCase());
			// }
			// // trim the fullVersion string at semicolon/space if present
			// if ((ix = fullVersion.indexOf(";")) != -1)
			// 	fullVersion = fullVersion.substring(0, ix);
			// if ((ix = fullVersion.indexOf(" ")) != -1)
			// 	fullVersion = fullVersion.substring(0, ix);

			// majorVersion = parseInt('' + fullVersion, 10);
			// if (isNaN(majorVersion)) {
			// 	fullVersion = '' + parseFloat(navigator.appVersion);
			// 	majorVersion = parseInt(navigator.appVersion, 10);
			// }

			// document.write(''
			// 	+ 'Browser name  = ' + browserName + '<br>'
			// 	+ 'Full version  = ' + fullVersion + '<br>'
			// 	+ 'Major version = ' + majorVersion + '<br>'
			// 	+ 'navigator.appName = ' + navigator.appName + '<br>'
			// 	+ 'navigator.userAgent = ' + navigator.userAgent + '<br>');

			// let opera = nAgt.indexOf("Opera");
			// let chrome = nAgt.indexOf("Chrome")
			// let firefox = nAgt.indexOf("Firefox");
	
			// if(opera != -1 || chrome != -1 || firefox != -1) {console.log('Navegador validado'); console.log(nAgt);}
			// else this.toastNavegadorNaoSuportado(browserName.toUpperCase());

			// if(nAgt.indexOf("Chrome") > -1) {
			// 	console.log('CHROME');
			// } else if (nAgt.indexOf("Safari") > -1) {
			// 	console.log('SAFARI');
			// } else if (nAgt.indexOf("Opera") > -1) {
			// 	console.log('OPERA');
			// } else if (nAgt.indexOf("Firefox") > -1) {
			// 	console.log('FIREFOX');
			// } else if (nAgt.indexOf("MSIE") > -1) {
			// 	console.log('MSIE');
			// }
			
			// console.log("Browser CodeName: " + navigator.appCodeName);
			// console.log("Browser Name: " + navigator.appName);
			// console.log("Browser Version: " + navigator.appVersion);
			// console.log("Cookies Enabled: " + navigator.cookieEnabled);
			// console.log("Browser Language: " + navigator.language);
			// console.log("Browser Online: " + navigator.onLine);
			// console.log("Platform: " + navigator.platform);
			// console.log("User-agent header: " + navigator.userAgent);
			// console.log("Vendor: " + navigator.vendor);
			// console.log("Vendor Sub: " + navigator.vendorSub);
			// console.log('Chrome: '+ nAgt.indexOf("Chrome"))
			// console.log('Safari: '+ nAgt.indexOf("Safari"))
			// console.log('Opera: '+ nAgt.indexOf("Opera"))
			// console.log('Firefox: '+ nAgt.indexOf("Firefox"))
			// console.log('MSIE: '+ nAgt.indexOf("MSIE"))

			let vendor = navigator.vendor;// 'Google Inc.' ou 'Apple Computer, Inc.'
			let uAgHeader = navigator.userAgent.split(' ');
			let uAg = uAgHeader[uAgHeader.length-1].split('/')[0].toUpperCase();
			
			if(vendor !== 'Google Inc.' && uAg !== 'FIREFOX' && uAg !== 'OPR') {
				this.toastNavegadorNaoSuportado()
			}
		}
	}
	

	toastNavegadorNaoSuportado() {
		try {
			let toast = this.toastCtrl.create({
				message: `ATENÇÃO! O navegador em uso não é suportado pelo Sinal da Sorte. O aplicativo poderá apresentar comportamentos indesejados.
				\nTente usar um dos navegadores listados abaixo:
				1. Google Chrome
				2. Opera
				3. Mozilla Firefox
				\nPara um bom desempenho e segurança, mantenha esses navegadores atualizados.`,
				showCloseButton: true,
				closeButtonText: 'Ok',
				position: 'middle',
				cssClass: 'toastNavegadorNaoSuportado'
			});
			toast.present();
		} catch(e) {}
	}
}