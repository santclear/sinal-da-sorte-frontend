
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { Loterias } from '../enum/loterias';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Tenta pegar o token do storage local
		let contaLocal = this.storage.getContaLocal();
		
		let N = Loterias.DOMINIO.length;
        /* O cabeçalho Autorization deve ser enviado somente para requisições para a API WS backend desse sistema.
        Para requisições ao bucket da Amazon não é necessário. */
        let requestToAPI = req.url.substring(0, N) == Loterias.DOMINIO;

        if (contaLocal && requestToAPI) {
            /* Para passar o token nas requisições é necessário clonar a requisição original passando o 
            cabeçalho Authorization com o token que está armazenado no storage local */
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + contaLocal.token)});
			// Propaga a requisição clonada com o token
            return next.handle(authReq);
        } else {
            // Se não exitir token no storage local, propaga a requisição original
            return next.handle(req);
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};