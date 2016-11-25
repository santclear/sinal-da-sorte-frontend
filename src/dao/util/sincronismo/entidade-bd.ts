import {IComandoSincronizar} from "./icomando-sincronizar";
import {EntidadeBDReceptor} from "./entidade-bd-receptor";
import {Http} from '@angular/http';

export class EntidadeBD {

	constructor(private http: Http) {}

    public sincronize(loterias, comandoSincronizar: IComandoSincronizar ): any {
		let entidadeBDReceptorServico = new EntidadeBDReceptor(this.http);
		entidadeBDReceptorServico.$urlDoServico = loterias.parametrosDeServicosWeb.urlDoServico;
        return comandoSincronizar.execute(loterias, entidadeBDReceptorServico);
    }
}