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
					let estatisticasPromise = this.calculeFrequenciasTotaisDasDezenas(loteria.id, concursos[0].sorteios.length);
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
			let estatisticasPromise = [];
			let estatisticas = [];
			var numeroDoSorteio = 1;
			
			for(; numeroDoSorteio <= quantideDeSorteios; numeroDoSorteio++) {
				estatisticasPromise.push(this.concursoFacade.calculeFrequenciasTotaisDasDezenas(loteriaId, numeroDoSorteio));
			}

			estatisticasPromise.forEach((estatisticaPromise, i, array) => {
				estatisticaPromise.then(resultado => {
					estatisticas.push(resultado);
					if(array.length == estatisticas.length) resolve(estatisticas);
				})
			});
		});
	}
}