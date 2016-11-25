export interface IConcursoDAO {
    salve(concurso): void;
	salveTodos(concursos): any;
	salveOuAtualize(concurso, parametrosDeServico): any;
    atualize(concurso): void;
    exclua(concurso): void;
    listeTodos(): any;
	procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(
		dezena: string, nomeDoDocumentoNoBD: string, numeroConcursoInicial: number): any;
	procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(
		dezena: string, loteria, numeroConcursoInicial: number, numeroConcursoFinal: number): any;
	
	// Sincronismo
    sincronize(parametrosDeServico): any;
    procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(nomeDoDocumentoNoBD: string): any;
}
