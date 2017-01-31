import { NavController, LoadingController } from 'ionic-angular';
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
	protected numeroDoConcursoInicial: number;
	protected numeroDoConcursoFinal: number;
	public sufixoCssLoteria: string;
	public rdSorteios: number = 0;
	public isDuplasena: boolean = false;
	protected dezena: string = '01';
	protected bd: any;
	public dezenas: any = [];
	protected concursoFacade: ConcursoFacade;
	protected frequenciasSorteio: any = [];
	protected toggleMostrarMaisEstatisticasChecked: boolean = false;

	public filterQuery = "";
	public rowsOnPage = 100;
	public sortBy = "total";
	public sortOrder = "asc";

	constructor(protected nav: NavController, protected concursoDAOServico: ConcursoDAOServico, protected loadingCtrl: LoadingController) { }

	ngAfterViewInit() {
		this.concursoFacade = new ConcursoFacade(this.concursoDAOServico);
		this.bd = ConexaoFabrica.getConexao();
		this.bd.get('sessao').then((sessao) => {
			let concursosPromise = this.concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				this.numeroDoConcursoInicial = concursos.maiorNumero -9;
				this.numeroDoConcursoFinal = concursos.maiorNumero;
				this.extensoesDaFaixaDeConcursos = Loterias.FAIXA_DE_CONCURSO.extensoes;
				this.sufixoCssLoteria = sessao.loteria.nomeDoDocumentoNoBD;
				this.isDuplasena = this.sufixoCssLoteria === 'duplasena' ? true : false;
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
			let concursosPromise = this.concursoFacade.procurePorConcursosQueContenhamADezenaDentroDoIntervalo(this.dezena, sessao.loteria.nomeDoDocumentoNoBD, this.numeroDoConcursoInicial, this.numeroDoConcursoFinal, numeroDoSorteio);
			concursosPromise.then(concursos => {
				this.renderizeEstatistica(undefined, concursos, this.dezena, sessao, numeroDoSorteio);
			});
		});
		if(this.toggleMostrarMaisEstatisticasChecked) this.atualizeFrequênciasDasDezenas(this.rdSorteios);
	}

	abstract renderizeEstatistica(maiorNumeroCallBack, concursosCallBack, dezena, sessao, numeroDoSorteio);
	abstract atualizeFrequênciasDasDezenas(rdSorteios: number);

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
				let concursosPromise = this.concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
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
		this.atualizeOGrafico(this.rdSorteios);
	}

	rgeDesloqueParaDireita() {
		if (this.rgeFaixaDeConcursos < this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial++;
			this.numeroDoConcursoFinal++;
			this.rgeFaixaDeConcursos++;
		}
		this.atualizeOGrafico(this.rdSorteios);
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
		this.atualizeOGrafico(this.rdSorteios);
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
		this.atualizeOGrafico(this.rdSorteios)
	}
}
