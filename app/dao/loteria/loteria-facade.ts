import {LoteriaDAOServico} from './loteria-dao.servico';
import {} from './loteria-dto';

export class LoteriaFacade {

    constructor(private loteriaDAOServico: LoteriaDAOServico) { }

    salvar(loteria) {
        this.loteriaDAOServico.salvar(loteria);
    }

    excluir(loteria) {
        this.loteriaDAOServico.excluir(loteria);
    }

    listarTodos(successCallBack) {
        return null;
    }

	procurePorIdIgualA(id: number, successCallBack) {
		this.loteriaDAOServico.procurePorIdIgualAo(id, successCallBack);
	}

	// Sincronismo
    sincronize(parametrosDeServico) {
        this.loteriaDAOServico.sincronize(parametrosDeServico);
    }

    procurePorMaiorId(successCallBack) {
        this.loteriaDAOServico.procurePorMaiorId(successCallBack);
    }
}
