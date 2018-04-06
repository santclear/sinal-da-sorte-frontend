import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Loterias } from "../enum/loterias"

@Injectable()
export class UtilService {

	constructor(public http: HttpClient) {
	}

	ping(): Observable<String> {
		return this.http.get<String>(Loterias.DOMINIO +'util/ping');
	}

	verificaReCaptcha( apiKey: string, responseReCaptcha: string) {
		return this.http.post('https://www.google.com/recaptcha/api/siteverify',
			{
				secret: apiKey,
				response: responseReCaptcha
			},
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}
} 