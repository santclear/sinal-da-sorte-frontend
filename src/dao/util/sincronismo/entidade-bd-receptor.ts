import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

// Receiver
export class EntidadeBDReceptor {
	private urlDoServico: string;
	private parametro1;

	constructor(private http: HttpClient) { }

	public set $urlDoServico(urlDoServico: string) {
		this.urlDoServico = urlDoServico;
	}

	public set $parametro1(parametro1) {
		this.parametro1 = parametro1;
	}

	public baixeResultadosRemoto(valorFinal: number): any {
		// this.urlDoServico = 'http://localhost:8084/concursos/procure_por_loteria_id_igual_a_e_numero_menor_que_e_sorteio_numero_igual_a/1'
		// valorFinal = 10;
		return this.http.get(this.urlDoServico +'numero='+ valorFinal +'&idLoteria='+ this.parametro1);
	}

	public handleError(error: any): any {
		console.error('Erro ao tentar obter o serviço ', error);
		return Promise.reject(error.message || error);
	}
}


