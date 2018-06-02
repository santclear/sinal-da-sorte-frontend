import { IComandoSincronizar } from '../util/sincronismo/icomando-sincronizar';
import { EntidadeBDReceptor } from '../util/sincronismo/entidade-bd-receptor';
import { ConcursoDAOServico } from './concurso-dao.servico';
import { ConcursoFacade } from './concurso-facade';

export class ComandoConcurso implements IComandoSincronizar {
	private concursoFacade;

	constructor(public concursoDAOServico: ConcursoDAOServico) { 
		this.concursoFacade = new ConcursoFacade(this.concursoDAOServico);
	}

	execute(loteria, entidadeBDReceptor: EntidadeBDReceptor): any {
		return new Promise(resolve => {
			let concursosPromise = this.concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(ultimoConcurso => {
				if (ultimoConcurso.maiorNumero > 0) {
					resolve(this.baixeResultadosRemoto(ultimoConcurso.maiorNumero, ultimoConcurso, entidadeBDReceptor, loteria));
				} else {
					resolve(this.baixeResultadosRemoto(0, ultimoConcurso, entidadeBDReceptor, loteria));
				}
			});
		});
	}

	private baixeResultadosRemoto(maiorNumeroEntreOsConcursos: number, ultimoConcurso, entidadeBDReceptor: EntidadeBDReceptor, loteria): any {
		
		let resultadoSalveTodosPromise = new Promise(resolve => {
			entidadeBDReceptor.baixeResultadosRemoto(maiorNumeroEntreOsConcursos).subscribe(concursosRemoto => {
				if (concursosRemoto.length > 0) {
					this.concursoFacade.salveOuAtualize(concursosRemoto, loteria).then(resultadoSalveOuAtualize => {
						resolve(resultadoSalveOuAtualize);
					});
				} else {
					resolve(concursosRemoto);
				}
			}, error => {
				resolve(ultimoConcurso);
			});
		});

		return resultadoSalveTodosPromise;
	}
}