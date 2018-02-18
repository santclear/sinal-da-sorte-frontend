import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../dtos/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { Loterias } from "../enum/loterias";


//TODO: 2. Sevice para autenticação
@Injectable()
export class AuthService {

	constructor(public http: HttpClient) {
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
}