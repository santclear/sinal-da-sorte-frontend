import {ConcursoDTO} from './concurso-dto';
import {LoteriaDTO} from './../loteria/loteria-dto';

export interface IConcursoDAO {
    salvar(concurso);
    atualizar(concurso);
    excluir(concurso);
    listarTodos(successCallBack);
	procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAoENumeroMenorQue(
		dezena: string, loteriaId: number, numeroConcursoInicial: number, successCallBack);
	procurePorLoteriaIdIgualAoENumeroMaiorIgualAoENumeroMenorIgualAo(
		dezena: string, loteria, numeroConcursoInicial: number, numeroConcursoFinal: number, successCallBack);
	
	// Sincronismo
    sincronize(parametrosDeServico);
    procurePorNumeroMaiorDesdeQueLoteriaIdIgualAo(loteriaId: number, successCallBack);
}
