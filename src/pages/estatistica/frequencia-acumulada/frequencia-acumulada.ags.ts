import { Component, ElementRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { EstatisticaBase } from '../base/estatistica.base';
import { EstatisticaI } from '../base/estatistica.i';

declare var require: any;
var hcharts = require('highcharts');
require('highcharts/modules/exporting')(hcharts);

@Component({
	selector: 'ags-frequencia-acumulada',
    templateUrl: 'frequencia-acumulada.ags.html'
})
export class FrequenciaAcumuladaAgs extends EstatisticaBase implements EstatisticaI {

	public frequencia: number[] = [];
	
	public frequenciaAbsolutaTotal: number;
	public ausenciaAbsolutaTotal: number;
	public acumuloRemanescente: number;
	public ausenciaRemanescente: number;

	public frequenciasSorteio: any = [];

	public filterQuery: string;
	public rowsOnPage: number;
	public sortBy: string;
	public sortOrder: string;

	constructor(public concursoDAOServico: ConcursoDAOServico, public loadingCtrl: LoadingController) {
		super(concursoDAOServico, loadingCtrl);
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
		
		this.frequencia = this.crieObjetoComFrequenciasAcumuladas(frequenciasPorConcursos);
		
		this.acumuloRemanescente = this.procurePorAcumuloRemanescente(this.frequencia);
		this.ausenciaRemanescente = this.calculeAusenciaRemanescente(this.frequencia);
		
		if(this.toggleMostrarMaisEstatisticasChecked) this.atualizeFrequênciasDasDezenas(dezena, numeroDoConcursoInicial, numeroDoConcursoFinal, numeroDoSorteio, dezenas);
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

	private crieObjetoComFrequenciasAcumuladas(frequenciasPorConcursos: { y: number, concurso: any }[]): number[] {
		let frequencia: number[] = [];
		
		frequenciasPorConcursos.forEach(frequenciaPorConcurso => {
			frequencia.push(frequenciaPorConcurso.y);
		});

		return frequencia;
	}

	private procurePorAcumuloRemanescente(frequenciasAcumuladas: number[]): number {
		let acumuloRemanescente: number = 0;
		
		for(let i = frequenciasAcumuladas.length - 1; i >= 0; i--) {
			if(frequenciasAcumuladas[i] !== 0) {
				acumuloRemanescente = frequenciasAcumuladas[i];
			}
			break;
		}

		return acumuloRemanescente;
	}

	private calculeAusenciaRemanescente(frequenciasAcumuladas: number[]): number {
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

	// atualizePesquisaDeFrequencia(amostraDeFrequenciaEv) {
	// 	let frequencia = JSON.stringify(this.frequencia).replace('[','').replace(']','');
		
	// 	let amostraDeFrequencia = amostraDeFrequenciaEv.target.value;
	// 	if(amostraDeFrequencia != '' && amostraDeFrequencia != undefined) {
	// 		let tamanhoDaAmostraDeFrequencia = amostraDeFrequencia.length;
	// 		let valorDaUtimaPosicaoDaStringAmostraDeFrequencia = amostraDeFrequencia.substring(tamanhoDaAmostraDeFrequencia - 1);
	// 		let previsaoPositiva;
	// 		let previsaoNegativa;
	// 		let somaPrevisaoPositiva: number;
			
	// 		if(valorDaUtimaPosicaoDaStringAmostraDeFrequencia == ',') {
	// 			let valorDaPenultimaPosicaoDaStringAmostraDeFrequencia: number = amostraDeFrequencia.substring(tamanhoDaAmostraDeFrequencia - 2, tamanhoDaAmostraDeFrequencia - 1);
	// 			somaPrevisaoPositiva = Number(valorDaPenultimaPosicaoDaStringAmostraDeFrequencia) + 1;
	// 			previsaoPositiva = amostraDeFrequencia +''+ somaPrevisaoPositiva;
	// 			previsaoNegativa = amostraDeFrequencia + '0';
	// 		} else {
	// 			somaPrevisaoPositiva = Number(valorDaUtimaPosicaoDaStringAmostraDeFrequencia) + 1;
	// 			previsaoPositiva = amostraDeFrequencia +','+ somaPrevisaoPositiva;
	// 			previsaoNegativa = amostraDeFrequencia + ',0';
	// 		}
			
	// 		let regexAmostraDeFrequencia = new RegExp("(?=("+ amostraDeFrequencia +"))", "g");
	// 		let regexPrevisaoPositiva = new RegExp("(?=("+ previsaoPositiva +"))", "g");
	// 		let regexPrevisaoNegativa = new RegExp("(?=("+ previsaoNegativa +"))", "g");
	// 		let matchAmostraDeFrequencia = frequencia.match(regexAmostraDeFrequencia);
	// 		let matchPrevisaoPositiva = frequencia.match(regexPrevisaoPositiva);
	// 		let matchPrevisaoNegativa = frequencia.match(regexPrevisaoNegativa);

	// 		this.textoExtensaoDaFaixaDeConcursos = '';
	// 		this.textoQuantidadeDeAmostrasDeFrequencia = '';
	// 		this.textoPrevisaoPositiva = '';
	// 		this.textoPrevisaoNegativa = '';
	// 		this.textoExtensaoDaFaixaDeConcursos = ''+ this.extensaoDaFaixaDeConcurso;

	// 		if(matchAmostraDeFrequencia != null) this.textoQuantidadeDeAmostrasDeFrequencia = ''+ matchAmostraDeFrequencia.length;
	// 		else this.textoQuantidadeDeAmostrasDeFrequencia = ''+ 0;
			
	// 		if(matchPrevisaoPositiva != null) this.textoPrevisaoPositiva = ''+ matchPrevisaoPositiva.length;
	// 		else this.textoPrevisaoPositiva = ''+ 0;
			
	// 		if(matchPrevisaoNegativa != null) this.textoPrevisaoNegativa = ''+ matchPrevisaoNegativa.length;
	// 		else this.textoPrevisaoNegativa = ''+ 0;
	// 	}
	// }

	// salvePesquisaDeAmostraFrequencia() {
	// 	let pesquisaDeAmostraDeFrequencia = {
	// 		dezena: this.dezena,
	// 		extensaoDaFaixaDeConcurso: this.extensaoDaFaixaDeConcurso,
	// 		amostrasDeFrequenciasEncontrada: this.textoQuantidadeDeAmostrasDeFrequencia,
	// 		previsaoPositiva: this.textoPrevisaoPositiva,
	// 		previsaoNegativa: this.textoPrevisaoNegativa,
	// 		amostrasDeFrequenciasPesquisada: this.iptPesquisaDeAmostraFrequencia,
	// 	};

	// 	this.pesquisasDeAmostraFrequencia.push(pesquisaDeAmostraDeFrequencia);
	// 	this.exibirPesquisasDeAmostraFrequencia = true;
	// }

	// excluaPesquisaDeAmostraDeFrequencia(iPesquisaDeAmostraDeFrequencia) {
	// 	this.pesquisasDeAmostraFrequencia.splice(iPesquisaDeAmostraDeFrequencia, 1);
	// 	if(this.pesquisasDeAmostraFrequencia.length < 1) {
	// 		this.exibirPesquisasDeAmostraFrequencia = false;
	// 	}
	// }

	// cancelePesquisaDeAmostraDeFrequencia() {
	// 	this.exibirPesquisasDeAmostraFrequencia = false;
	// }
}