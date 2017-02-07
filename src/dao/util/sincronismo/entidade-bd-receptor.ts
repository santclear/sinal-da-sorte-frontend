import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Receiver
export class EntidadeBDReceptor {
    private urlDoServico: string;

    constructor(private http: Http) { }

    public set $urlDoServico(urlDoServico: string) {
        this.urlDoServico = urlDoServico;
    }

    public baixeResultadosRemoto(valorFinal: number): any {
		// this.urlDoServico = 'http://localhost:8084/concursos/procure_por_loteria_id_igual_a_e_numero_menor_que_e_sorteio_numero_igual_a/1'
		// valorFinal = 10;
		let concursosPromise = new Promise(resolve => {
			this.http.get(this.urlDoServico +'&'+ valorFinal)
            .toPromise()
            .then(response => {
                resolve(response.json());
            }).catch(erro => {
				// this.handleError(erro);
				resolve({estado: 'erro'});
			});
		});

		return concursosPromise;
    }

    public handleError(error: any): any {
        console.error('Erro ao tentar obter o serviço ', error);
        return Promise.reject(error.message || error);
    }
}


