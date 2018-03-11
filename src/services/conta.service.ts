import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Loterias } from "../enum/loterias"
import { StorageService } from "./storage.service";
import { ContaDTO } from "../dtos/conta.dto";

@Injectable()
export class ContaService {

	constructor(public http: HttpClient, public storage: StorageService) {
	}

	findByEmail(email: string): Observable<{id: number, email: string, situacao: string, perfis: [string], volantes: [string]}> {
		return this.http.get<{id: number, email: string, situacao: string, perfis: [string], volantes: [string]}>(Loterias.DOMINIO +'contas/email?value='+ email);
	}
	
	insert(obj: ContaDTO) {
		return this.http.post(
			Loterias.DOMINIO +"contas",
			obj,
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}
} 