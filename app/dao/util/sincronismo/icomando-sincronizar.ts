import {EntidadeBDReceptor} from './entidade-bd-receptor';

// Command
export interface IComandoSincronizar {
    execute(id: number, entidadeBDReceptorServico: EntidadeBDReceptor): void;
}