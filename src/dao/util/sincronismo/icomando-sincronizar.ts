import {EntidadeBDReceptor} from './entidade-bd-receptor';

// Command
export interface IComandoSincronizar {
    execute(parametrosDeServico, entidadeBDReceptorServico: EntidadeBDReceptor): any;
}