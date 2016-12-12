export interface IConcursoDAO {
    salve(concurso): void;
	salveTodos(concursos): any;
	salveOuAtualize(concurso, parametrosDeServico): any;
    atualize(concurso): void;
	atualizeComEstatisticas(loterias, estatisticas): any;
    exclua(concurso): void;
    listeTodos(loterias): any;
	procurePorConcursosQueNaoContenhamADezenaEONumeroSejaMenorQueONumeroDoConcursoInicialEPegueOUltimo(
		dezena: string, nomeDoDocumentoNoBD: string, numeroConcursoInicial: number, numeroDoSorteio: number): any;
	procurePorConcursosQueContenhamADezenaDentroDoIntervalo(
		dezena: string, loteria, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any;
	procurePorUnicoConcurso(nomeDoDocumentoNoBD: string, numeroConcurso: number): any;

	procurePorFrequenciaTotalDaDezena(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number): any;
	
	// Sincronismo
    sincronize(parametrosDeServico): any;
    procurePorNumeroDoUltimoConcursoSorteado(nomeDoDocumentoNoBD: string): any;
}
