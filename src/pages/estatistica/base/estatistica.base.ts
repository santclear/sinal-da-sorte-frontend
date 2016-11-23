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
	public cbxExtensaoDaFaixaDeConcursos: any;
	public extensoesDaFaixaDeConcursos: any;
	protected extensaoDaFaixaDeConcurso: number;
	protected extensaoDaFaixaDeConcursoAnterior: number;
	public numeroDoConcursoInicial: number;
	public numeroDoConcursoFinal: number;
	protected dezena: string = '01';
	protected bd: any;
	public dezenas = [];

	constructor(protected nav: NavController, protected concursoDAOServico: ConcursoDAOServico) { }

	ngAfterViewInit() {
		let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
		this.bd = ConexaoFabrica.getConexao();
		this.bd.get('sessao').then((sessao) => {
			let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(sessao.loteria.id);
			concursosPromise.then(concursos => {
				this.numeroDoConcursoInicial = concursos.maiorNumero - 10;
				this.numeroDoConcursoFinal = concursos.maiorNumero;

				this.extensoesDaFaixaDeConcursos = Loterias.FAIXA_DE_CONCURSO.extensoes;
				this.dezenas = Loterias.LOTOFACIL.dezenas;
				this.cbxExtensaoDaFaixaDeConcursos = 'id0';
				this.cbxExtensaoDaFaixaDeConcursosAtualize('id0');
				this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso + 1;
				this.rgeFaixaDeConcursosMax = this.numeroDoConcursoFinal;
				this.rgeFaixaDeConcursos = this.numeroDoConcursoFinal;

				this.atualizeOGrafico();
			});
		});
	}

	atualizeOGrafico() {
		this.bd.get('sessao').then(sessao => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let concursosPromise = concursoFacade.procurePorLoteriaIdIgualAoENumeroMaiorIgualAENumeroMenorIgualA(this.dezena, sessao.loteria.id, this.numeroDoConcursoInicial, this.numeroDoConcursoFinal);
			concursosPromise.then(concursos => {
				let rotulosDoEixoX = [];
				if (this.numeroDoConcursoInicial == concursos.numero) {
					concursoFacade.procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAENumeroMenorQue(this.dezena, sessao.loteria.id, this.numeroDoConcursoInicial).then(concursos => {
						this.renderizeEstatistica(concursos.maiorNumero, concursos, rotulosDoEixoX, this.dezena);
					});
				} else {
					this.renderizeEstatistica(undefined, concursos, rotulosDoEixoX, this.dezena);
				}
			});
		});
	}

	abstract renderizeEstatistica(maiorNumeroCallBack, concursosCallBack, rotulosDoEixoX, dezena);

	destaqueDezena(dezena) {
		let dezenaFormatada = dezena.numero;
		return dezenaFormatada == this.dezena;
	}

	selecioneDezena(iDezena) {
		let dezenaFormatada = this.dezenas[iDezena].numero;
		this.dezena = dezenaFormatada;
		this.atualizeOGrafico();
	}

	cbxTipoDeGraficoAtualize(tipoDeGrafico) {

	}

	cbxExtensaoDaFaixaDeConcursosAtualize(idExtensaoDaFaixaDeConcursos) {
		if (this.extensoesDaFaixaDeConcursos != undefined) {
			this.extensaoDaFaixaDeConcursoAnterior = this.extensaoDaFaixaDeConcurso;
			this.extensaoDaFaixaDeConcurso = this.extensoesDaFaixaDeConcursos[Number(idExtensaoDaFaixaDeConcursos.toString().replace('id', ''))].valor;
			this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso + 1;
		}

		if (this.rgeFaixaDeConcursos != undefined) {
			this.bd.get('sessao').then(sessao => {
				let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
				let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(sessao.loteria.id)
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
				});

			});
		}

		this.atualizeOGrafico();
	}

	rgeFaixaDeConcursosAtualize(concursoFinal) {
		this.numeroDoConcursoInicial = concursoFinal.value - this.extensaoDaFaixaDeConcurso;
		this.numeroDoConcursoFinal = concursoFinal.value;
	}

	rgeDesloqueParaEsquerda() {
		if (this.rgeFaixaDeConcursos > this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial--;
			this.numeroDoConcursoFinal--;
			this.rgeFaixaDeConcursos--;
			this.atualizeOGrafico();
		}
	}

	rgeDesloqueParaDireita() {
		if (this.rgeFaixaDeConcursos < this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial++;
			this.numeroDoConcursoFinal++;
			this.rgeFaixaDeConcursos++;
			this.atualizeOGrafico();
		}
	}

	rgeDesloqueParaEsquerdaEFC() {
		let subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso
		if (subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso >= this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial = this.numeroDoConcursoInicial - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursos - this.extensaoDaFaixaDeConcurso;
			this.atualizeOGrafico();
		} else {
			this.numeroDoConcursoInicial = this.rgeFaixaDeConcursosMin - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = this.rgeFaixaDeConcursosMin;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursosMin;
			this.atualizeOGrafico();
		}
	}

	rgeDesloqueParaDireitaEFC() {
		let sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso = this.numeroDoConcursoFinal + this.extensaoDaFaixaDeConcurso;
		if (sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso <= this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial = this.numeroDoConcursoInicial + this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursos + this.extensaoDaFaixaDeConcurso;
			this.atualizeOGrafico();
		} else {
			this.numeroDoConcursoInicial = this.rgeFaixaDeConcursosMax - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = this.rgeFaixaDeConcursosMax;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursosMax;
			this.atualizeOGrafico();
		}
	}
}
