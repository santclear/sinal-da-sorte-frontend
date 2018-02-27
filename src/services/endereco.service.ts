import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { EnderecoDto } from '../dtos/endereco.dto';

@Injectable()
export class EnderecoService {

	constructor(public http: HttpClient) {
	}

	findByCep(cep: string): Observable<EnderecoDto> {
		return this.http.get<EnderecoDto>('https://viacep.com.br/ws/'+ cep +'/json/');
	}
}