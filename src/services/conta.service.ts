import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Loterias } from "../enum/loterias"
import { StorageService } from "./storage.service";
import { ContaDto } from "../dtos/conta.dto";
import { ContaNewDto } from "../dtos/conta-new.dto";

@Injectable()
export class ContaService {

	constructor(public http: HttpClient, public storage: StorageService) {
	}

	encontrePorEmail(email: string): Observable<any> {
		return this.http.get<any>(Loterias.DOMINIO +'contas/encontrePorEmail?value='+ email);
	}
	
	insert(obj: ContaNewDto) {
		return this.http.post(
			Loterias.DOMINIO +"contas",
			obj,
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}

	atualize(obj: ContaDto) {
		return this.http.put(
			Loterias.DOMINIO +"contas/"+ obj.id,
			obj,
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}

	exclua(obj) {
		return this.http.put(
			Loterias.DOMINIO +'contas/exclua/'+ obj.id,
			obj,
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}
} 