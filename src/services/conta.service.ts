import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Loterias } from "../enum/loterias"
import { StorageService } from "./storage.service";
import { ContaDTO } from "../dtos/conta.dto";

@Injectable()
export class ContaService {

	constructor(public http: HttpClient, public storage: StorageService) {
	}

	findByEmail(email: string): Observable<ContaDTO> {

		let token = this.storage.getContaLocal().token;
		let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

		return this.http.get<ContaDTO>(
			Loterias.DOMINIO +'contas/email?value='+ email,
			{ 'headers': authHeader });
	}
} 