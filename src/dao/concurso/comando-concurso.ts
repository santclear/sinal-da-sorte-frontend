import { IComandoSincronizar } from '../util/sincronismo/icomando-sincronizar';
import { EntidadeBDReceptor } from '../util/sincronismo/entidade-bd-receptor';
import { ConcursoDAOServico } from './concurso-dao.servico';
import { ConcursoFacade } from './concurso-facade';

export class ComandoConcurso implements IComandoSincronizar {
	constructor(public concursoDAOServico: ConcursoDAOServico) { }

	execute(parametrosDeServico, entidadeBDReceptor: EntidadeBDReceptor): any {
		return new Promise(resolve => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(parametrosDeServico.id);
			concursosPromise.then(concursos => {
				if (concursos.maiorNumero != 0) {
					resolve(this.baixeResultadosRemoto(concursos.maiorNumero, entidadeBDReceptor, concursoFacade, parametrosDeServico));
				} else {
					resolve(this.baixeResultadosRemoto(0, entidadeBDReceptor, concursoFacade, parametrosDeServico));
				}
			});
		});
	}

	private baixeResultadosRemoto(maiorNumeroEntreOsConcursos: number, entidadeBDReceptor: EntidadeBDReceptor, concursoFacade: ConcursoFacade, parametrosDeServico): any {

		let resultadosRemotoPromise = entidadeBDReceptor.baixeResultadosRemoto(maiorNumeroEntreOsConcursos);

		let resultadoSalveTodosPromise = new Promise(resolve => {
			resultadosRemotoPromise.then(concursos => {
				if (concursos.length > 0) {
					resolve(concursoFacade.salveOuAtualize(concursos, parametrosDeServico));
				} else {
					resolve(concursos);
				}
			});
		});

		return resultadoSalveTodosPromise;
	}
}