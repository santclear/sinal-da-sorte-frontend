import {IComandoSincronizar} from "./icomando-sincronizar";
import {EntidadeBDReceptor} from "./entidade-bd-receptor";
import { HttpClient } from "@angular/common/http";

export class EntidadeBD {

	constructor(private http: HttpClient) {}

    public sincronize(loterias, comandoSincronizar: IComandoSincronizar ): any {
		let entidadeBDReceptorServico = new EntidadeBDReceptor(this.http);
		entidadeBDReceptorServico.$urlDoServico = loterias.parametrosDeServicosWeb.urlDoServico;
		entidadeBDReceptorServico.$parametro1 = loterias.id;
        return comandoSincronizar.execute(loterias, entidadeBDReceptorServico);
    }
}