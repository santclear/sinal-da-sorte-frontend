import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConcursoDAO } from './iconcurso-dao';
import { ConexaoFabrica } from '../util/conexao-fabrica';
import { EntidadeBD } from '../util/sincronismo/entidade-bd';
import { ComandoConcurso } from './comando-concurso';
import lodash from 'lodash';

@Injectable()
export class ConcursoDAOServico implements IConcursoDAO {
	private bd: any;

	constructor(protected http: HttpClient) {
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

	salveOuAtualize(concursosNovos, loteria): any {
		return new Promise(resolve => {
			this.bd.bulkDocs([
				{
					_id: loteria.nomeDoDocumentoNoBD,
					concursos: concursosNovos
				}
			]).then(resultadoQuery => {
				if (resultadoQuery[0].ok == true) {
					resolve({ estado: 'criado', novo: { concursos: concursosNovos }, antigo: { concursos: null } })
				} else {
					this.bd.get(loteria.nomeDoDocumentoNoBD).then(concursosAntigo => {
						let concursoAtualizados = concursosAntigo.concursos.concat(concursosNovos);
						// Caso já tenha sido inserido um dado
						let concursos = {
							_id: loteria.nomeDoDocumentoNoBD,
							_rev: concursosAntigo._rev,
							concursos: concursoAtualizados
						}
						// Atualiza com novos dados
						this.bd.put(concursos);
						return { novo: { concursos: concursoAtualizados }, antigo: { concursos: concursosAntigo.concursos } };
					}).then(concursos => {
						resolve({ estado: 'atualizado', concursos });
					})
				}
			}).catch(erro => {
				console.log(erro);
			});
		});
	}

	atualize(concurso): void { }

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

	procurePorConcursosDentroDoIntervalo(
		nomeDoDocumentoNoBD, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any {
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
					
					resolve(concursosFiltrados);
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
					resolve({ maiorNumero: 0 });
				}
			}).catch(function (erro) {
				console.log(erro);
			});
		});
		return concursosPromise;
	}

	frequenciaDasDezenas(dezenas: [string], nomeDoDocumentoNoBD, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any {
		let frequenciaDasDezenasPromise = new Promise(retorno => {
			this.bd.allDocs({
				include_docs: true,
				startkey: nomeDoDocumentoNoBD,
				endkey: nomeDoDocumentoNoBD
			}).then(function (resultadoQuery) {
				if (resultadoQuery.rows.length > 0) {
					let concursos = lodash.slice(resultadoQuery.rows[0].doc.concursos, numeroConcursoInicial - 1, numeroConcursoFinal);
					
					let objs = [];
					for(let i in dezenas) {
						objs.push({
							dezena: dezenas[i],
							frequenciaTotal: 0,
							frequenciaTotalPorCento: 0.0,
							ausenciaTotal: 0,
							acumuloRemanescente: 0,
							ausenciaRemanescente: 0
						});
					}

					concursos.forEach(concurso => {
						let numerosSorteados = concurso.sorteios[numeroDoSorteio].numerosSorteados;
						dezenas.forEach((dezena, i, dezenas) => {
							let pattern = new RegExp(dezena, 'g');
							let match = pattern.exec(numerosSorteados);
							if(match != null) {
								let frequenciaTotal = objs[i].frequenciaTotal + 1;
								objs[i].frequenciaTotal = frequenciaTotal;
								objs[i].frequenciaTotalPorCento = (frequenciaTotal*100*1.0)/numeroConcursoFinal
								objs[i].acumuloRemanescente = objs[i].acumuloRemanescente + 1;
								objs[i].ausenciaRemanescente = 0;
							} else {
								objs[i].ausenciaTotal = objs[i].ausenciaTotal + 1;
								objs[i].acumuloRemanescente = 0;
								objs[i].ausenciaRemanescente = objs[i].ausenciaRemanescente + 1;
							}
						});
					});
					retorno(objs);
				} else {
					retorno([]);
				}
			}).catch(function (erro) {
				console.log(erro);
			});
		});

		return frequenciaDasDezenasPromise;
	}

	somaDasDezenas(nomeDoDocumentoNoBD, numeroConcursoInicial: number, numeroConcursoFinal: number, numeroDoSorteio: number): any {
		let somaDasDezenasPromise = new Promise(retorno => {
			this.bd.allDocs({
				include_docs: true,
				startkey: nomeDoDocumentoNoBD,
				endkey: nomeDoDocumentoNoBD
			}).then(function (resultadoQuery) {
				if (resultadoQuery.rows.length > 0) {
					let concursos = lodash.slice(resultadoQuery.rows[0].doc.concursos, numeroConcursoInicial - 1, numeroConcursoFinal);
					
					let somaDasDezenasEmCadaConcurso = [];
					let quantidadesDeSomas = [];
					let somas: number[] = [];
					let quantidadesDeSomasMap: Map<number, number> = new Map<number, number>();
					
					concursos.forEach((concurso, i, concursos) => {
						let dezenas = concurso.sorteios[numeroDoSorteio].numerosSorteados.split(';').map(Number);
						let soma = lodash.sum(dezenas);
						let numerosSorteados = concurso.sorteios[numeroDoSorteio].numerosSorteados;
						let numerosSorteadosSplit = numerosSorteados.split(';');
						let numerosSorteadosSort = numerosSorteadosSplit.sort(function (a, b) { return a - b });

						somaDasDezenasEmCadaConcurso.push({
							concurso: concurso.numero,
							soma: soma,
							dezenas: numerosSorteadosSort
						});

						let quantidade: number = quantidadesDeSomasMap.get(soma);
						if(quantidade !== undefined) {
							quantidade++;
							quantidadesDeSomasMap.set(soma, quantidade);
						} else {
							quantidadesDeSomasMap.set(soma, 1);
						}

						somas.push(soma);
						if (i == concursos.length - 1) {
							quantidadesDeSomasMap.forEach((quantidade, soma) => {
								quantidadesDeSomas.push({soma: soma, quantidade: quantidade});
							});
						};
					});

					let mediaDaSomaDasDezenasEmCadaConcurso = lodash.mean(somas);

					retorno({
						somaDasDezenasEmCadaConcurso: somaDasDezenasEmCadaConcurso,
						quantidadesDeSomas: quantidadesDeSomas,
						mediaDaSomaDasDezenasEmCadaConcurso: mediaDaSomaDasDezenasEmCadaConcurso
					});
				} else {
					retorno([]);
				}
			}).catch(function (erro) {
				console.log(erro);
			});
		});

		return somaDasDezenasPromise;
	}
}
