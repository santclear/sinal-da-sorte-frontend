import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

// Interceptador de erros globais. Retira os campos que não interessam da mensagem de erro e exibe só o erro de fato
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(public storage: StorageService, public alertCtrl: AlertController) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//TODO: next.handle(req) função para continuar a requisição
		return next.handle(req)
			.catch((error, caught) => {

				let errorObj = error;
				if (errorObj.error) {
					errorObj = errorObj.error;
				}
				if (!errorObj.status) {
					errorObj = JSON.parse(errorObj);
				}

				console.log("Erro detectado pelo interceptor:");
				console.log(errorObj);

				switch (errorObj.status) {
					case 403:
						this.handle403();
						break;
					case 403:
						this.handle403();
						break;
					default:
						this.handleDefaultEror(errorObj);
				}

				return Observable.throw(errorObj);
			}) as any;
	}

	handle401() {
		let alert = this.alertCtrl.create({
			title: 'Erro 401: falha de autenticação',
			message: 'Email ou senha incorretos',
			enableBackdropDismiss: false,
			buttons: [{ text: 'Ok' }]
		});
		alert.present();
	}

	handle403() {
		this.storage.setContaLocal(null);
	}

	handleDefaultEror(errorObj) {
		let alert = this.alertCtrl.create({
			title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
			message: errorObj.message,
			enableBackdropDismiss: false,
			buttons: [{ text: 'Ok' }]
		});
		alert.present();
	}
}

export const ErrorInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: ErrorInterceptor,
	multi: true,
};