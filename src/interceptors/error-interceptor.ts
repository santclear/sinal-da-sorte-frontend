import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { FieldMessageDTO } from '../dtos/field-message.dto';
import { MensagensExceptions } from '../enum/mensagens-exceptions'


// Interceptador de erros globais. Retira os campos que não interessam da mensagem de erro e exibe só o erro de fato
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(public storage: StorageService, private toastCtrl: ToastController, private alertCtrl: AlertController) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//TODO: next.handle(req) função para continuar a requisição
		return next.handle(req)
			.catch((error, caught) => {

				let errorObj = error;
				if (errorObj.status !== 0) {
					errorObj = errorObj.error;
				}
				// if (!errorObj.status) {
				// 	errorObj = JSON.parse(errorObj);
				// }
				if (typeof errorObj === 'string') {
					errorObj = JSON.parse(errorObj);
				}

				console.log("Erro detectado pelo interceptor:");
				console.log(errorObj);

				switch (errorObj.status) {
					case 401:
						this.handle401();
						break;
					case 403:
						this.handle403(errorObj);
						break;
					case 404:
						this.handle404(errorObj);
						break;
					case 422:
						this.handle422(errorObj);
						break;
					case 500:
						this.handle500(errorObj);
						break;
					default:
						this.handleDefaultError(errorObj);
				}

				return Observable.throw(errorObj);
			}) as any;
	}

	handle401() {
		let toast = this.toastCtrl.create({
			message: 'Código 401: falha de autenticação',
			showCloseButton: true,
			closeButtonText: 'Ok',
			duration: 5000,
			position: 'top',
			cssClass: 'toastGeral'
		});
		toast.present();
	}

	handle403(errorObj) {
		if(errorObj.message === "e1") {
			let alert = this.alertCtrl.create({
				title: 'Não autorizado',
				message: MensagensExceptions.codigo[errorObj.message],
				enableBackdropDismiss: false,
				buttons: [{
					text: 'Ok'
				}]
			});
			alert.present();
		} else {
			this.storage.setContaLocal(null);
		}
	}

	handle404(errorObj) {
		let message = errorObj.message === null ? 'Página ou recurso não encontrado': errorObj.message;
		let toast = this.toastCtrl.create({
			message: 'Código 404: '+ message,
			showCloseButton: true,
			closeButtonText: 'Ok',
			duration: 5000,
			position: 'top',
			cssClass: 'toastGeral'
		});
		// toast.onDidDismiss(this.dismissHandler);
		toast.present();
	}

	handle422(errorObj) {
		let toast = this.toastCtrl.create({
			message: 'Código 422: Validação'+'\n'+this.listErrors(errorObj.errors),
			showCloseButton: true,
			closeButtonText: 'Ok',
			duration: 5000,
			position: 'top',
			cssClass: 'toastGeral'
		});
		// toast.onDidDismiss(this.dismissHandler);
		toast.present();
	}

	handle500(errorObj) {
		let toast = this.toastCtrl.create({
			message: 'Código 500: Erro no processamento dos dados enviados, entre em contato com o suporte técnico',
			showCloseButton: true,
			closeButtonText: 'Ok',
			duration: 5000,
			position: 'top',
			cssClass: 'toastGeral'
		});
		toast.present();
	}

	handleDefaultError(errorObj) {
		let toast = this.toastCtrl.create({
			message: 'Verifique sua conexão de internet e tente novamente',
			showCloseButton: true,
			closeButtonText: 'Ok',
			duration: 5000,
			position: 'top',
			cssClass: 'toastGeral'
		});
		toast.present();
	}

	private listErrors(messages: FieldMessageDTO[]): string {
		let s: string = '';
		for (var i = 0; i < messages.length; i++) {
			s = s + messages[i].fieldName + ": " + messages[i].message;
		}
		return s;
	}

	// private dismissHandler() {
	// 	console.info('');
	// }
}

export const ErrorInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: ErrorInterceptor,
	multi: true,
};