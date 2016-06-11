import {VolanteDTO} from './volante-dto';

export interface VolanteDAO {
    salvar(volanteDTO: VolanteDTO);
    excluir(volanteDTO: VolanteDTO);
    listarTodos(): Array<VolanteDTO>;
}
