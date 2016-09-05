import {Component} from '@angular/core';
import {VolanteDAOImpl} from './volante-dao-impl';
import{VolanteDTO} from './volante-dto';

@Component({
    providers: [VolanteDAOImpl],
})
export class VolanteRN {

    constructor(private volanteDAO: VolanteDAOImpl) {}

    salvar(volanteDTO: VolanteDTO) {
        this.volanteDAO.salvar(volanteDTO);
    }

    excluir(volanteDTO: VolanteDTO) {
        this.volanteDAO.excluir(volanteDTO);
    }

    listarTodos(): Array<VolanteDTO> {
        return null;
    }
}
