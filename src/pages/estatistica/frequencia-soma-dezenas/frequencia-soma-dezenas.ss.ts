import { Component, ElementRef } from '@angular/core';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { EstatisticaBase } from '../base/estatistica.base';
import { EstatisticaI } from '../base/estatistica.i';
import lodash from 'lodash';

declare var require: any;
var hcharts = require('highcharts');
require('highcharts/modules/exporting')(hcharts);

@Component({
	selector: 'ss-frequencia-soma-dezenas',
    templateUrl: 'frequencia-soma-dezenas.ss.html'
})
export class FrequenciaSomaDezenasSs extends EstatisticaBase implements EstatisticaI {

	public somaDasDezenasEmCadaConcursoLoad: any = [];
	public somaDasDezenasEmCadaConcurso: any = [];
	public mediaDaSomaDasDezenasEmCadaConcurso: number;
	public quantidadesDeSomasLoad: {soma: number, quantidade: number}[] = [];
	public quantidadesDeSomas: {soma: number, quantidade: number}[] = [];
	public colsSomaDasDezenasEmCadaConcurso: any = [];
	public colsQuantidadesDeSomas: any = [];

	public filterQuery: string;
	public rowsOnPage: number;
	public sortBy: string;
	public sortOrder: string;
	public sortBy2: string;
	public sortOrder2: string;

	constructor(public concursoDAOServico: ConcursoDAOServico) {
		super(concursoDAOServico);
		this.filterQuery = '';
		this.rowsOnPage = 100;
		this.sortBy = 'soma';
		this.sortOrder = 'asc';
		this.sortBy2 = 'quantidade';
		this.sortOrder2 = 'desc';
    }

	configureEstatistica(canvas: ElementRef, concursos: any, dezena: string, sessao: any, numeroDoSorteio: number, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, dezenas: string[]): void {
		let frequenciasPorConcursos = [];
		let rotulosDoEixoX = [];

		frequenciasPorConcursos = this.crieObjetoComPontosDoPlanoCartesiano(concursos, numeroDoSorteio);
		rotulosDoEixoX = this.crieObjetoComRotulosDoGrafico(concursos);
		
		if(this.toggleMostrarMaisEstatisticasChecked) this.atualizeFrequênciasDasDezenas(dezena, numeroDoConcursoInicial, numeroDoConcursoFinal, numeroDoSorteio, dezenas);
		
		this.configureOGrafico(sessao, canvas, dezena, numeroDoSorteio, rotulosDoEixoX, frequenciasPorConcursos, numeroDoConcursoInicial, numeroDoConcursoFinal);
	}

	configureOGrafico(
		sessao: any, 
		canvas: ElementRef, 
		dezena: string, 
		numeroDoSorteio: number, 
		rotulosDoEixoX: number[], 
		frequenciasPorConcursos: { y: number, concurso: any }[], 
		numeroDoConcursoInicial: number, 
		numeroDoConcursoFinal: number): void {
		
		hcharts.chart(canvas.nativeElement, {
			title: {
				text: 'Soma das dezenas no período, entre o concurso ' + numeroDoConcursoInicial + ' e ' + numeroDoConcursoFinal,
				style: {
					color: sessao.loteria.cor.escuro,
                	fontWeight: 'bold'
				}
			},
			tooltip: {
				enabled: true,
				formatter: function () {
					let numerosSorteados = this.point.concurso.sorteios[numeroDoSorteio].numerosSorteados;
					let numerosSorteadosSplit = numerosSorteados.split(';');
					let numerosSorteadosSort = numerosSorteadosSplit.sort(function (a, b) { return a - b });

					return `<b>Data do concurso: </b>` + this.point.concurso.dataDoSorteio +
						`<br/><b>Concurso: </b>` + this.x +
						`<br/><b>Soma das dezenas: </b>` + this.y + ` (Somatório das dezenas do concurso ` + this.x + ` )` +
						`<br/><b>Números sorteados: </b>` + numerosSorteadosSort;
				}
			},
			yAxis: {
				title: {
					text: 'Soma das dezenas',
					style: {
						color: sessao.loteria.cor.escuro
					}
				},
				labels: {
					style: {
						color: sessao.loteria.cor.escuro
					}
				},
				tickInterval: 1
			},
			xAxis: {
				title: {
					text: 'Concursos da '+ sessao.loteria.nome +' | '+ rotulosDoEixoX.length +' concursos exibidos.',
					style: {
						color: sessao.loteria.cor.escuro
					}
				},
				labels: {
					style: {
						color: sessao.loteria.cor.escuro
					}
				},
				categories: rotulosDoEixoX
			},
			series: [{
				name: 'Soma das dezenas no período',
				data: frequenciasPorConcursos,
				zones: [{
					color: sessao.loteria.cor.escuro
				}]
			}],
			legend: {
				enabled: false,
				itemStyle: {
					color: sessao.loteria.cor.escuro,
					fontWeight: 'normal'
				}
        	},
			credits: {
				href: "http://www.sinaldasorte.com",
				text: "www.sinaldasorte.com"
			}
		});
	}

	atualizeFrequênciasDasDezenas(dezena: string, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, numeroDoSorteio: number, dezenas: string[]): void {
		this.bd.get('sessao').then(sessao => {
			this.somaDasDezenasEmCadaConcursoLoad = [];
			this.quantidadesDeSomasLoad = [];
			
			let somaDasDezenasPromise = this.concursoFacade.somaDasDezenas(sessao.loteria.nomeDoDocumentoNoBD, 
				numeroDoConcursoInicial, numeroDoConcursoFinal, numeroDoSorteio);
			
			somaDasDezenasPromise.then(somaDasDezenas => {
				this.mediaDaSomaDasDezenasEmCadaConcurso = somaDasDezenas.mediaDaSomaDasDezenasEmCadaConcurso;
				this.colsSomaDasDezenasEmCadaConcurso = [
					{ campo: 'concurso', nome: 'Concurso' },
					{ campo: 'soma', nome: 'Soma' },
					{ campo: 'dezenas', nome: 'Dezena' }
				];
				this.somaDasDezenasEmCadaConcurso = somaDasDezenas.somaDasDezenasEmCadaConcurso;
				this.colsQuantidadesDeSomas = [
					{ campo: 'soma', nome: 'Soma' },
					{ campo: 'quantidade', nome: 'Quantidade' }
				];
				this.quantidadesDeSomas = somaDasDezenas.quantidadesDeSomas;
			});
		});
	}

	private crieObjetoComPontosDoPlanoCartesiano(concursos: any, numeroDoSorteio: number): { y: number, concurso: any }[] {
		let frequenciasPorConcursos = [];
		for (let iConcurso = 0; iConcurso < concursos.length; iConcurso++) {
			let dezenas = concursos[iConcurso].sorteios[numeroDoSorteio].numerosSorteados.split(';').map(Number);
			let somaDezenas: number = lodash.sum(dezenas);
			
			frequenciasPorConcursos.push({ y: somaDezenas, concurso: concursos[iConcurso] });
		}

		return frequenciasPorConcursos;
	}

	private crieObjetoComRotulosDoGrafico(concursos: any): number[] {
		let rotulosDoEixoX = [];

		for (let iConcurso = 0; iConcurso < concursos.length; iConcurso++) {
			rotulosDoEixoX.push(concursos[iConcurso].numero);
		}

		return rotulosDoEixoX;
	}
}