import {Injectable} from 'angular2/core';
import{ConcursoDAO} from './concurso-dao';
import {ConcursoDTO} from './concurso-dto';

@Injectable()
export class ConcursoDAOImpl implements ConcursoDAO {

    constructor() {}

    salvar(concursoDTO: ConcursoDTO) {

    }

    excluir(concursoDTO: ConcursoDTO) {

    }

    listarTodos(): Array<ConcursoDTO> {
        return null;
    }
}
