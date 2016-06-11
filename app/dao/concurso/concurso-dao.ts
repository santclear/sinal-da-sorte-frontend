import {ConcursoDTO} from './concurso-dto';

export interface ConcursoDAO {
    salvar(concursoDTO: ConcursoDTO);
    excluir(concursoDTO: ConcursoDTO);
    listarTodos(): Array<ConcursoDTO>;
}
