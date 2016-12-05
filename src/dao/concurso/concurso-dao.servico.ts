import { Injectable } from '@angular/core';
import { IConcursoDAO } from './iconcurso-dao';
import { ConexaoFabrica } from '../util/conexao-fabrica';
import { EntidadeBD } from '../util/sincronismo/entidade-bd';
import { ComandoConcurso } from './comando-concurso';
import { Http } from '@angular/http';
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

	salveOuAtualize(doc, loterias): any {
		return new Promise(resolve => {
			this.bd.bulkDocs([
				{
					_id: loterias.nomeDoDocumentoNoBD,
					concursos: doc
				}
			]).then(resultadoQuery => {
				if (resultadoQuery[0].ok == true) {
					let frequenciasTotaisDasDezenasPromise = this.crieFrequenciasTotaisDasDezenas(loterias);
					frequenciasTotaisDasDezenasPromise.then(frequenciasTotaisDasDezenas => {
						resolve({ estado: 'criado', novo: doc, antigo: null, estatisticas: frequenciasTotaisDasDezenas });
					});
				} else {
					this.bd.get(loterias.nomeDoDocumentoNoBD).then(concursosAntigo => {
						let concursoAtualizados = concursosAntigo.concursos.concat(doc);
						// Caso já tenha sido inserido um dado
						let concursos = {
							_id: loterias.nomeDoDocumentoNoBD,
							_rev: concursosAntigo._rev,
							concursos: concursoAtualizados,
							estatisticas: concursosAntigo.estatisticas
						}
						// Atualiza com novos dados
						this.bd.put(concursos);
						return concursosAntigo;
					}).then(concursosAntigo => {
						let frequenciasTotaisDasDezenasPromise = this.crieFrequenciasTotaisDasDezenas(loterias);
						frequenciasTotaisDasDezenasPromise.then(frequenciasTotaisDasDezenas => {
							resolve({ estado: 'atualizado', estatisticas: frequenciasTotaisDasDezenas });
						});
					});
				}
			}).catch(erro => {
				console.log(erro);
			});
		});
	}

	private crieFrequenciasTotaisDasDezenas(loterias) {
		return new Promise(resolve => {
			let frequenciasTotaisDasDezenas = [];
			// dezenas que foram sorteadas
			loterias.dezenas.forEach((dezena, i, dezenas) => {
				let dezenaPromise = this.getFrequenciaTotalDaDezena(loterias.nomeDoDocumentoNoBD, dezena.numero, 0);
				dezenaPromise.then(dezenaFiltrada => {
					frequenciasTotaisDasDezenas.push({ numero: dezena.numero, frequenciaTotal: dezenaFiltrada.frequenciaTotal, frequenciaTotalPorCento: dezenaFiltrada.frequenciaTotalPorCento });
					if(loterias.dezenas.length == Number(i + 1)) resolve(lodash.orderBy(frequenciasTotaisDasDezenas, [function (dezena) { return dezena.frequenciaTotalPorCento; }], ['desc']));
				});
			});
			// let concurso = lodash.maxBy(resultadoQuery.rows[0].doc.concursos, function (concurso) { return concurso.numero });
			// for para toda as dezenas do objeto estatistica
				// let frequenciaTotalPorCento = (100 * contagemDaDezenaNosConcursos.true) / concurso.numero;
		});
	}

	getFrequenciaTotalDaDezena(nomeDoDocumentoNoBD: string, dezena: string, numeroDoSorteio: number): any {
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
						return match != null;
					});
					// descartar
					let concurso = lodash.maxBy(resultadoQuery.rows[0].doc.concursos, function (concurso) { return concurso.numero });
					let frequenciaTotalPorCento = (100 * contagemDaDezenaNosConcursos.true) / concurso.numero;
					
					resolve({frequenciaTotal: contagemDaDezenaNosConcursos.true, frequenciaTotalPorCento: frequenciaTotalPorCento});
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

	/*
		select c.numero num1, (
				select
					-- count(lot.nome)
					count(conc.numero)
					-- conc.data_do_sorteio,
					-- lot.nome,
					-- sort.numeros_sorteados
				from concurso conc
				join sorteio sort
					on conc.id = sort.id
				join loteria lot
					on conc.loteria_id = lot.id
				where
					lot.nome = 'Lotofácil'
					-- and sort.numeros_sorteados like concat('%', num1 ,'%')
					and sort.numeros_sorteados like concat('%', IF(num1 < 10, concat('0', num1) , num1) ,'%')
					
		) count

		from concurso c
		where
			c.loteria_id = 1
			and c.numero >= 1
			and c.numero <= 25
		order by count desc;
	*/
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

	procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(
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

	procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(
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

	// Sincronismo
	sincronize(loterias): any {
		let entidadeBD = new EntidadeBD(this.http);
		return entidadeBD.sincronize(loterias, new ComandoConcurso(this));
	}

	procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(nomeDoDocumentoNoBD: string): any {
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
