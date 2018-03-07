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
			concursosPromise.then(concursosLocal => {
				if (concursosLocal.maiorNumero > 0) {
					resolve(this.baixeResultadosRemoto(concursosLocal.maiorNumero, concursosLocal, entidadeBDReceptor, loteria));
				} else {
					resolve(this.baixeResultadosRemoto(0, concursosLocal, entidadeBDReceptor, loteria));
				}
			});
		});
	}

	private baixeResultadosRemoto(maiorNumeroEntreOsConcursos: number, concursosLocal, entidadeBDReceptor: EntidadeBDReceptor, loteria): any {
		
		let resultadoSalveTodosPromise = new Promise(resolve => {
			entidadeBDReceptor.baixeResultadosRemoto(maiorNumeroEntreOsConcursos).subscribe(concursosRemoto => {
				if (concursosRemoto.length > 0) {
					let estatisticasPromise = this.calculeFrequenciasTotaisDasDezenas(loteria.id, concursosRemoto[0].sorteios.length);
					estatisticasPromise.then(estatisticas => {
						this.concursoFacade.salveOuAtualize(concursosRemoto, loteria, estatisticas).then(resultadoSalveOuAtualize => {
							resolve(resultadoSalveOuAtualize);
						});
					});
				} else {
					resolve(concursosRemoto);
				}
			}, error => { 
				resolve(concursosLocal);
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