import {ConcursoDAOServico} from './concurso-dao.servico';

export class ConcursoFacade {

    constructor(private concursoDAOServico: ConcursoDAOServico) { }

	salve(concurso): any {
        return this.concursoDAOServico.salve(concurso);
    }

	salveTodos(concursos): any {
		return this.concursoDAOServico.salveTodos(concursos);
	}

	salveOuAtualize(concurso, loteria, estatisticas): any {
		return this.concursoDAOServico.salveOuAtualize(concurso, loteria, estatisticas)
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

	procurePorConcursosQueNaoContenhamADezenaEONumeroSejaMenorQueONumeroDoConcursoInicialEPegueOUltimo(
		dezena: string, nomeDoDocumentoNoBD: string, numeroConcursoInicial: number, numeroDoSorteio: number): any {
		return this.concursoDAOServico.procurePorConcursosQueNaoContenhamADezenaEONumeroSejaMenorQueONumeroDoConcursoInicialEPegueOUltimo(
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

	calculeFrequenciasTotaisDasDezenas(loteriaId: number): any {
		return this.concursoDAOServico.calculeFrequenciasTotaisDasDezenas(loteriaId);
	}

	procurePorFrequenciaTotalDaDezena(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number): any {
		return this.concursoDAOServico.procurePorFrequenciaTotalDaDezena(nomeDoDocumentoNoBD, dezena, numeroDoSorteio);
	}

	// Sincronismo
    sincronize(loteria): any {
        return this.concursoDAOServico.sincronize(loteria);
    }

    procurePorNumeroDoUltimoConcursoSorteado(nomeDoDocumentoNoBD: string): any {
        return this.concursoDAOServico.procurePorNumeroDoUltimoConcursoSorteado(nomeDoDocumentoNoBD);
    }
}
