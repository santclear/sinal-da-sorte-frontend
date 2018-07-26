import { Component, ElementRef } from '@angular/core';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { EstatisticaBase } from '../base/estatistica.base';
import { EstatisticaI } from '../base/estatistica.i';
import { FrequenciaDezenaDto } from '../dto/frequencia-dezena-dto';
import { InterstitialAdMobService } from '../../../services/interstitial-admob.service';

declare var require: any;
var hcharts = require('highcharts');
require('highcharts/modules/exporting')(hcharts);

@Component({
	selector: 'ss-frequencia-acumulada',
    templateUrl: 'frequencia-acumulada.ss.html'
})
export class FrequenciaAcumuladaSs extends EstatisticaBase implements EstatisticaI {

	public frequencia: number[] = [];
	
	public frequenciaAbsolutaTotal: number;
	public ausenciaAbsolutaTotal: number;
	public acumuloRemanescente: number;
	public ausenciaRemanescente: number;

	public frequenciasSorteio: FrequenciaDezenaDto[] = [];
	public cols: any = [];

	public filterQuery: string;
	public rowsOnPage: number;
	public sortBy: string;

	constructor(public concursoDAOServico: ConcursoDAOServico, public interstitialAdMobService: InterstitialAdMobService) {
		super(concursoDAOServico, interstitialAdMobService);
		this.sortOptions = [
			{label: 'Dezena - menor/maior', value: 'dezena'},
			{label: 'Dezena - maior/menor', value: '!dezena'},
			{label: 'Frequência total - menor/maior', value: 'frequenciaTotal'},
			{label: 'Frequência total - maior/menor', value: '!frequenciaTotal'},
			{label: 'Ausência total - menor/maior', value: 'ausenciaTotal'},
			{label: 'Ausência total - maior/menor', value: '!ausenciaTotal'},
			{label: 'Últimas frequências - menor/maior', value: 'acumuloRemanescente'},
			{label: 'Últimas frequências - maior/menor', value: '!acumuloRemanescente'},
			{label: 'Últimas ausências - menor/maior', value: 'ausenciaRemanescente'},
			{label: 'Últimas ausências - maior/menor', value: '!ausenciaRemanescente'},
        ];
		this.filterQuery = '';
		this.rowsOnPage = 100;
		this.sortBy = 'frequenciaTotal';
		this.sortOrder = 'desc';
	}

	destaqueDezena(dezenaSelecionada: string): boolean {
		return dezenaSelecionada == this.dezena;
	}

	selecioneDezena(iDezena: number, rdSorteios: number): void {
		this.dezena = this.dezenas[iDezena];
		this.atualizeOGrafico({
			canvas: this.canvas,
			dezena: this.dezena, 
			numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
			rdSorteios: rdSorteios,
			dezenas: this.dezenas});
	}

	configureEstatistica(canvas: ElementRef, concursos: any, dezena: string, sessao: any, numeroDoSorteio: number, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, dezenas: string[]): void {
		let frequenciasPorConcursos: { y: number, concurso: any }[] = [];
		let rotulosDoEixoX: number[] = [];
		
		this.frequenciaAbsolutaTotal = this.calculeFrequenciaAbsolutaTotal(concursos);
		this.ausenciaAbsolutaTotal = this.calculeAusenciaAbsolutaTotal(concursos);

		frequenciasPorConcursos = this.crieObjetoComPontosDoPlanoCartesiano(concursos);
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
				text: 'Frequência acumulada da dezena ' + dezena + ', entre o concurso ' + numeroDoConcursoInicial + ' e ' + numeroDoConcursoFinal,
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
						`<br/><b>Frequência acumulada: </b>` + this.y + ` (Quantidade de vezes consecutivas que o número ` + dezena + ` foi sorteado)` +
						`<br/><b>Números sorteados: </b>` + numerosSorteadosSort;
				}
			},
			yAxis: {
				title: {
					text: 'Frequência acumulada',
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
				name: 'Frequência acumulada da dezena ' + dezena,
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
			exporting:{
				filename: sessao.loteria.nomeDoDocumentoNoBD+'-freq-da-dez-'+dezena+'-conc-'+numeroDoConcursoInicial+'-a-'+numeroDoConcursoFinal
			},
			lang: {
				downloadCSV: 'Download CSV',
				downloadJPEG: 'Download JPEG',
				downloadPDF: 'Download PDF',
				downloadPNG: 'Download PNG',
				downloadSVG: 'Download SVG',
				downloadXLS: 'Download XLS',
				loading: 'Carregando...',
				printChart: 'Imprimir gráfico',
				contextButtonTitle: 'Menu do gráfico'
			},
			credits: {
				href: "http://www.sinaldasorte.com.br",
				text: "www.sinaldasorte.com.br"
			}
		});
	}

	atualizeFrequênciasDasDezenas(dezena: string, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, numeroDoSorteio: number, dezenas: string[]): void {
		this.bd.get('sessao').then(sessao => {			

			let frequenciaDasDezenasPromise = this.concursoFacade.frequenciaDasDezenas(sessao.loteria.dezenas, sessao.loteria.nomeDoDocumentoNoBD, 
				numeroDoConcursoInicial, numeroDoConcursoFinal, numeroDoSorteio);

			frequenciaDasDezenasPromise.then(frequenciaDasDezenas => {
				this.cols = [
					{ campo: 'dezena', nome: 'Dezena' },
					{ campo: 'frequenciaTotal', nome: 'Frequência total' },
					{ campo: 'ausenciaTotal', nome: 'Ausência total' },
					{ campo: 'acumuloRemanescente', nome: 'Últimas frequências' },
					{ campo: 'ausenciaRemanescente', nome: 'Últimas ausências' }
				];

				this.frequenciasSorteio = frequenciaDasDezenas;
			});
		});
	}

	private calculeFrequenciaAbsolutaTotal(concursos: any): number {
		let frequenciaAbsolutaTotal: number = 0;
		for (let iConcurso = 0; iConcurso < concursos.length; iConcurso++) {
			if (concursos[iConcurso].dezenaEncontrada === 'sim') frequenciaAbsolutaTotal++;
		}

		return frequenciaAbsolutaTotal;
	}

	private calculeAusenciaAbsolutaTotal(concursos: any): number {
		let ausenciaAbsolutaTotal: number = 0;
		for (let iConcurso = 0; iConcurso < concursos.length; iConcurso++) {
			if (concursos[iConcurso].dezenaEncontrada !== 'sim') ausenciaAbsolutaTotal++;
		}

		return ausenciaAbsolutaTotal;
	}

	private crieObjetoComPontosDoPlanoCartesiano(concursos: any): { y: number, concurso: any }[] {
		let frequenciasPorConcursos: { y: number, concurso: any }[] = [];
		let acumulador = 0;
		for (let iConcurso = 0; iConcurso < concursos.length; iConcurso++) {
			if (concursos[iConcurso].dezenaEncontrada == 'sim') {
				acumulador++;
			} else {
				acumulador = 0;
			}
			frequenciasPorConcursos.push({ y: acumulador, concurso: concursos[iConcurso] });
		}

		return frequenciasPorConcursos;
	}

	private crieObjetoComRotulosDoGrafico(concursos: any): number[] {
		let rotulosDoEixoX: number[] = [];

		for (let iConcurso = 0; iConcurso < concursos.length; iConcurso++) {
			rotulosDoEixoX.push(concursos[iConcurso].numero);
		}

		return rotulosDoEixoX;
	}
}