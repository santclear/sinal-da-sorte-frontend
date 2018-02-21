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

	findByEmail(email: string): Observable<ContaDTO> {
		return this.http.get<ContaDTO>(Loterias.DOMINIO +'contas/email?value='+ email);
	}
} 