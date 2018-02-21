import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';

// Interceptador de erros globais. Retira os campos que não interessam da mensagem de erro e exibe só o erro de fato
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(public storage: StorageService) { }

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
				}

				return Observable.throw(errorObj);
			}) as any;
	}

	handle403() {
		this.storage.setContaLocal(null);
	}
}

export const ErrorInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: ErrorInterceptor,
	multi: true,
};