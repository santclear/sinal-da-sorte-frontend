import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Loterias } from "../enum/loterias"

@Injectable()
export class UtilService {

	constructor(public http: HttpClient) {
	}

	ping(): Observable<string> {
		return this.http.get<string>(Loterias.DOMINIO +'util/ping');
	}

	reCaptchaProcessResponse(response: string) {
		return this.http.post(Loterias.DOMINIO +'util/reCaptchaProcessResponse/'+response,
			null,
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}
} 