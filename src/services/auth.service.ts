import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../dtos/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { Loterias } from "../enum/loterias";
import { StorageService } from './storage.service';
import { ContaLocalDTO } from '../dtos/conta-local.dto';
import { JwtHelper } from 'angular2-jwt';
import { Events } from "ionic-angular";

//TODO: 2. Sevice para autenticação
@Injectable()
export class AuthService {

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(private http: HttpClient, private storage: StorageService, private events: Events) {
	}

	authenticate(creds: CredenciaisDTO) {
		return this.http.post(
			Loterias.DOMINIO + 'login',
			creds,
			{// Define que a requisição retornará um objeto do tipo resposta. Obtendo assim o header http que contém o token de autorização
				observe: 'response',
				/* O endpoint login retorna uma resposta de corpo vazio. 
				Quando isso ocorre é necessário definir que o tipo de resposta esperada é um text,
				para que o framework não tente fazer um parse no json, o qual acarretará em um erro */
				responseType: 'text'
			});
	}
	
	refreshToken() {
		return this.http.post(Loterias.DOMINIO + 'auth/refresh_token',{},
			{
				observe: 'response',
				responseType: 'text'
			});
	}

	successfulLogin(authorizationValue: string) {
		let tok = authorizationValue.substring(7);
		let conta: ContaLocalDTO = {
			token: tok,
			email: this.jwtHelper.decodeToken(tok).sub
		};
		this.storage.setContaLocal(conta);
		this.events.publish('contaLocal:atualizada', conta, Date.now());
	}

	logout() {
		this.storage.setContaLocal(null);
	}

	envieNovaSenha(obj: CredenciaisDTO) {
		return this.http.post(
			Loterias.DOMINIO +'auth/forgot',
			obj,
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}
}