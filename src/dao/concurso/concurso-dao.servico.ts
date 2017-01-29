import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {IConcursoDAO} from './iconcurso-dao';
import {ConexaoFabrica} from '../util/conexao-fabrica';
import {EntidadeBD} from '../util/sincronismo/entidade-bd';
import {ComandoConcurso} from './comando-concurso';
import {Loterias} from '../../enum/loterias';
import lodash from 'lodash';


@Injectable()
export class ConcursoDAOServico implements IConcursoDAO {
	private bd: any;

	constructor(private http: Http) {
		this.bd = ConexaoFabrica.getConexao();
	}

	salve(concurso): any {
		this.bd.put(
			concurso
		).then(function () {
			return this.bd.allDocs({ include_docs: true });
		}).then(function (response) {
			console.log('Concurso salvo com sucesso: ');
			console.log(response);
		}).catch(function (err) {
			console.log('Ocorreu um erro ao salvar o concurso: ');
			console.log(err);
		});

	}

	salveTodos(concursos): any {
		return this.bd.bulkDocs(concursos);
	}

	salveOuAtualize(concursosNovos, loteria, estatisticas): any {
		return new Promise(resolve => {
			this.bd.bulkDocs([
				{
					_id: loteria.nomeDoDocumentoNoBD,
					concursos: concursosNovos,
					estatisticas: estatisticas
				}
			]).then(resultadoQuery => {
				if (resultadoQuery[0].ok == true) {
					resolve({ estado: 'criado', novo: { concursos: concursosNovos, estatisticas: estatisticas }, antigo: { concursos: null, estatisticas: null } })
				} else {
					this.bd.get(loteria.nomeDoDocumentoNoBD).then(concursosAntigo => {
						let concursoAtualizados = concursosAntigo.concursos.concat(concursosNovos);
						// Caso já tenha sido inserido um dado
						let concursos = {
							_id: loteria.nomeDoDocumentoNoBD,
							_rev: concursosAntigo._rev,
							concursos: concursoAtualizados,
							estatisticas: estatisticas
						}
						// Atualiza com novos dados
						this.bd.put(concursos);
						return { novo: { concursos: concursoAtualizados, estatisticas: estatisticas }, antigo: { concursos: concursosAntigo.concursos, estatisticas: concursosAntigo.estatisticas } };
					}).then(concursos => {
						resolve({ estado: 'atualizado', concursos });
					})
				}
			}).catch(erro => {
				console.log(erro);
			});
		});
	}

	// private crieFrequenciasTotaisDasDezenas(loterias, numeroConcursoInicial: number, numeroConcursoFinal: number) {
	// 	return new Promise(resolve => {
	// 		let frequenciasTotaisDasDezenas = [];
	// 		// dezenas que foram sorteadas
	// 		loterias.dezenas.forEach((dezena, i, dezenas) => {
	// 			let dezenaPromise = this.procurePorFrequenciaTotalDaDezena(loterias.nomeDoDocumentoNoBD, dezena.numero, 0);
	// 			dezenaPromise.then(dezenaFiltrada => {
	// 				frequenciasTotaisDasDezenas.push({ numero: dezena.numero, frequenciaTotal: dezenaFiltrada.frequenciaTotal, frequenciaTotalPorCento: dezenaFiltrada.frequenciaTotalPorCento });
	// 				if(loterias.dezenas.length == Number(i + 1)) resolve(lodash.orderBy(frequenciasTotaisDasDezenas, [function (dezena) { return dezena.frequenciaTotalPorCento; }], ['desc']));
	// 			});
	// 		});
	// 	});
	// }

	// procurePorFrequenciaTotalDaDezena(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number): any {
	// 	let concursosPromise = new Promise(resolve => {
	// 		this.bd.allDocs({
	// 			include_docs: true,
	// 			startkey: nomeDoDocumentoNoBD,
	// 			endkey: nomeDoDocumentoNoBD
	// 		}).then(function (resultadoQuery) {
	// 			if (resultadoQuery.rows.length > 0) {
	// 				// manter | irá apenas atualizar a contagem das dezenas que foram sorteadas
	// 				let contagemDaDezenaNosConcursos = lodash.countBy(resultadoQuery.rows[0].doc.concursos, function (concurso) {
	// 					let pattern = new RegExp(dezena, 'g');
	// 					let match = pattern.exec(concurso.sorteios[numeroDoSorteio].numerosSorteados);
	// 					return match != null;
	// 				});
	// 				// descartar
	// 				let concurso = lodash.maxBy(resultadoQuery.rows[0].doc.concursos, function (concurso) { return concurso.numero });
	// 				let frequenciaTotalPorCento = (100 * contagemDaDezenaNosConcursos.true) / concurso.numero;
					
	// 				resolve({frequenciaTotal: contagemDaDezenaNosConcursos.true, frequenciaTotalPorCento: frequenciaTotalPorCento});
	// 			} else {
	// 				resolve([]);
	// 			}
	// 		}).catch(function (erro) {
	// 			console.log(erro);
	// 		});
	// 	});
	// 	return concursosPromise;
	// }

	calculeFrequenciaTotalDaDezenaDentroDoIntervalo(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number, numeroConcursoInicial: number, numeroConcursoFinal: number): any {
		let concursosPromise = new Promise(resolve => {
			this.bd.allDocs({
				include_docs: true,
				startkey: nomeDoDocumentoNoBD,
				endkey: nomeDoDocumentoNoBD
			}).then(function (resultadoQuery) {
				if (resultadoQuery.rows.length > 0) {
					// manter | irá apenas atualizar a contagem das dezenas que foram sorteadas
					let contagemDaDezenaNosConcursos = lodash.countBy(resultadoQuery.rows[0].doc.concursos, function (concurso) {
						let pattern = new RegExp(dezena, 'g');
						let match = pattern.exec(concurso.sorteios[numeroDoSorteio].numerosSorteados);
						return match != null && concurso.numero >= numeroConcursoInicial && concurso.numero <= numeroConcursoFinal;
					});
					// descartar
					// let concurso = lodash.maxBy(resultadoQuery.rows[0].doc.concursos, function (concurso) { return concurso.numero });
					// let frequenciaTotalPorCento = (100 * contagemDaDezenaNosConcursos.true) / concurso.numero;
					
					resolve({total: contagemDaDezenaNosConcursos.true/*, frequenciaTotalPorCento: frequenciaTotalPorCento*/});
				} else {
					resolve([]);
				}
			}).catch(function (erro) {
				console.log(erro);
			});
		});
		return concursosPromise;
	}

	calculeAusenciaTotalDaDezenaDentroDoIntervalo(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number, numeroConcursoInicial: number, numeroConcursoFinal: number): any {
		let concursosPromise = new Promise(resolve => {
			this.bd.allDocs({
				include_docs: true,
				startkey: nomeDoDocumentoNoBD,
				endkey: nomeDoDocumentoNoBD
			}).then(function (resultadoQuery) {
				if (resultadoQuery.rows.length > 0) {
					// manter | irá apenas atualizar a contagem das dezenas que foram sorteadas
					let contagemDaDezenaNosConcursos = lodash.countBy(resultadoQuery.rows[0].doc.concursos, function (concurso) {
						let pattern = new RegExp(dezena, 'g');
						let match = pattern.exec(concurso.sorteios[numeroDoSorteio].numerosSorteados);
						return match == null && concurso.numero >= numeroConcursoInicial && concurso.numero <= numeroConcursoFinal;
					});
					// descartar
					// let concurso = lodash.maxBy(resultadoQuery.rows[0].doc.concursos, function (concurso) { return concurso.numero });
					// let frequenciaTotalPorCento = (100 * contagemDaDezenaNosConcursos.true) / concurso.numero;
					
					resolve({total: contagemDaDezenaNosConcursos.true/*, frequenciaTotalPorCento: frequenciaTotalPorCento*/});
				} else {
					resolve([]);
				}
			}).catch(function (erro) {
				console.log(erro);
			});
		});
		return concursosPromise;
	}

	atualize(concurso): void {}

	atualizeComEstatisticas(parametrosDeServico, estatisticas): any {
		return new Promise(resolve => {
			this.bd.get(parametrosDeServico.nomeDoDocumentoNoBD).then(concursosAntigo => {
					// Caso já tenha sido inserido um dado
					let concursos = {
						_id: parametrosDeServico.nomeDoDocumentoNoBD,
						_rev: concursosAntigo._rev,
						concursos: concursosAntigo.concursos,
						estatisticas: estatisticas
					}
					// Atualiza com novos dados
					this.bd.put(concursos);
					return concursosAntigo;
			}).then(concursosAntigo => {
				this.bd.allDocs({
					include_docs: true,
					startkey: parametrosDeServico.nomeDoDocumentoNoBD,
					endkey: parametrosDeServico.nomeDoDocumentoNoBD
				}).then(function (resultadoQuery) {
					resolve({ estado: 'atualizado', novo: null, antigo: concursosAntigo.concursos, estatisticas: resultadoQuery.rows[0].doc.estatisticas });
				});
			});
		});
	}

	exclua(concurso): void { }

	listeTodos(nomeDoDocumentoNoBD): any {
		return new Promise(resolve => {
			this.bd.allDocs({
				include_docs: true,
				startkey: nomeDoDocumentoNoBD,
				endkey: nomeDoDocumentoNoBD
			}).then(function (resultadoQuery) {
				resolve(resultadoQuery.rows[0].doc);
			});
		});
	}

	procurePorConcursosQueNaoContenhamADezenaEONumeroSejaMenorQueONumeroDoConcursoInicialEPegueOUltimo(
		dezena: string, nomeDoDocumentoNoBD: string, numeroConcursoInicial: number, numeroDoSorteio: number): any {
		let concursosPromise = new Promise(resolve => {
			this.bd.allDocs({
				include_docs: true,
				startkey: nomeDoDocumentoNoBD,
				endkey: nomeDoDocumentoNoBD
			}).then(function (resultadoQuery) {
				if (resultadoQuery.rows.length > 0) {
					let concursosFiltrados = lodash.filter(resultadoQuery.rows[0].doc.concursos, function (concurso) {
						if (concurso.numero < numeroConcursoInicial) {
							let pattern = new RegExp(dezena, 'g');
							let match = pattern.exec(concurso.sorteios[numeroDoSorteio].numerosSorteados);
							return match == null;
						}
					});
					let concurso = lodash.maxBy(concursosFiltrados, function (concurso) { return concurso.numero });
					resolve({ maiorNumero: concurso.numero });
				} else {
					resolve(0);
				}
			}).catch(function (erro) {
				console.log(erro);
			});
		});

		return concursosPromise;
	}

	procurePorConcursosQueContenhamADezenaDentroDoIntervalo(
		dezena: string, nomeDoDocumentoNoBD, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any {
		let concursosPromise = new Promise(resolve => {
			this.bd.allDocs({
				include_docs: true,
				startkey: nomeDoDocumentoNoBD,
				endkey: nomeDoDocumentoNoBD
			}).then(function (resultadoQuery) {
				if (resultadoQuery.rows.length > 0) {
					let concursosFiltrados = lodash.filter(resultadoQuery.rows[0].doc.concursos, function (concurso) {
						return concurso.numero >= numeroConcursoInicial && concurso.numero <= numeroConcursoFinal;
					});
					let concursosProcessado = [];
					concursosFiltrados.forEach(concursoFiltrado => {
						let concurso = concursoFiltrado;
						let pattern = new RegExp(dezena, 'g');
						let match = pattern.exec(concursoFiltrado.sorteios[numeroDoSorteio].numerosSorteados);
						if (match != null) {
							concurso['dezenaEncontrada'] = 'sim';
							concursosProcessado.push(concurso);
						} else {
							concurso['dezenaEncontrada'] = 'nao';
							concursosProcessado.push(concurso);
						}
					});
					resolve(concursosProcessado);
				} else {
					resolve([]);
				}
			}).catch(function (erro) {
				console.log(erro);
			});
		});

		return concursosPromise;

	};

	procurePorUnicoConcurso(nomeDoDocumentoNoBD: string, numeroConcurso: number): any {
		let concursosPromise = new Promise(resolve => {
			this.bd.allDocs({
				include_docs: true,
				startkey: nomeDoDocumentoNoBD,
				endkey: nomeDoDocumentoNoBD
			}).then(function (resultadoQuery) {
				if (resultadoQuery.rows.length > 0) {
					let concursos = lodash.find(resultadoQuery.rows[0].doc.concursos, function (concurso) {
						return concurso.numero == numeroConcurso;
					});
					resolve(concursos);
				} else {
					resolve([]);
				}
			}).catch(function (erro) {
				console.log(erro);
			});
		});
		return concursosPromise;
	}

	calculeFrequenciasTotaisDasDezenas(loteriaId: number, numeroDoSorteio: number): any {

		return new Promise(resolve => {
			this.http.get(Loterias.DOMINIO +'concursos/calcule_frequencias_totais_das_dezenas/'+ loteriaId +'&'+ numeroDoSorteio)
            .toPromise()
            .then(response => {
                resolve(response.json());
            }).catch(this.handleError);
		});
	}

	private handleError(error: any): any {
        console.error('Erro ao tentar obter o serviço ', error);
        return Promise.reject(error.message || error);
    }

	// Sincronismo
	sincronize(loterias): any {
		let entidadeBD = new EntidadeBD(this.http);
		return entidadeBD.sincronize(loterias, new ComandoConcurso(this));
	}

	procurePorNumeroDoUltimoConcursoSorteado(nomeDoDocumentoNoBD: string): any {
		let concursosPromise = new Promise(resolve => {
			this.bd.allDocs({
				include_docs: true,
				startkey: nomeDoDocumentoNoBD,
				endkey: nomeDoDocumentoNoBD
			}).then(function (resultadoQuery) {
				if (resultadoQuery.rows.length > 0) {
					let concurso = lodash.maxBy(resultadoQuery.rows[0].doc.concursos, function (concurso) { return concurso.numero });
					resolve({ maiorNumero: concurso.numero });
				} else {
					resolve(0);
				}
			}).catch(function (erro) {
				console.log(erro);
			});
		});
		return concursosPromise;
	}
}
