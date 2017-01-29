export interface IConcursoDAO {
    salve(concurso): void;
	salveTodos(concursos): any;
	salveOuAtualize(concurso, loteria, estatisticas): any;
    atualize(concurso): void;
	atualizeComEstatisticas(loterias, estatisticas): any;
    exclua(concurso): void;
    listeTodos(loterias): any;
	procurePorConcursosQueNaoContenhamADezenaEONumeroSejaMenorQueONumeroDoConcursoInicialEPegueOUltimo(
		dezena: string, nomeDoDocumentoNoBD: string, numeroConcursoInicial: number, numeroDoSorteio: number): any;
	procurePorConcursosQueContenhamADezenaDentroDoIntervalo(
		dezena: string, loteria, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any;
	procurePorUnicoConcurso(nomeDoDocumentoNoBD: string, numeroConcurso: number): any;
	calculeFrequenciasTotaisDasDezenas(loteriaId: number, numeroDoSorteio: number): any

	calculeFrequenciaTotalDaDezenaDentroDoIntervalo(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number, numeroConcursoInicial: number, numeroConcursoFinal: number): any;
	calculeAusenciaTotalDaDezenaDentroDoIntervalo(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number, numeroConcursoInicial: number, numeroConcursoFinal: number): any;
	// Sincronismo
    sincronize(loteria): any;
    procurePorNumeroDoUltimoConcursoSorteado(nomeDoDocumentoNoBD: string): any;
}
