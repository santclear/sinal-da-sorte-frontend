import {ConcursoDAOServico} from './concurso-dao.servico';

export class ConcursoFacade {

    constructor(private concursoDAOServico: ConcursoDAOServico) { }

	salve(concurso): any {
        return this.concursoDAOServico.salve(concurso);
    }

	salveTodos(concursos): any {
		return this.concursoDAOServico.salveTodos(concursos);
	}

	salveOuAtualize(concurso, parametrosDeServico): any {
		return this.concursoDAOServico.salveOuAtualize(concurso, parametrosDeServico)
	}

    exclua(concurso): void {
        this.concursoDAOServico.exclua(concurso);
    }

    listeTodos(): any {
        return null;
    }

	procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(
		dezena: string, nomeDoDocumentoNoBD: string, numeroConcursoInicial: number, numeroDoSorteio: number): any {
		return this.concursoDAOServico.procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(
			dezena, nomeDoDocumentoNoBD, numeroConcursoInicial, numeroDoSorteio);
	}

	procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(
		dezena: string, pLoteria, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any {
		return this.concursoDAOServico.procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(
			dezena, pLoteria, numeroConcursoInicial, numeroConcursoFinal, numeroDoSorteio);
	}

	// Sincronismo
    sincronize(parametrosDeServico): any {
        return this.concursoDAOServico.sincronize(parametrosDeServico);
    }

    procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(nomeDoDocumentoNoBD: string): any {
        return this.concursoDAOServico.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(nomeDoDocumentoNoBD);
    }
}
