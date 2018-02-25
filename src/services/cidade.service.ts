import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Loterias } from "../enum/loterias";
import { CidadeDTO } from "../dtos/cidade.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CidadeService {

	constructor(public http: HttpClient) {
	}

	findAll(estadoId: string): Observable<CidadeDTO[]> {
		return this.http.get<CidadeDTO[]>(Loterias.DOMINIO +"estados/"+ estadoId +"/cidades");
	}
}