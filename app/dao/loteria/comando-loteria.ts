import {IComandoSincronizar} from '../util/sincronismo/icomando-sincronizar';
import {EntidadeBDReceptor} from '../util/sincronismo/entidade-bd-receptor';
import {LoteriaDAOServico} from './loteria-dao.servico';
import {LoteriaFacade} from './loteria-facade';
import {LoteriaDTO} from './loteria-dto';

export class ComandoLoteria implements IComandoSincronizar {
    constructor(private loteriaDAOServico: LoteriaDAOServico) { }
	
	//FIXME: refatorar, talvez criar outro método na classe EntidadeBDServico
    execute(inutil_para_esse_caso: number, entidadeBDReceptor: EntidadeBDReceptor): void {
        let loteriaFacade: LoteriaFacade = new LoteriaFacade(this.loteriaDAOServico);
        loteriaFacade.procurePorMaiorId((loteriaCallBack) => {
            if (loteriaCallBack.maior_id != null) {
                this.baixeResultadosRemoto(loteriaCallBack.maior_id, entidadeBDReceptor, loteriaFacade);
            } else {
                this.baixeResultadosRemoto(0, entidadeBDReceptor, loteriaFacade);
            }
        });
    }

    private salveTodos(loterias: any, loteriaFacade: LoteriaFacade) {
        for (let i in loterias) {
            let loteriaDTO: LoteriaDTO = new LoteriaDTO();
            loteriaDTO.$id = loterias[i].id;
			loteriaDTO.$nome = loterias[i].nome;
			loteriaFacade.salvar(loteriaDTO);
        }
    }

    private baixeResultadosRemoto(maiorId: number, entidadeBDReceptor: EntidadeBDReceptor, loteriaFacade: LoteriaFacade) {
        entidadeBDReceptor.baixeResultadosRemoto(maiorId, (loterias) => {
            this.salveTodos(loterias, loteriaFacade);
        });
    }
}