import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';
import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';
import { ConcursoFacade } from '../../dao/concurso/concurso-facade';
import { ConcursoDAOServico } from '../../dao/concurso/concurso-dao.servico';
import { Loterias } from '../../enum/loterias';
import lodash from 'lodash';

@IonicPage()
@Component({
	selector: 'pagina-resultado',
	templateUrl: 'resultado.html'
})
export class ResultadoPage extends PaginaBase {
	public numeroDoConcurso;
	public dataDoSorteio;
	public dezenas = [];
	public sorteios: any = [];
	public colsRateio: any = [];
	public colsEstatisticas: any = [];
	public dezenasEmOrdemCrescente = [];
	public tiposDeAcertos = [];
	public cidadesEEstadosDosGanhadoresDoPremioPrincipal = [];
	public dezenasSorteio2 = [];
	public exibeDezenasComQuebraDeLinha: boolean;
	public exibeAcumuladoEspecial: boolean;
	public exibeTimeDoCoracao: boolean;
	public exibeDezenasSorteio2DuplaSena: boolean;
	public exibeGanhadoresDoPremioPrincipal: boolean;
	public timeDoCoracao: string;
	public sufixoCssLoteriaSelecionada: string;
	public nomeDaLoteria: string;
	public tipoDoPremioPrincipal;
	public valorDoPremioPrincipal;
	public numeroDeGanhadoresDoPremioPrincipal;
	public acumuladoParaOProximoConcurso;
	public estimativaDePremioParaOProximoConcurso;
	public acumuladoEspecial;
	public labelAcumuladoEspecial;
	public rgeFaixaDeConcursos: number;
	public numeroDoConcursoInicial: number;
	public numeroDoConcursoFinal: number;
	public rgeFaixaDeConcursosMin: number = 1;
	public rgeFaixaDeConcursosMax: number;
	public extensaoDaFaixaDeConcurso: number;
	public estatisticasDosSorteios = [];
	public bd;

	public filterQuery = "";
	public rowsOnPage = 100;
	public sortBy = "total";
	public sortOrder = "asc";

	constructor(private concursoDAOServico: ConcursoDAOServico) {
		super();
		this.setTitulo("Resultado");

		this.bd = ConexaoFabrica.getConexao();

		this.bd.get('sessao').then((sessao) => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let concursosPromise = concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				if(concursos.maiorNumero > 0) {
					this.atualizeResultados(sessao, concursoFacade, concursos.maiorNumero);
					this.rgeFaixaDeConcursos = concursos.maiorNumero;
					this.rgeFaixaDeConcursosMax = concursos.maiorNumero;
				}
			});
		});

		// this.menu.open();
	}

	rgeFaixaDeConcursosAtualize(concursoFinal) {
		this.numeroDoConcursoInicial = concursoFinal.value - this.extensaoDaFaixaDeConcurso;
		if (this.numeroDoConcursoInicial == 0) {
			this.numeroDoConcursoInicial = 1;
			this.numeroDoConcursoFinal = concursoFinal.value + 1;
			this.rgeFaixaDeConcursosMin = concursoFinal.value + 1;
		} else {
			this.numeroDoConcursoFinal = concursoFinal.value;
		}

		this.bd.get('sessao').then((sessao) => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let concursosPromise = concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				this.atualizeResultados(sessao, concursoFacade, concursoFinal.value);
			});
		});
	}

	rgeDesloqueParaEsquerda() {
		if (this.rgeFaixaDeConcursos > this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial--;
			this.numeroDoConcursoFinal--;
			this.rgeFaixaDeConcursos--;
			this.bd.get('sessao').then((sessao) => {
				let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
				let concursosPromise = concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
				concursosPromise.then(concursos => {
					this.atualizeResultados(sessao, concursoFacade, this.rgeFaixaDeConcursos);
				});
			});
		}
	}

	rgeDesloqueParaDireita() {
		if (this.rgeFaixaDeConcursos < this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial++;
			this.numeroDoConcursoFinal++;
			this.rgeFaixaDeConcursos++;
			this.bd.get('sessao').then((sessao) => {
				let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
				let concursosPromise = concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
				concursosPromise.then(concursos => {
					this.atualizeResultados(sessao, concursoFacade, this.rgeFaixaDeConcursos);
				});
			});
		}
	}

	valideSeLotofacilOuLotomania(sessao) {
		return sessao.loteria.nomeDoDocumentoNoBD === Loterias.LOTOFACIL.nomeDoDocumentoNoBD ||
			sessao.loteria.nomeDoDocumentoNoBD === Loterias.LOTOMANIA.nomeDoDocumentoNoBD ? true : false;
	}

	valideSeDiferenteDeLotomaniaETimemania(sessao) {
		return sessao.loteria.nomeDoDocumentoNoBD !== Loterias.LOTOMANIA.nomeDoDocumentoNoBD &&
			sessao.loteria.nomeDoDocumentoNoBD !== Loterias.TIMEMANIA.nomeDoDocumentoNoBD ? true : false;
	}

	valideSeTimemania(sessao) {
		return sessao.loteria.nomeDoDocumentoNoBD === Loterias.TIMEMANIA.nomeDoDocumentoNoBD;
	}

	valideSeDuplaSena(sessao) {
		return sessao.loteria.nomeDoDocumentoNoBD === Loterias.DUPLASENA.nomeDoDocumentoNoBD;
	}

	ordeneDezenasEmOrdemCrescente(numerosSorteados: string) {
		let numerosSorteadosSplit = numerosSorteados.split(';');
		return numerosSorteadosSplit.sort(function (a: any, b: any) { return a - b });
	}

	atualizeResultados(sessao, concursoFacade, numeroDoConcurso) {
		let concursoPromise = concursoFacade.procurePorUnicoConcurso(sessao.loteria.nomeDoDocumentoNoBD, numeroDoConcurso);
		concursoPromise.then(concurso => {
			this.numeroDoConcurso = concurso.numero;
			this.dataDoSorteio = concurso.dataDoSorteio;

			this.sufixoCssLoteriaSelecionada = sessao.loteria.sufixoCssLoteria;
			this.nomeDaLoteria = sessao.loteria.nome;

			this.dezenas = this.ordeneDezenasEmOrdemCrescente(concurso.sorteios[0].numerosSorteados);
			if (this.valideSeDuplaSena(sessao)) {
				this.dezenasSorteio2 = this.ordeneDezenasEmOrdemCrescente(concurso.sorteios[1].numerosSorteados);
				this.exibeDezenasSorteio2DuplaSena = true;
			} else {
				this.exibeDezenasSorteio2DuplaSena = false;
			}

			this.tiposDeAcertos = sessao.loteria.tiposDeAcertos;
			this.sorteios = concurso.sorteios;
			this.sorteios.forEach((sorteio, i, sorteios) => {
				let rateiosAtualizados = [];
				sorteio.rateios.forEach((rateio, j, rateios) => {
					let rateioAtualizado = rateio;
					rateioAtualizado['tipoDePremio'] = sessao.loteria.tiposDeAcertos[j];
					rateiosAtualizados.push(rateioAtualizado);
					if (i == 0 && j == 0) {
						this.valorDoPremioPrincipal = rateio.rateio;
						this.numeroDeGanhadoresDoPremioPrincipal = rateio.numeroDeGanhadores;
						this.acumuladoParaOProximoConcurso = rateio.acumuladoParaOProximoConcurso;
					}
				});
				this.sorteios[i]['rateios'] = rateiosAtualizados;
			});

			this.colsRateio = [
				{ campo: 'tipoDePremio', nome: 'Tipo de acerto' },
				{ campo: 'numeroDeGanhadores', nome: 'Total de ganhadores' },
				{ campo: 'rateio', nome: 'Prêmio' }
			];

			concurso.sorteios.forEach(sorteio => {
				this.dezenasEmOrdemCrescente.push(this.ordeneDezenasEmOrdemCrescente(sorteio.numerosSorteados));
			});

			if (this.valideSeTimemania(sessao)) {
				this.timeDoCoracao = this.dezenas[this.dezenas.length - 1];
				this.dezenas.pop();
				this.exibeTimeDoCoracao = true;
			} else {
				this.exibeTimeDoCoracao = false;
			}

			this.exibeDezenasComQuebraDeLinha = this.valideSeLotofacilOuLotomania(sessao);
			this.exibeAcumuladoEspecial = this.valideSeDiferenteDeLotomaniaETimemania(sessao);

			this.estimativaDePremioParaOProximoConcurso = concurso.estimativaDePremioParaOProximoConcurso;
			this.acumuladoEspecial = concurso.acumuladoEspecial;
			this.labelAcumuladoEspecial = sessao.loteria.labelAcumuladoEspecial;

			let concursosPromise = concursoFacade.listeTodos(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				this.colsEstatisticas = [
					{ campo: 'dezena', nome: 'Dezena' },
					{ campo: 'frequencia', nome: 'Frequência total' },
					{ campo: 'frequenciaPorCento', nome: 'Ausência total' }
				];

				this.estatisticasDosSorteios = concursos.estatisticas;
			});
		});
	}
}