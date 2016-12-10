import { IComandoSincronizar } from '../util/sincronismo/icomando-sincronizar';
import { EntidadeBDReceptor } from '../util/sincronismo/entidade-bd-receptor';
import { ConcursoDAOServico } from './concurso-dao.servico';
import { ConcursoFacade } from './concurso-facade';

export class ComandoConcurso implements IComandoSincronizar {
	constructor(public concursoDAOServico: ConcursoDAOServico) { }

	execute(loteria, entidadeBDReceptor: EntidadeBDReceptor): any {
		return new Promise(resolve => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				if (concursos.maiorNumero > 0) {
					resolve(this.baixeResultadosRemoto(concursos.maiorNumero, entidadeBDReceptor, concursoFacade, loteria));
				} else {
					resolve(this.baixeResultadosRemoto(0, entidadeBDReceptor, concursoFacade, loteria));
				}
			});
		});
	}

	private baixeResultadosRemoto(maiorNumeroEntreOsConcursos: number, entidadeBDReceptor: EntidadeBDReceptor, concursoFacade: ConcursoFacade, loteria): any {

		let resultadosRemotoPromise = entidadeBDReceptor.baixeResultadosRemoto(maiorNumeroEntreOsConcursos);

		let resultadoSalveTodosPromise = new Promise(resolve => {
			resultadosRemotoPromise.then(concursos => {
				if (concursos.length > 0) {
					concursoFacade.salveOuAtualize(concursos, loteria).then(resultadoSalveOuAtualize => {
						resolve(resultadoSalveOuAtualize);
					});
				} else {
					resolve(concursos);
				}
			});
		});

		return resultadoSalveTodosPromise;
	}
}