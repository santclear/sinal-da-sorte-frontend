import {Component} from 'angular2/core';
import {ConcursoDAOImpl} from './concurso-dao-impl';
import{ConcursoDTO} from './concurso-dto';

@Component({
    providers: [ConcursoDAOImpl],
})
export class ConcursoRN {

    constructor(private concursoDAO: ConcursoDAOImpl) {}

    salvar(concursoDTO: ConcursoDTO) {
        this.concursoDAO.salvar(concursoDTO);
    }

    excluir(concursoDTO: ConcursoDTO) {
        this.concursoDAO.excluir(concursoDTO);
    }

    listarTodos(): Array<ConcursoDTO> {
        return null;
    }
}
