import {ConcursoDAOServico} from './concurso-dao.servico';

export class ConcursoFacade {

    constructor(private concursoDAOServico: ConcursoDAOServico) { }

	salve(concurso): any {
        return this.concursoDAOServico.salve(concurso);
    }

	salveTodos(concursos): any {
		return this.concursoDAOServico.salveTodos(concursos);
	}

    exclua(concurso): void {
        this.concursoDAOServico.exclua(concurso);
    }

    listeTodos(): any {
        return null;
    }

	procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(
		dezena: string, loteriaId: number, numeroConcursoInicial: number): any {
		return this.concursoDAOServico.procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(
			dezena, loteriaId, numeroConcursoInicial);
	}

	procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(
		dezena: string, pLoteria, numeroConcursoInicial: number, numeroConcursoFinal: number): any {
		return this.concursoDAOServico.procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(
			dezena, pLoteria, numeroConcursoInicial, numeroConcursoFinal);
	}

	// Sincronismo
    sincronize(parametrosDeServico): any {
        return this.concursoDAOServico.sincronize(parametrosDeServico);
    }

    procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(loteriaId: number): any {
        return this.concursoDAOServico.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(loteriaId);
    }
}
