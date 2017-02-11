import { Component, ElementRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { EstatisticaBase } from '../base/estatistica.base';
import { EstatisticaI } from '../base/estatistica.i';
import lodash from 'lodash';

declare var require: any;
var hcharts = require('highcharts');
require('highcharts/modules/exporting')(hcharts);

@Component({
	selector: 'ags-frequencia-soma-dezenas',
    templateUrl: 'frequencia-soma-dezenas.ags.html'
})
export class FrequenciaSomaDezenasAgs extends EstatisticaBase implements EstatisticaI {

	private frequencia: number[] = [];

	private exibirPesquisasDeAmostraFrequencia: boolean = false;
	private frequenciaAbsolutaTotal: number;
	private ausenciaAbsolutaTotal: number;
	private acumuloRemanescente: number;
	private ausenciaRemanescente: number;

	private frequenciasSorteio: any = [];

	private filterQuery: string = '';
	private rowsOnPage: number = 100;
	private sortBy: string = 'total';
	private sortOrder: string = 'asc';

	constructor(public concursoDAOServico: ConcursoDAOServico, public loadingCtrl: LoadingController) {
		super(concursoDAOServico, loadingCtrl);
    }

	configureEstatistica(canvas: ElementRef, concursos: any, dezena: string, sessao: any, numeroDoSorteio: number, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, dezenas: string[]): void {
		let frequenciasPorConcursos = [];
		let rotulosDoEixoX = [];
		
		this.frequenciaAbsolutaTotal = this.calculeFrequenciaAbsolutaTotal(concursos);
		this.ausenciaAbsolutaTotal = this.calculeAusenciaAbsolutaTotal(concursos);

		frequenciasPorConcursos = this.crieObjetoComPontosDoPlanoCartesiano(concursos);
		rotulosDoEixoX = this.crieObjetoComRotulosDoGrafico(concursos);
		
		this.frequencia = this.crieObjetoComFrequenciasAcumuladas(frequenciasPorConcursos);
		
		this.acumuloRemanescente = this.procurePorAcumuloRemanescente(this.frequencia);
		this.ausenciaRemanescente = this.calculeAusenciaRemanescente(this.frequencia);
		
		// if(this.toggleMostrarMaisEstatisticasChecked) this.atualizeFrequênciasDasDezenas(dezena, numeroDoConcursoInicial, numeroDoConcursoFinal, numeroDoSorteio, dezenas);
		// if(this.iptPesquisaDeAmostraFrequencia != undefined) this.atualizePesquisaDeFrequencia({target: {value: this.iptPesquisaDeAmostraFrequencia}});
		
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
					text: 'Soma das dezenas no período',
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
		});
	}

	atualizeFrequênciasDasDezenas(dezena: string, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, numeroDoSorteio: number, dezenas: string[]): void {
		let loading = this.loadingCtrl.create({
			content: 'Por favor aguarde, carregando estatísticas para sua análise...'
		});
		loading.present();
		this.bd.get('sessao').then(sessao => {
			this.frequenciasSorteio = [];
			dezenas.forEach((dezena, i, dezenas) => {
				let concursosPromise = this.concursoFacade.procurePorConcursosQueContenhamADezenaDentroDoIntervalo(dezena, sessao.loteria.nomeDoDocumentoNoBD, numeroDoConcursoInicial, numeroDoConcursoFinal, numeroDoSorteio);
				let frequenciaPromise = this.concursoFacade.calculeFrequenciaTotalDaDezenaDentroDoIntervalo(sessao.loteria.nomeDoDocumentoNoBD, dezena, numeroDoSorteio, numeroDoConcursoInicial, numeroDoConcursoFinal);
				let	ausenciaPromise = this.concursoFacade.calculeAusenciaTotalDaDezenaDentroDoIntervalo(sessao.loteria.nomeDoDocumentoNoBD, dezena, numeroDoSorteio, numeroDoConcursoInicial, numeroDoConcursoFinal);	
				
				concursosPromise.then(concursos => {
					let frequenciasPorConcursos = this.crieObjetoComPontosDoPlanoCartesiano(concursos);
					let frequenciasAcumuladas = this.crieObjetoComFrequenciasAcumuladas(frequenciasPorConcursos);
					let acumuloRemanescente: number = this.procurePorAcumuloRemanescente(frequenciasAcumuladas);
					let ausenciaRemanescente: number = this.calculeAusenciaRemanescente(frequenciasAcumuladas);
					
					frequenciaPromise.then(frequencia => {
						ausenciaPromise.then(ausencia => {
							this.frequenciasSorteio.push({
								dezena: dezena, 
								frequenciaTotal: frequencia.total===undefined?0:frequencia.total,
								ausenciaTotal: ausencia.total===undefined?0:ausencia.total,
								acumuloRemanescente: acumuloRemanescente,
								ausenciaRemanescente: ausenciaRemanescente
							});
							if(i == dezenas.length - 1) loading.dismiss();
						});
					});
				});
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
		let frequenciasPorConcursos = [];
		for (let iConcurso = 0; iConcurso < concursos.length; iConcurso++) {
			let dezenas = concursos[iConcurso].sorteios[0].numerosSorteados.split(';').map(Number);
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

	private crieObjetoComFrequenciasAcumuladas(frequenciasPorConcursos): number[] {
		let frequencia = [];
		
		frequenciasPorConcursos.forEach(frequenciaPorConcurso => {
			frequencia.push(frequenciaPorConcurso.y);
		});

		return frequencia;
	}

	private procurePorAcumuloRemanescente(frequenciasAcumuladas): number {
		let acumuloRemanescente: number = 0;
		
		for(let i = frequenciasAcumuladas.length - 1; i >= 0; i--) {
			if(frequenciasAcumuladas[i] !== 0) {
				acumuloRemanescente = frequenciasAcumuladas[i];
			}
			break;
		}

		return acumuloRemanescente;
	}

	private calculeAusenciaRemanescente(frequenciasAcumuladas): number {
		let ausenciaRemanescente: number = 0;

		for(let i = frequenciasAcumuladas.length - 1; i >= 0; i--) {
			if(frequenciasAcumuladas[i] === 0) {
				ausenciaRemanescente++;
			} else {
				break;
			}
		}

		return ausenciaRemanescente;
	}
}