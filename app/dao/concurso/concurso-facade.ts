import {ConcursoDAOServico} from './concurso-dao.servico';
import {ConcursoDTO} from './concurso-dto';

export class ConcursoFacade {

    constructor(private concursoDAOServico: ConcursoDAOServico) { }

    salvar(concursoDTO: ConcursoDTO) {
        this.concursoDAOServico.salvar(concursoDTO);
    }

    excluir(concursoDTO: ConcursoDTO) {
        this.concursoDAOServico.excluir(concursoDTO);
    }

    listarTodos(successCallBack: any): Array<ConcursoDTO> {
        return null;
    }

    sincronize(concursos: any) {
        this.concursoDAOServico.sincronize(concursos);
    }

    procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(loteriaId: number, successCallBack: any) {
        this.concursoDAOServico.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(loteriaId, successCallBack);
    }
}
