import {ConcursoDTO} from './concurso-dto';

export interface IConcursoDAO {
    salvar(concursoDTO: ConcursoDTO);
    atualizar(concursoDTO: ConcursoDTO);
    excluir(concursoDTO: ConcursoDTO);
    listarTodos(successCallBack: any);
    sincronize(concursos: any);
    procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(loteriaId: number, successCallBack: any);
}
