import {IComandoSincronizar} from '../util/sincronismo/icomando-sincronizar';
import {EntidadeBDReceptor} from '../util/sincronismo/entidade-bd-receptor';
import {ConcursoDAOServico} from './concurso-dao.servico';
import {ConcursoFacade} from './concurso-facade';
import {ConcursoDTO} from './concurso-dto';
import {LoteriaDTO} from '../loteria/loteria-dto';

export class ComandoConcurso implements IComandoSincronizar {
    constructor(private concursoDAOServico: ConcursoDAOServico) { }

    execute(id: number, entidadeBDReceptor: EntidadeBDReceptor): void {
        let concursoFacade: ConcursoFacade = new ConcursoFacade(this.concursoDAOServico);
        concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualAo(id, (concursoCallBack) => {
            if (concursoCallBack.maior_numero != null) {
                this.baixeResultadosRemoto(concursoCallBack.maior_numero, entidadeBDReceptor, concursoFacade);
            } else {
                this.baixeResultadosRemoto(0, entidadeBDReceptor, concursoFacade);
            }
        });
    }

    private salveTodos(concursos: any, concursoFacade: ConcursoFacade) {
		concursos.forEach(concurso => {
			concursoFacade.salvar(concurso);
		});
    }

    private baixeResultadosRemoto(maiorNumero: number, entidadeBDReceptor: EntidadeBDReceptor, concursoFacade: ConcursoFacade) {
        entidadeBDReceptor.baixeResultadosRemoto(maiorNumero, (concursosCallBack) => {
            this.salveTodos(concursosCallBack, concursoFacade);
        });
    }
}