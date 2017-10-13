import { Component } from '@angular/core';
import { PaginaBase } from '../pagina.base';
import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';
import { ConcursoFacade } from '../../dao/concurso/concurso-facade';
import { ConcursoDAOServico } from '../../dao/concurso/concurso-dao.servico';
import { Loterias } from '../../enum/loterias';
import lodash from 'lodash';

@Component({
	selector: 'pagina-bem-vindo',
	templateUrl: 'bem-vindo.html'
})
export class BemVindoPage extends PaginaBase {
	private numeroDoConcurso;
	private dataDoSorteio;
	private dezenas = [];
	private sorteios: any = [];
	private dezenasEmOrdemCrescente = [];
	private tiposDeAcertos = [];
	private cidadesEEstadosDosGanhadoresDoPremioPrincipal = [];
	private dezenasSorteio2 = [];
	private exibeDezenasComQuebraDeLinha: boolean;
	private exibeAcumuladoEspecial: boolean;
	private exibeTimeDoCoracao: boolean;
	private exibeDezenasSorteio2DuplaSena: boolean;
	private exibeGanhadoresDoPremioPrincipal: boolean;
	private timeDoCoracao: string;
	private sufixoCssLoteriaSelecionada: string;
	private nomeDaLoteria: string;
	private tipoDoPremioPrincipal;
	private valorDoPremioPrincipal;
	private numeroDeGanhadoresDoPremioPrincipal;
	private acumuladoParaOProximoConcurso;
	private estimativaDePremioParaOProximoConcurso;
	private acumuladoEspecial;
	private labelAcumuladoEspecial;
	private rgeFaixaDeConcursos: number;
	private numeroDoConcursoInicial: number;
	private numeroDoConcursoFinal: number;
	private rgeFaixaDeConcursosMin: number = 1;
	private rgeFaixaDeConcursosMax: number;
	private extensaoDaFaixaDeConcurso: number;
	private estatisticasDosSorteios = [];
	private bd;

	public filterQuery = "";
	public rowsOnPage = 100;
	public sortBy = "total";
	public sortOrder = "asc";

	constructor(private concursoDAOServico: ConcursoDAOServico) {
		super();
		this.setTitulo("Bem Vindo");

		this.bd = ConexaoFabrica.getConexao();

		this.bd.get('sessao').then((sessao) => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let concursosPromise = concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				this.atualizeResultados(sessao, concursoFacade, concursos.maiorNumero);
				this.rgeFaixaDeConcursos = concursos.maiorNumero;
				this.rgeFaixaDeConcursosMax = concursos.maiorNumero;
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
						this.tipoDoPremioPrincipal = sessao.loteria.tiposDeAcertos[j];
						this.valorDoPremioPrincipal = rateio.rateio;
						this.numeroDeGanhadoresDoPremioPrincipal = rateio.numeroDeGanhadores;
						this.acumuladoParaOProximoConcurso = rateio.acumuladoParaOProximoConcurso;
					}
				});
				this.sorteios[i]['rateios'] = rateiosAtualizados;
			});

			concurso.sorteios.forEach(sorteio => {
				this.dezenasEmOrdemCrescente.push(this.ordeneDezenasEmOrdemCrescente(sorteio.numerosSorteados));
			});


			let cidadesDosGanhadoresDoPremioPrincipal = lodash.pull(concurso.cidade.split(';'), '');
			let ufsDosGanhadoresDoPremioPrincipal = lodash.pull(concurso.uf.split(';'), '');
			this.cidadesEEstadosDosGanhadoresDoPremioPrincipal = [];
			cidadesDosGanhadoresDoPremioPrincipal.forEach((cidadeDoGanhadorDoPremioPrincipal, i, array) => {
				cidadeDoGanhadorDoPremioPrincipal = lodash.lowerCase(cidadeDoGanhadorDoPremioPrincipal);
				this.cidadesEEstadosDosGanhadoresDoPremioPrincipal.push(lodash.startCase(cidadeDoGanhadorDoPremioPrincipal) + '/' + lodash.upperCase(ufsDosGanhadoresDoPremioPrincipal[i]));
				this.exibeGanhadoresDoPremioPrincipal = true;
			});
			let mapCidadesEEstatadosDosGanhadoresDoPremioPrincipal = new Map();
			this.cidadesEEstadosDosGanhadoresDoPremioPrincipal.forEach(cidadeEEstatadoDoGanhadoreDoPremioPrincipal => {
				let cidadeEEstatadoEncontrado: number = mapCidadesEEstatadosDosGanhadoresDoPremioPrincipal.get(cidadeEEstatadoDoGanhadoreDoPremioPrincipal);
				mapCidadesEEstatadosDosGanhadoresDoPremioPrincipal.set(cidadeEEstatadoDoGanhadoreDoPremioPrincipal, cidadeEEstatadoEncontrado != undefined ? cidadeEEstatadoEncontrado + 1 : 1);
			});
			this.cidadesEEstadosDosGanhadoresDoPremioPrincipal = [];
			mapCidadesEEstatadosDosGanhadoresDoPremioPrincipal.forEach((valor, chave) => {
				this.cidadesEEstadosDosGanhadoresDoPremioPrincipal.push({ quantidade: valor, nome: chave })
			});

			if (this.cidadesEEstadosDosGanhadoresDoPremioPrincipal.length == 0) this.exibeGanhadoresDoPremioPrincipal = false;


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
				this.estatisticasDosSorteios = concursos.estatisticas;
			});
		});
	}
}