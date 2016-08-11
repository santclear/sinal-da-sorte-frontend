import {IComandoSincronizar} from '../util/sincronismo/icomando-sincronizar';
import {EntidadeBDReceptorServico} from '../util/sincronismo/entidade-bd-receptor.servico';
import {ConcursoDAOServico} from './concurso-dao.servico';
import {ConcursoFacade} from './concurso-facade';
import {ConcursoDTO} from './concurso-dto';
import {LoteriaDTO} from '../loteria/loteria-dto';
import {Concursos} from '../../enum/concursos';

export class ComandoConcurso implements IComandoSincronizar {
    constructor(private concursoDAOServico: ConcursoDAOServico) { }

    execute(id: number, entidadeBDReceptorServico: EntidadeBDReceptorServico): void {
        let concursoFacade: ConcursoFacade = new ConcursoFacade(this.concursoDAOServico);
        concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(id, (concursoCallBack) => {
            if (concursoCallBack.maior_numero != null) {
                console.log("Maior numero");
                console.log(concursoCallBack.maior_numero);
                this.baixeResultadosRemoto(concursoCallBack.maior_numero, entidadeBDReceptorServico, concursoFacade);
            } else {
                console.log("teste 2");
                this.baixeResultadosRemoto(0, entidadeBDReceptorServico, concursoFacade);
            }
        });
    }

    private salveTodos(concursos: any, concursoFacade: ConcursoFacade) {
        for (let i in concursos) {
            let concursoDTO: ConcursoDTO = new ConcursoDTO();
            concursoDTO.$id = concursos[i][0].id;
            concursoDTO.$numero = concursos[i][0].numero;
            concursoDTO.$dataDoSorteio = concursos[i][0].dataDoSorteio;
            concursoDTO.$numerosSorteados = concursos[i][0].numerosSorteados;
            concursoDTO.$arrecadacaoTotal = concursos[i][0].arrecadacaoTotal;
            concursoDTO.$acumuladoParaOProximoConcurso = concursos[i][0].acumuladoParaOProximoConcurso;
            concursoDTO.$estimativaDePremioParaOProximoConcurso = concursos[i][0].estimativaDePremioParaOProximoConcurso;
            let loteriaDTO: LoteriaDTO = new LoteriaDTO();
            loteriaDTO.$id = concursos[i][1].id;
            loteriaDTO.$nome = concursos[i][1].nome;
            concursoDTO.$loteriaDTO = loteriaDTO;
            concursoFacade.salvar(concursoDTO);
        }
    }

    private baixeResultadosRemoto(maiorNumero: number, entidadeBDReceptorServico: EntidadeBDReceptorServico, concursoFacade: ConcursoFacade) {
        entidadeBDReceptorServico.baixeResultadosRemoto(maiorNumero, (concursos) => {
            this.salveTodos(concursos, concursoFacade);
        });
    }
}