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

	procurePorConcursosQueNaoContenhamADezenaEONumeroSejaMenorNumeroConcursoInicialEPegueOUltimo(
		dezena: string, nomeDoDocumentoNoBD: string, numeroConcursoInicial: number, numeroDoSorteio: number): any {
		return this.concursoDAOServico.procurePorConcursosQueNaoContenhamADezenaEONumeroSejaMenorNumeroConcursoInicialEPegueOUltimo(
			dezena, nomeDoDocumentoNoBD, numeroConcursoInicial, numeroDoSorteio);
	}

	procurePorConcursosQueContenhamADezenaDentroDoIntervalo(
		dezena: string, pLoteria, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any {
		return this.concursoDAOServico.procurePorConcursosQueContenhamADezenaDentroDoIntervalo(
			dezena, pLoteria, numeroConcursoInicial, numeroConcursoFinal, numeroDoSorteio);
	}

	procurePorUnicoConcurso(nomeDoDocumentoNoBD: string, numeroConcurso: number): any {
		return this.concursoDAOServico.procurePorUnicoConcurso(nomeDoDocumentoNoBD, numeroConcurso);
	}

	procurePorFrequenciaTotalDaDezena(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number): any {
		return this.concursoDAOServico.procurePorFrequenciaTotalDaDezena(nomeDoDocumentoNoBD, dezena, numeroDoSorteio);
	}

	// Sincronismo
    sincronize(parametrosDeServico): any {
        return this.concursoDAOServico.sincronize(parametrosDeServico);
    }

    procurePorNumeroDoUltimoConcursoSorteado(nomeDoDocumentoNoBD: string): any {
        return this.concursoDAOServico.procurePorNumeroDoUltimoConcursoSorteado(nomeDoDocumentoNoBD);
    }
}
