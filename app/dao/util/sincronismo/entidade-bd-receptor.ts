import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Receiver
export class EntidadeBDReceptor {
    private urlDoServico: string;

    constructor(private http: Http) { }

    public set $urlDoServico(urlDoServico: string) {
        this.urlDoServico = urlDoServico;
    }

    public baixeResultadosRemoto(valorFinal: number, successCallBack: any) {
        let resultados = this.http.get(this.urlDoServico +'&'+ valorFinal)
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


