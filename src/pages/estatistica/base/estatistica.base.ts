import { NavController } from 'ionic-angular';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { ConcursoFacade } from '../../../dao/concurso/concurso-facade';
import { ConexaoFabrica } from '../../../dao/util/conexao-fabrica';
import { Loterias } from '../../../enum/loterias';

export abstract class EstatisticaBase {

	public cbxTipoDeGrafico: string;
	public rgeFaixaDeConcursos: number;
	public rgeFaixaDeConcursosMin: number;
	public rgeFaixaDeConcursosMax: number;
	public cbxExtensaoDaFaixaDeConcursos: number = 9;
	public extensoesDaFaixaDeConcursos: any;
	protected extensaoDaFaixaDeConcurso: number;
	protected extensaoDaFaixaDeConcursoAnterior: number;
	public numeroDoConcursoInicial: number;
	public numeroDoConcursoFinal: number;
	public sufixoCssLoteria: string;
	public rdSorteios: number = 0;
	public rdSorteiosExibido: boolean = false;
	protected dezena: string = '01';
	protected bd: any;
	public dezenas = [];

	constructor(protected nav: NavController, protected concursoDAOServico: ConcursoDAOServico) { }

	ngAfterViewInit() {
		let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
		this.bd = ConexaoFabrica.getConexao();
		this.bd.get('sessao').then((sessao) => {
			let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				this.numeroDoConcursoInicial = concursos.maiorNumero -9;
				this.numeroDoConcursoFinal = concursos.maiorNumero;
				this.extensoesDaFaixaDeConcursos = Loterias.FAIXA_DE_CONCURSO.extensoes;
				this.sufixoCssLoteria = sessao.loteria.nomeDoDocumentoNoBD;
				this.rdSorteiosExibido = this.sufixoCssLoteria === 'duplasena' ? true : false;
				this.rdSorteios = 0;
				this.dezenas = sessao.loteria.dezenas;
				this.cbxExtensaoDaFaixaDeConcursosAtualize(this.cbxExtensaoDaFaixaDeConcursos);
				this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso;
				this.rgeFaixaDeConcursosMax = this.numeroDoConcursoFinal;
				this.rgeFaixaDeConcursos = this.numeroDoConcursoFinal;

				this.atualizeOGrafico(this.rdSorteios);
			});
		});
	}

	atualizeOGrafico(numeroDoSorteio: number) {
		this.bd.get('sessao').then(sessao => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let concursosPromise = concursoFacade.procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(this.dezena, sessao.loteria.nomeDoDocumentoNoBD, this.numeroDoConcursoInicial, this.numeroDoConcursoFinal, numeroDoSorteio);
			concursosPromise.then(concursos => {
				let rotulosDoEixoX = [];
				if (this.numeroDoConcursoInicial == concursos.numero) {// FIXME Validar se está errado
					concursoFacade.procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(this.dezena, sessao.loteria.nomeDoDocumentoNoBD, this.numeroDoConcursoInicial, numeroDoSorteio).then(concursos => {
						this.renderizeEstatistica(concursos.maiorNumero, concursos, rotulosDoEixoX, this.dezena, sessao, numeroDoSorteio);
					});
				} else {
					this.renderizeEstatistica(undefined, concursos, rotulosDoEixoX, this.dezena, sessao, numeroDoSorteio);
				}
			});
		});
	}

	abstract renderizeEstatistica(maiorNumeroCallBack, concursosCallBack, rotulosDoEixoX, dezena, sessao, numeroDoSorteio);

	destaqueDezena(dezena) {
		let dezenaFormatada = dezena.numero;
		return dezenaFormatada == this.dezena;
	}

	selecioneDezena(iDezena, rdSorteios) {
		let dezenaFormatada = this.dezenas[iDezena].numero;
		this.dezena = dezenaFormatada;
		this.atualizeOGrafico(rdSorteios);
	}

	cbxTipoDeGraficoAtualize(tipoDeGrafico) {

	}

	cbxExtensaoDaFaixaDeConcursosAtualize(valorExtensaoDaFaixaDeConcursos) {
		if (this.extensoesDaFaixaDeConcursos != undefined) {
			this.extensaoDaFaixaDeConcursoAnterior = this.extensaoDaFaixaDeConcurso;
			this.extensaoDaFaixaDeConcurso = valorExtensaoDaFaixaDeConcursos;
			this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso;
		}

		if (this.rgeFaixaDeConcursos != undefined) {
			this.bd.get('sessao').then(sessao => {
				let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
				let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(sessao.loteria.nomeDoDocumentoNoBD);
				concursosPromise.then(concursos => {
					if (this.rgeFaixaDeConcursos != undefined) {
						if (this.extensaoDaFaixaDeConcurso + this.rgeFaixaDeConcursos <= concursos.maiorNumero) {
							this.numeroDoConcursoFinal = this.extensaoDaFaixaDeConcurso - this.extensaoDaFaixaDeConcursoAnterior + this.rgeFaixaDeConcursos;
							this.numeroDoConcursoInicial = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso;
							this.rgeFaixaDeConcursos = this.numeroDoConcursoFinal;
						} else {
							this.numeroDoConcursoFinal = concursos.maiorNumero;
							this.numeroDoConcursoInicial = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso;
							this.rgeFaixaDeConcursos = concursos.maiorNumero;
						}
					}
					this.atualizeOGrafico(this.rdSorteios);
				});
			});
		}
	}

	rgeFaixaDeConcursosAtualize(concursoFinal) {
		this.numeroDoConcursoInicial = concursoFinal.value - this.extensaoDaFaixaDeConcurso;
		if(this.numeroDoConcursoInicial == 0) {
			this.numeroDoConcursoInicial = 1;
			this.numeroDoConcursoFinal = concursoFinal.value +1;
			this.rgeFaixaDeConcursosMin = concursoFinal.value +1;
		} else {
			this.numeroDoConcursoFinal = concursoFinal.value;
		}
	}

	rgeDesloqueParaEsquerda() {
		if (this.rgeFaixaDeConcursos > this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial--;
			this.numeroDoConcursoFinal--;
			this.rgeFaixaDeConcursos--;
		}
	}

	rgeDesloqueParaDireita() {
		if (this.rgeFaixaDeConcursos < this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial++;
			this.numeroDoConcursoFinal++;
			this.rgeFaixaDeConcursos++;
		}
	}

	rgeDesloqueParaEsquerdaEFC() {
		let subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso
		if (subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso >= this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial = this.numeroDoConcursoInicial - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursos - this.extensaoDaFaixaDeConcurso;
		} else {
			this.numeroDoConcursoInicial = this.rgeFaixaDeConcursosMin - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = this.rgeFaixaDeConcursosMin;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursosMin;
		}
	}

	rgeDesloqueParaDireitaEFC() {
		let sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso = this.numeroDoConcursoFinal + this.extensaoDaFaixaDeConcurso;
		if (sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso <= this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial = this.numeroDoConcursoInicial + this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursos + this.extensaoDaFaixaDeConcurso;
		} else {
			this.numeroDoConcursoInicial = this.rgeFaixaDeConcursosMax - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = this.rgeFaixaDeConcursosMax;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursosMax;
		}
	}
}
