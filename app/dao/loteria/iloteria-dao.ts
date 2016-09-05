import {LoteriaDTO} from './loteria-dto';

export interface ILoteriaDAO {
    salvar(loteria);
    atualizar(loteria);
    excluir(loteria);
    listarTodos(successCallBack);
	procurePorIdIgualAo(id: number, successCallBack);
	
	// Sincronismo
    sincronize(parametrosDeServico);
    procurePorMaiorId(successCallBack);
}
