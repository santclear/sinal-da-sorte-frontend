import { Injectable }    from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Receiver
@Injectable()
export class EntidadeBDReceptorServico {
    private urlDoServico: string;
    private filtro: string;

    constructor(private http: Http) { }

    public set $urlDoServico(urlDoServico: string) {
        this.urlDoServico = urlDoServico;
    }


	public set $filtro(filtro: string) {
		this.filtro = filtro;
	}
    

    public baixeResultadosRemoto(maiorNumero: number, successCallBack: any) {
        let resultados = this.http.get(this.urlDoServico + maiorNumero +'&'+ this.filtro)
            .toPromise()
            .then(response => {
                successCallBack(response.json());
            }).catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Erro ao tentar obter o serviço ', error);
        return Promise.reject(error.message || error);
    }
}


