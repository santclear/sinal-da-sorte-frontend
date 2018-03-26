import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Loterias } from "../enum/loterias"
import { StorageService } from "./storage.service";
import { UsuarioDto } from "../dtos/usuario.dto";

@Injectable()
export class UsuarioService {

	constructor(public http: HttpClient, public storage: StorageService) {
	}

	encontrePorEmail(email: string): Observable<any> {
		return this.http.get<any>(Loterias.DOMINIO +'usuarios/encontrePorEmail?value='+ email);
	}


	atualize(obj: UsuarioDto) {
		return this.http.put(
			Loterias.DOMINIO +"usuarios/"+ obj.id,
			obj,
			{
				observe: 'response',
				responseType: 'text'
			}
		);
	}

} 