import {Injectable} from '@angular/core';
import{VolanteDAO} from './volante-dao';
import {VolanteDTO} from './volante-dto';

@Injectable()
export class VolanteDAOImpl implements VolanteDAO {

    constructor() {}

    salvar(volanteDTO: VolanteDTO) {

    }

    excluir(volanteDTO: VolanteDTO) {

    }

    listarTodos(): Array<VolanteDTO> {
        return null;
    }
}
