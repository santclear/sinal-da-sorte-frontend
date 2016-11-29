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

	salveOuAtualize(doc, parametrosDeServico): any {
		return new Promise(resolve => {
			this.bd.bulkDocs([
				{
					_id: parametrosDeServico.nomeDoDocumentoNoBD,
					concursos: doc
				}
			]).then(resultadoQuery => {
				if (resultadoQuery[0].ok == true) {
					resolve({ estado: 'criado', novo: { concursos: doc }, antigo: null })
				} else {
					this.bd.get(parametrosDeServico.nomeDoDocumentoNoBD).then(concursosAntigo => {
						let concursoAtualizados = concursosAntigo.concursos.concat(doc);
						// Caso já tenha sido inserido um dado
						let concursos = {
							_id: parametrosDeServico.nomeDoDocumentoNoBD,
							_rev: concursosAntigo._rev,
							concursos: concursoAtualizados
						}
						// Atualiza com novos dados
						this.bd.put(concursos);
						return concursosAntigo;
					}).then(concursosAntigo => {
						resolve({ estado: 'atualizado', novo: { concursos: doc }, antigo: concursosAntigo });
					})
				}
			}).catch(erro => {
				console.log(erro);
			});
		});
	}

	atualize(concurso): void { }

	exclua(concurso): void { }

	listeTodos(): any { }

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
