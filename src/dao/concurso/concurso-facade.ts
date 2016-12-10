import {ConcursoDAOServico} from './concurso-dao.servico';

export class ConcursoFacade {

    constructor(private concursoDAOServico: ConcursoDAOServico) { }

	salve(concurso): any {
        return this.concursoDAOServico.salve(concurso);
    }

	salveTodos(concursos): any {
		return this.concursoDAOServico.salveTodos(concursos);
	}

	salveOuAtualize(concurso, loteria): any {
		return this.concursoDAOServico.salveOuAtualize(concurso, loteria)
	}

	atualizeComEstatisticas(loterias, estatisticas): any {
		return this.concursoDAOServico.atualizeComEstatisticas(loterias, estatisticas);
	}

    exclua(concurso): void {
        this.concursoDAOServico.exclua(concurso);
    }

    listeTodos(loterias): any {
        return this.concursoDAOServico.listeTodos(loterias);
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

	procurePorUnicoConcurso(nomeDoDocumentoNoBD: string, numeroConcurso: number): any {
		return this.concursoDAOServico.procurePorUnicoConcurso(nomeDoDocumentoNoBD, numeroConcurso);
	}

	getFrequenciaTotalDaDezena(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number): any {
		return this.concursoDAOServico.getFrequenciaTotalDaDezena(nomeDoDocumentoNoBD, dezena, numeroDoSorteio);
	}

	// Sincronismo
    sincronize(parametrosDeServico): any {
        return this.concursoDAOServico.sincronize(parametrosDeServico);
    }

    procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(nomeDoDocumentoNoBD: string): any {
        return this.concursoDAOServico.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(nomeDoDocumentoNoBD);
    }
}
