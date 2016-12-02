export interface IConcursoDAO {
    salve(concurso): void;
	salveTodos(concursos): any;
	salveOuAtualize(concurso, parametrosDeServico): any;
    atualize(concurso): void;
    exclua(concurso): void;
    listeTodos(): any;
	procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(
		dezena: string, nomeDoDocumentoNoBD: string, numeroConcursoInicial: number, numeroDoSorteio: number): any;
	procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(
		dezena: string, loteria, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any;
	procurePorUnicoConcurso(nomeDoDocumentoNoBD: string, numeroConcurso: number): any;
	
	// Sincronismo
    sincronize(parametrosDeServico): any;
    procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(nomeDoDocumentoNoBD: string): any;
}
