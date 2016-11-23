import {IComandoSincronizar} from "./icomando-sincronizar";
import {EntidadeBDReceptor} from "./entidade-bd-receptor";
import {Http} from '@angular/http';

export class EntidadeBD {

	constructor(private http: Http) {}

    public sincronize(
        id: number,
        url: string,
        comandoSincronizar: IComandoSincronizar
	): any {
		let entidadeBDReceptorServico = new EntidadeBDReceptor(this.http);
		entidadeBDReceptorServico.$urlDoServico = url;
        return comandoSincronizar.execute(id, entidadeBDReceptorServico);
    }
}