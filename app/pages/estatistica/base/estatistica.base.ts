import {ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ConcursoDAOServico} from '../../../dao/concurso/concurso-dao.servico';
import {LoteriaDAOServico} from '../../../dao/loteria/loteria-dao.servico';
import {ConcursoFacade} from '../../../dao/concurso/concurso-facade';
import {ConexaoFabrica} from '../../../dao/util/conexao-fabrica';
import {Loterias} from '../../../enum/loterias';
import {LoteriaFacade} from '../../../dao/loteria/loteria-facade';

export abstract class EstatisticaBase {
    @ViewChild('myChart') canvas: ElementRef;

	protected cbxTipoDeGrafico: string;
	protected rgeFaixaDeConcursos: number;
	protected rgeFaixaDeConcursosMin: number;
	protected rgeFaixaDeConcursosMax: number;
	protected cbxExtensaoDaFaixaDeConcursos: any;
	protected extensoesDaFaixaDeConcursos: any;
	protected extensaoDaFaixaDeConcurso: number;
	protected extensaoDaFaixaDeConcursoAnterior: number;
	protected numeroDoConcursoInicial: number;
	protected numeroDoConcursoFinal: number;
	protected dezena: string = '1';
	protected bd: any;
	protected dezenas = [];

    constructor(protected nav: NavController, protected concursoDAOServico: ConcursoDAOServico, protected loteriaDAOServico: LoteriaDAOServico) {
        
    }

	ngAfterViewInit() {
		let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
		this.bd = ConexaoFabrica.getConexao();
		this.bd.get('idLoteriaSelecionada').then((idLoteriaSelecionadaCallBack) => {
			concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualAo(idLoteriaSelecionadaCallBack, (concursoCallBack) => {
				this.numeroDoConcursoInicial = concursoCallBack.maior_numero - 10;
				this.numeroDoConcursoFinal = concursoCallBack.maior_numero;

				this.extensoesDaFaixaDeConcursos = Object.create(Loterias.FAIXA_DE_CONCURSO).extensoes;
				this.dezenas = Object.create(Loterias.LOTOFACIL).dezenas;
				this.cbxExtensaoDaFaixaDeConcursos = 'id0';
				this.cbxExtensaoDaFaixaDeConcursosAtualize('id0');
				this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso + 1;
				this.rgeFaixaDeConcursosMax = this.numeroDoConcursoFinal;
				this.rgeFaixaDeConcursos = this.numeroDoConcursoFinal;
			});
		});

		this.atualizeOGrafico();
    }

	atualizeOGrafico() {
		let loteriaFacade = new LoteriaFacade(this.loteriaDAOServico);
		this.bd.get('idLoteriaSelecionada').then((idLoteriaSelecionadaCallBack) => {
			loteriaFacade.procurePorIdIgualA(idLoteriaSelecionadaCallBack, (loteriaCallBack) => {
				let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
				concursoFacade.procurePorLoteriaIdIgualAoENumeroMaiorIgualAoENumeroMenorIgualAo(this.dezena, loteriaCallBack, this.numeroDoConcursoInicial, this.numeroDoConcursoFinal, (concursosCallBack) => {
					let rotulosDoEixoX = [];
					if (this.numeroDoConcursoInicial == concursosCallBack[0].numero) {
						concursoFacade.procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAoENumeroMenorQue(this.dezena, idLoteriaSelecionadaCallBack, this.numeroDoConcursoInicial, (maiorNumeroCallBack) => {
							this.renderizeEstatistica(maiorNumeroCallBack, concursosCallBack, rotulosDoEixoX, this.dezena);
						});
					} else {
						this.renderizeEstatistica(undefined, concursosCallBack, rotulosDoEixoX, this.dezena);
					}
				});
			});
		});
	}

	abstract renderizeEstatistica(maiorNumeroCallBack, concursosCallBack, rotulosDoEixoX, dezena);

	destaqueDezena(dezena) {
		let dezenaFormatada = dezena.numero.match(/0\d/) != null ? dezena.numero.substring(1) : dezena.numero;
		return dezenaFormatada == this.dezena;
	}

	selecioneDezena(iDezena) {
		let dezenaFormatada = this.dezenas[iDezena].numero.match(/0\d/) != null ? this.dezenas[iDezena].numero.substring(1) : this.dezenas[iDezena].numero;
		this.dezena = dezenaFormatada;
		// this.atualizeOGrafico();
	}

	cbxTipoDeGraficoAtualize(tipoDeGrafico) {
		console.log(tipoDeGrafico);
	}

	cbxExtensaoDaFaixaDeConcursosAtualize(idExtensaoDaFaixaDeConcursos) {
		if (this.extensoesDaFaixaDeConcursos != undefined) {
			this.extensaoDaFaixaDeConcursoAnterior = this.extensaoDaFaixaDeConcurso;
			this.extensaoDaFaixaDeConcurso = this.extensoesDaFaixaDeConcursos[Number(idExtensaoDaFaixaDeConcursos.toString().replace('id', ''))].valor;
			this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso + 1;
		}

		if (this.rgeFaixaDeConcursos != undefined) {
			this.bd.get('idLoteriaSelecionada').then((idLoteriaSelecionadaCallBack) => {
				let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
				concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualAo(idLoteriaSelecionadaCallBack, (concursoCallBack) => {
					if (this.rgeFaixaDeConcursos != undefined) {
						if (this.extensaoDaFaixaDeConcurso + this.rgeFaixaDeConcursos <= concursoCallBack.maior_numero) {
							this.numeroDoConcursoFinal = this.extensaoDaFaixaDeConcurso - this.extensaoDaFaixaDeConcursoAnterior + this.rgeFaixaDeConcursos;
							this.numeroDoConcursoInicial = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso;
							this.rgeFaixaDeConcursos = this.numeroDoConcursoFinal;
						} else {
							this.numeroDoConcursoFinal = concursoCallBack.maior_numero;
							this.numeroDoConcursoInicial = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso;
							this.rgeFaixaDeConcursos = concursoCallBack.maior_numero;
						}
					}
				});
			});
		}
	}

	rgeFaixaDeConcursosAtualize(concursoFinal) {
		this.numeroDoConcursoInicial = concursoFinal.value - this.extensaoDaFaixaDeConcurso;
		this.numeroDoConcursoFinal = concursoFinal.value;
		// this.atualizeOGrafico();
	}
}
