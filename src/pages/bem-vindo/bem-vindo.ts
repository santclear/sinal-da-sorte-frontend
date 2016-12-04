import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {PaginaBase} from '../pagina.base';
import {ConexaoFabrica} from '../../dao/util/conexao-fabrica';
import {ConcursoFacade} from '../../dao/concurso/concurso-facade';
import {ConcursoDAOServico} from '../../dao/concurso/concurso-dao.servico';
import {Loterias} from '../../enum/loterias';

@Component({
	selector: 'pagina-bem-vindo',
	templateUrl: 'bem-vindo.html'
})
export class BemVindoPage extends PaginaBase {
	private numeroDoConcurso;
	private dataDoSorteio;
	private dezenas = [];
	private dezenasSorteio2 = [];
	private exibeDezenasComQuebraDeLinha: boolean;
	private exibeAcumuladoEspecial: boolean;
	private exibeTimeDoCoracao: boolean;
	private exibeDezenasSorteio2DuplaSena: boolean;
	private timeDoCoracao: string;
	private sufixoCssLoteriaSelecionada: string;
	private nomeDaLoteria: string;
	private estimativaDePremioParaOProximoConcurso;
	private acumuladoEspecial;
	private labelAcumuladoEspecial;
	private rgeFaixaDeConcursos: number;
	private numeroDoConcursoInicial: number;
	private numeroDoConcursoFinal: number;
	private rgeFaixaDeConcursosMin: number = 1;
	private rgeFaixaDeConcursosMax: number;
	private extensaoDaFaixaDeConcurso: number;
	private frequenciasTotaisDasDezenas = [];
	private bd;

	constructor(private nav: NavController, private menu: MenuController, private concursoDAOServico: ConcursoDAOServico) {
		super();
		this.setTitulo("Bem Vindo");

		this.bd = ConexaoFabrica.getConexao();

		this.bd.get('sessao').then((sessao) => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				this.atualizeResultados(sessao, concursoFacade, concursos.maiorNumero);
				this.rgeFaixaDeConcursos = concursos.maiorNumero;
				this.rgeFaixaDeConcursosMax = concursos.maiorNumero;
			});

			concursosPromise = concursoFacade.listeTodos(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				this.frequenciasTotaisDasDezenas = concursos.estatisticas;
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
			let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(sessao.loteria.nomeDoDocumentoNoBD);
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
				let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(sessao.loteria.nomeDoDocumentoNoBD);
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
				let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(sessao.loteria.nomeDoDocumentoNoBD);
				concursosPromise.then(concursos => {
					this.atualizeResultados(sessao, concursoFacade, this.rgeFaixaDeConcursos);
				});
			});
		}
	}

	valideSeLotofacilOuLotomania(sessao) {
		return	sessao.loteria.nomeDoDocumentoNoBD === Loterias.LOTOFACIL.nomeDoDocumentoNoBD || 
				sessao.loteria.nomeDoDocumentoNoBD === Loterias.LOTOMANIA.nomeDoDocumentoNoBD ? true : false;
	}

	valideSeDiferenteDeLotomaniaETimemania(sessao) {
		return	sessao.loteria.nomeDoDocumentoNoBD !== Loterias.LOTOMANIA.nomeDoDocumentoNoBD && 
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
			if(this.valideSeDuplaSena(sessao)) {
				this.dezenasSorteio2 = this.ordeneDezenasEmOrdemCrescente(concurso.sorteios[1].numerosSorteados);
				this.exibeDezenasSorteio2DuplaSena = true;
			} else {
				this.exibeDezenasSorteio2DuplaSena = false;
			}

			if(this.valideSeTimemania(sessao)) {
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
		});
	}
}