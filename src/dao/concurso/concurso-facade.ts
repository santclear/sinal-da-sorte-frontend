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

	procurePorConcursosDentroDoIntervalo(
		nomeDoDocumentoNoBD, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any {
		return this.concursoDAOServico.procurePorConcursosDentroDoIntervalo(
			nomeDoDocumentoNoBD, numeroConcursoInicial, numeroConcursoFinal, numeroDoSorteio);
	}

	procurePorUnicoConcurso(nomeDoDocumentoNoBD: string, numeroConcurso: number): any {
		return this.concursoDAOServico.procurePorUnicoConcurso(nomeDoDocumentoNoBD, numeroConcurso);
	}

	// Sincronismo
    sincronize(loteria): any {
        return this.concursoDAOServico.sincronize(loteria);
    }

    procurePorNumeroDoUltimoConcursoSorteado(nomeDoDocumentoNoBD: string): any {
        return this.concursoDAOServico.procurePorNumeroDoUltimoConcursoSorteado(nomeDoDocumentoNoBD);
	}
	
	frequenciaDasDezenas(dezenas: [string], nomeDoDocumentoNoBD, 
		numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any {
		return this.concursoDAOServico.frequenciaDasDezenas(dezenas, nomeDoDocumentoNoBD, numeroConcursoInicial, numeroConcursoFinal, numeroDoSorteio);
	}

	somaDasDezenas(nomeDoDocumentoNoBD, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any {
		return this.concursoDAOServico.somaDasDezenas(nomeDoDocumentoNoBD, numeroConcursoInicial, numeroConcursoFinal, numeroDoSorteio);
	}
}
