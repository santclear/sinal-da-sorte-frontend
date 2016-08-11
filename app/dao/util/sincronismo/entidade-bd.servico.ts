import {Injectable} from '@angular/core';

import {IComandoSincronizar} from "./icomando-sincronizar";
import {EntidadeBDReceptorServico} from "./entidade-bd-receptor.servico";

@Injectable()
export class EntidadeBDServico {

    constructor(private entidadeBDReceptorServico: EntidadeBDReceptorServico) {}

    public sincronize(
        id: number,
        url: string,
        nomeId: any,
        comandoSincronizar: IComandoSincronizar
	): void {
        this.entidadeBDReceptorServico.$urlDoServico = url;
        this.entidadeBDReceptorServico.$filtro = nomeId;
        comandoSincronizar.execute(id, this.entidadeBDReceptorServico);
    }
}