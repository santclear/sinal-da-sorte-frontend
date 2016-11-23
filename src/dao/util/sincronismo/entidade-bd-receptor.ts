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
		let concursosPromise = new Promise(resolve => {
			this.http.get(this.urlDoServico +'&'+ valorFinal)
            .toPromise()
            .then(response => {
                resolve(response.json());
            }).catch(this.handleError);
		});

		return concursosPromise;
    }

    private handleError(error: any): any {
        console.error('Erro ao tentar obter o serviço ', error);
        return Promise.reject(error.message || error);
    }
}


