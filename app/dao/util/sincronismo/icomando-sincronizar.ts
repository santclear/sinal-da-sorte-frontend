import {EntidadeBDReceptorServico} from './entidade-bd-receptor.servico';

// Command
export interface IComandoSincronizar {
    execute(id: number, entidadeBDReceptorServico: EntidadeBDReceptorServico): void;
}