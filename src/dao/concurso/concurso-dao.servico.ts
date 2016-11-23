import { Injectable } from '@angular/core';
import { IConcursoDAO } from './iconcurso-dao';
import { ConexaoFabrica } from '../util/conexao-fabrica';
import { EntidadeBD } from '../util/sincronismo/entidade-bd';
import { ComandoConcurso } from './comando-concurso';
import { Http } from '@angular/http';

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

	salveOuAtualize(concurso): void { }

	atualize(concurso): void { }

	exclua(concurso): void { }

	listeTodos(): any { }

	procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(
		dezena: string, loteriaId: number, numeroConcursoInicial: number): any {
		let concursosPromise = new Promise(resolve => { 
			let mapSeNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue = this.mapSeNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(dezena, loteriaId, numeroConcursoInicial);
			this.bd.query(this.mapStats(mapSeNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue), { reduce: true }).then(function (resultadoQuery) {
				let concurso = {
					maiorNumero: resultadoQuery.rows[0].value.max
				}
				resolve(concurso);
			}).catch(function (erro) {
				console.log("Erro na execução do método procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue: " + erro);
			});
		});
		return concursosPromise;
	}

	procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(
		dezena: string, pLoteria, numeroConcursoInicial: number, numeroConcursoFinal: number): any {
		let concursosPromise = new Promise(resolve => {
			let map = {
				map: function (doc, emit) {
					if (doc._id !== 'sessao') {
						if (doc.loteria.id == pLoteria && doc.numero >= numeroConcursoInicial && doc.numero <= numeroConcursoFinal) {
							let pattern = new RegExp(dezena, 'g');
							let match = pattern.exec(doc.sorteios[0].numerosSorteados);
							if (match != null) {
								doc['dezenaEncontrada'] = 'sim';
								emit({ 'numero': doc.numero, 'loteria': doc.loteria.nome }, { 'dezenaEncontrada': doc.dezenaEncontrada });
							} else {
								doc['dezenaEncontrada'] = 'nao';
								emit({ 'numero': doc.numero, 'loteria': doc.loteria.nome }, { 'dezenaEncontrada': doc.dezenaEncontrada });
							}
						}
					}
				}
			};
			this.bd.query(map, {
				include_docs: true
			}).then(function (resultadosQuery) {
				let concursos = [];
				resultadosQuery.rows.forEach(row => {
					let numerosSorteados = row.doc.sorteios[0].numerosSorteados;
					let numerosSorteadosSplit = numerosSorteados.split(';');
					let numerosSorteadosSort = numerosSorteadosSplit.sort(function (a, b) { return a - b });
					let concurso = [{
						id: row.doc.id,
						numero: row.doc.numero,
						dataDoSorteio: row.doc.dataDoSorteio,
						numerosSorteados: numerosSorteadosSort,
						arrecadacaoTotal: row.doc.arrecadacaoTotal,
						estimativaDePremioParaOProximoConcurso: row.doc.estimativaDePremioParaOProximoConcurso,
						acumuladoParaOProximoConcurso: row.doc.sorteios[0].rateios[0].acumuladoParaOProximoConcurso,
						dezenaEncontrada: row.value.dezenaEncontrada,
						loteria: [{
							id: row.doc.loteria.id,
							nome: row.doc.loteria.nome
						}]
					}];
					concursos.push(concurso);
				});

				resolve(concursos);

			}).catch(erro => {
				console.log("Erro na execução do método procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA: " + erro);
			});
		});
		return concursosPromise;
	};

	// Sincronismo
	sincronize(parametrosDeServico): any {
		let entidadeBD = new EntidadeBD(this.http);
		return entidadeBD.sincronize(parametrosDeServico.id, parametrosDeServico.urlConcursos, new ComandoConcurso(this));
	}

	procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(loteriaId: number): any {
		let concursosPromise = new Promise(resolve => {
			let mapSeLoteriaIdIgualA = this.mapSeLoteriaIdIgualA(loteriaId);
			this.bd.query(this.mapStats(mapSeLoteriaIdIgualA), { reduce: true }).then(function (resultadoQuery) {
				let concurso = {
					maiorNumero: resultadoQuery.rows[0].value.max
				}
				resolve(concurso);
			}).catch(function (erro) {
				console.log("Erro na execução do método procurePorNumeroMaiorDesdeQueLoteriaIdIgualA: " + erro);
			});
		});
		return concursosPromise;
	}

	private mapStats(funcaoMap: any): any {
		let map = {
			map: funcaoMap,
			reduce: function (keys, values, rereduce): any {
				if (rereduce) {
					return {
						'sum': values.reduce(function (a, b) { return a + b.sum }, 0),
						'min': values.reduce(function (a, b) { return Math.min(a, b.min) }, Infinity),
						'max': values.reduce(function (a, b) { return Math.max(a, b.max) }, -Infinity),
						'count': values.reduce(function (a, b) { return a + b.count }, 0),
						'sumsqr': values.reduce(function (a, b) { return a + b.sumsqr }, 0)
					}
				} else {
					return {
						'sum': (function () {
							var sum = 0;

							values.forEach(function (value) {
								sum += value;
							});

							return sum;
						})(),
						'min': Math.min.apply(null, values),
						'max': Math.max.apply(null, values),
						'count': values.length,
						'sumsqr': (function () {
							var sumsqr = 0;

							values.forEach(function (value) {
								sumsqr += value * value;
							});

							return sumsqr;
						})(),
					}
				}
			}
		};
		return map;
	}

	private mapSeLoteriaIdIgualA(loteriaId: number): any {
		return function (doc, emit) {
			if (doc.loteria.id == loteriaId) emit(doc, doc.numero);
		}
	}

	private mapSeNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(dezena: string, loteriaId: number, numeroConcursoInicial: number) {
		return function (doc, emit) {
			if (doc.loteria.id == loteriaId && doc.numero < numeroConcursoInicial) {
				let pattern = new RegExp(dezena, 'g');
				let match = pattern.exec(doc.sorteios[0].numerosSorteados);
				
				if (match == null) emit(doc, doc.numero);
			}
		}
	}
}
