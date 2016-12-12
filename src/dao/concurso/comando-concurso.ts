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
			concursosPromise.then(concursos => {
				if (concursos.maiorNumero > 0) {
					resolve(this.baixeResultadosRemoto(concursos.maiorNumero, entidadeBDReceptor, loteria));
				} else {
					resolve(this.baixeResultadosRemoto(0, entidadeBDReceptor, loteria));
				}
			});
		});
	}

	private baixeResultadosRemoto(maiorNumeroEntreOsConcursos: number, entidadeBDReceptor: EntidadeBDReceptor, loteria): any {

		let resultadosRemotoPromise = entidadeBDReceptor.baixeResultadosRemoto(maiorNumeroEntreOsConcursos);

		let resultadoSalveTodosPromise = new Promise(resolve => {
			resultadosRemotoPromise.then(concursos => {
				if (concursos.length > 0) {
					let estatisticasPromise = this.calculeFrequenciasTotaisDasDezenas(loteria.id, concursos.sorteios.length);
					estatisticasPromise.then(estatisticas => {
						this.concursoFacade.salveOuAtualize(concursos, loteria, estatisticas).then(resultadoSalveOuAtualize => {
							resolve(resultadoSalveOuAtualize);
						});
					});
				} else {
					resolve(concursos);
				}
			});
		});

		return resultadoSalveTodosPromise;
	}

	private calculeFrequenciasTotaisDasDezenas(loteriaId: number, quantideDeSorteios: number): any {
		return new Promise(resolve => {
			let estatisticas = [];
			let numeroDoSorteio = 1;
			while(numeroDoSorteio <= quantideDeSorteios) {
				this.concursoFacade.calculeFrequenciasTotaisDasDezenas(loteriaId, numeroDoSorteio).then(resultado => {
					estatisticas.push(resultado);
					numeroDoSorteio++;
					if(numeroDoSorteio > quantideDeSorteios) resolve(estatisticas);
				});
			}
		});
	}
}