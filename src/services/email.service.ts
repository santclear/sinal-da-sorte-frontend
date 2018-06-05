import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Loterias } from "../enum/loterias"
import { ContatoDto } from "../dtos/contato.dto";

@Injectable()
export class EmailService {

	constructor(public http: HttpClient) {
	}
	
	envie(dto: ContatoDto) {
		return this.http.post(
			Loterias.DOMINIO +"emails/envie",
			dto,
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}
} 