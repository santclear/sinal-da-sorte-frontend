import {ConcursoDAOServico} from './concurso-dao.servico';
import {ConcursoDTO} from './concurso-dto';
import {LoteriaDTO} from './../loteria/loteria-dto';
import {LoteriaFacade} from './../loteria/loteria-facade';

export class ConcursoFacade {

    constructor(private concursoDAOServico: ConcursoDAOServico) { }

    salvar(concurso) {
        this.concursoDAOServico.salvar(concurso);
    }

    excluir(concurso) {
        this.concursoDAOServico.excluir(concurso);
    }

    listarTodos(successCallBack) {
        return null;
    }

	procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAoENumeroMenorQue(
		dezena: string, loteriaId: number, numeroConcursoInicial: number, successCallBack) {
		this.concursoDAOServico.procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAoENumeroMenorQue(
			'%,'+ dezena +',%', loteriaId, numeroConcursoInicial, successCallBack);
	}

	procurePorLoteriaIdIgualAoENumeroMaiorIgualAoENumeroMenorIgualAo(
		dezena: string, pLoteria, numeroConcursoInicial: number, numeroConcursoFinal: number, successCallBack) {
		this.concursoDAOServico.procurePorLoteriaIdIgualAoENumeroMaiorIgualAoENumeroMenorIgualAo(
			'%,'+ dezena +',%', pLoteria, numeroConcursoInicial, numeroConcursoFinal, successCallBack);
	}

	// Sincronismo
    sincronize(parametrosDeServico) {
        this.concursoDAOServico.sincronize(parametrosDeServico);
    }

    procurePorNumeroMaiorDesdeQueLoteriaIdIgualAo(loteriaId: number, successCallBack) {
        this.concursoDAOServico.procurePorNumeroMaiorDesdeQueLoteriaIdIgualAo(loteriaId, successCallBack);
    }
}
