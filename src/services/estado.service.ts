import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Loterias } from "../enum/loterias";
import { EstadoDTO } from "../dtos/estado.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EstadoService {

	constructor(public http: HttpClient) {
	}

	findAll(): Observable<EstadoDTO[]> {
		return this.http.get<EstadoDTO[]>(Loterias.DOMINIO +"estados");
	}
}