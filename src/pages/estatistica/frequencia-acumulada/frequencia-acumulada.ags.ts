import {ViewChild, ElementRef} from '@angular/core';
import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {ConcursoDAOServico} from '../../../dao/concurso/concurso-dao.servico';
import {EstatisticaBase} from '../base/estatistica.base';

declare var require: any;
var hcharts = require('highcharts');
require('highcharts/modules/exporting')(hcharts);

@Component({
	selector: 'ags-frequencia-acumulada',
    templateUrl: '../base/estatistica.ags.html'
})
export class FrequenciaAcumuladaAgs extends EstatisticaBase {
	@ViewChild('grafico') canvas: ElementRef;

	private frequencia: any = [];
	public textoExtensaoDaFaixaDeConcursos: any;
	public textoQuantidadeDeAmostrasDeFrequencia: any;
	public textoPrevisaoPositiva: any;
	public textoPrevisaoNegativa: any;
	public iptPesquisaDeAmostraFrequencia: string = "";
	public exibirQuantidadeDeAmostrasDeFrequencia: boolean = false;

	public pesquisasDeAmostraFrequencia: any = [];
	public exibirPesquisasDeAmostraFrequencia: boolean = false;
	private frequenciaAbsolutaTotal;
	private ausenciaAbsolutaTotal;
	private acumuloRemanescente;
	private ausenciaRemanescente;

	constructor(protected nav: NavController, protected concursoDAOServico: ConcursoDAOServico, protected loadingCtrl: LoadingController) {
        super(nav, concursoDAOServico, loadingCtrl);
    }

	renderizeEstatistica(maiorNumero, concursos, dezena, sessao, numeroDoSorteio) {
		let frequenciasPorConcursos = [];
		let rotulosDoEixoX = [];
		// let acumulador = maiorNumero != undefined ? this.numeroDoConcursoInicial - maiorNumero.maiorNumero - 1 : 0;
		
		this.frequenciaAbsolutaTotal = this.calculeFrequenciaAbsolutaTotal(concursos);
		this.ausenciaAbsolutaTotal = this.calculeAusenciaAbsolutaTotal(concursos);

		frequenciasPorConcursos = this.crieObjetoComPontosDoPlanoCartesiano(concursos);
		rotulosDoEixoX = this.crieObjetoComRotulosDoGrafico(concursos);
		
		this.frequencia = this.crieObjetoComFrequenciasAcumuladas(frequenciasPorConcursos);
		
		this.acumuloRemanescente = this.procurePorAcumuloRemanescente(this.frequencia);
		this.ausenciaRemanescente = this.calculeAusenciaRemanescente(this.frequencia);
		
		if(this.iptPesquisaDeAmostraFrequencia != undefined) this.atualizePesquisaDeFrequencia({target: {value: this.iptPesquisaDeAmostraFrequencia}});
		hcharts.chart(this.canvas.nativeElement, {
			title: {
				text: 'Frequência acumulada da dezena ' + dezena + ', entre o concurso ' + this.numeroDoConcursoInicial + ' e ' + this.numeroDoConcursoFinal,
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

	atualizePesquisaDeFrequencia(amostraDeFrequenciaEv) {
		let frequencia = JSON.stringify(this.frequencia).replace('[','').replace(']','');
		
		let amostraDeFrequencia = amostraDeFrequenciaEv.target.value;
		if(amostraDeFrequencia != '' && amostraDeFrequencia != undefined) {
			let tamanhoDaAmostraDeFrequencia = amostraDeFrequencia.length;
			let valorDaUtimaPosicaoDaStringAmostraDeFrequencia = amostraDeFrequencia.substring(tamanhoDaAmostraDeFrequencia - 1);
			let previsaoPositiva;
			let previsaoNegativa;
			let somaPrevisaoPositiva: number;
			
			if(valorDaUtimaPosicaoDaStringAmostraDeFrequencia == ',') {
				let valorDaPenultimaPosicaoDaStringAmostraDeFrequencia: number = amostraDeFrequencia.substring(tamanhoDaAmostraDeFrequencia - 2, tamanhoDaAmostraDeFrequencia - 1);
				somaPrevisaoPositiva = Number(valorDaPenultimaPosicaoDaStringAmostraDeFrequencia) + 1;
				previsaoPositiva = amostraDeFrequencia +''+ somaPrevisaoPositiva;
				previsaoNegativa = amostraDeFrequencia + '0';
			} else {
				somaPrevisaoPositiva = Number(valorDaUtimaPosicaoDaStringAmostraDeFrequencia) + 1;
				previsaoPositiva = amostraDeFrequencia +','+ somaPrevisaoPositiva;
				previsaoNegativa = amostraDeFrequencia + ',0';
			}
			
			let regexAmostraDeFrequencia = new RegExp("(?=("+ amostraDeFrequencia +"))", "g");
			let regexPrevisaoPositiva = new RegExp("(?=("+ previsaoPositiva +"))", "g");
			let regexPrevisaoNegativa = new RegExp("(?=("+ previsaoNegativa +"))", "g");
			let matchAmostraDeFrequencia = frequencia.match(regexAmostraDeFrequencia);
			let matchPrevisaoPositiva = frequencia.match(regexPrevisaoPositiva);
			let matchPrevisaoNegativa = frequencia.match(regexPrevisaoNegativa);

			this.textoExtensaoDaFaixaDeConcursos = '';
			this.textoQuantidadeDeAmostrasDeFrequencia = '';
			this.textoPrevisaoPositiva = '';
			this.textoPrevisaoNegativa = '';
			this.textoExtensaoDaFaixaDeConcursos = ''+ this.extensaoDaFaixaDeConcurso;

			if(matchAmostraDeFrequencia != null) this.textoQuantidadeDeAmostrasDeFrequencia = ''+ matchAmostraDeFrequencia.length;
			else this.textoQuantidadeDeAmostrasDeFrequencia = ''+ 0;
			
			if(matchPrevisaoPositiva != null) this.textoPrevisaoPositiva = ''+ matchPrevisaoPositiva.length;
			else this.textoPrevisaoPositiva = ''+ 0;
			
			if(matchPrevisaoNegativa != null) this.textoPrevisaoNegativa = ''+ matchPrevisaoNegativa.length;
			else this.textoPrevisaoNegativa = ''+ 0;
		}
	}

	ngDoCheck() {
		if(this.iptPesquisaDeAmostraFrequencia == '' || this.iptPesquisaDeAmostraFrequencia == undefined) {
			this.textoExtensaoDaFaixaDeConcursos = '';
			this.textoQuantidadeDeAmostrasDeFrequencia = '';
			this.textoPrevisaoPositiva = '';
			this.textoPrevisaoNegativa = '';
			this.exibirQuantidadeDeAmostrasDeFrequencia = false;
		} else {
			this.exibirQuantidadeDeAmostrasDeFrequencia = true;
		}
	}

	salvePesquisaDeAmostraFrequencia() {
		let pesquisaDeAmostraDeFrequencia = {
			dezena: this.dezena,
			extensaoDaFaixaDeConcurso: this.extensaoDaFaixaDeConcurso,
			amostrasDeFrequenciasEncontrada: this.textoQuantidadeDeAmostrasDeFrequencia,
			previsaoPositiva: this.textoPrevisaoPositiva,
			previsaoNegativa: this.textoPrevisaoNegativa,
			amostrasDeFrequenciasPesquisada: this.iptPesquisaDeAmostraFrequencia,
		};

		this.pesquisasDeAmostraFrequencia.push(pesquisaDeAmostraDeFrequencia);
		this.exibirPesquisasDeAmostraFrequencia = true;
	}

	excluaPesquisaDeAmostraDeFrequencia(iPesquisaDeAmostraDeFrequencia) {
		this.pesquisasDeAmostraFrequencia.splice(iPesquisaDeAmostraDeFrequencia, 1);
		if(this.pesquisasDeAmostraFrequencia.length < 1) {
			this.exibirPesquisasDeAmostraFrequencia = false;
		}
	}

	cancelePesquisaDeAmostraDeFrequencia() {
		this.exibirPesquisasDeAmostraFrequencia = false;
	}

	toggleMostreMaisEstatisticas(toggleMostrarMaisEstatisticas) {
		this.toggleMostrarMaisEstatisticasChecked = toggleMostrarMaisEstatisticas.checked;
		if(toggleMostrarMaisEstatisticas.checked) {
			this.atualizeFrequênciasDasDezenas(this.rdSorteios);
		}
	}

	atualizeFrequênciasDasDezenas(numeroDoSorteio: number) {
		let loading = this.loadingCtrl.create({
			content: 'Por favor aguarde, carregando estatísticas para sua análise...'
		});
		loading.present();
		this.bd.get('sessao').then(sessao => {
			this.frequenciasSorteio = [];
			this.dezenas.forEach((dezena, i, dezenas) => {
				let concursosPromise = this.concursoFacade.procurePorConcursosQueContenhamADezenaDentroDoIntervalo(dezena.numero, sessao.loteria.nomeDoDocumentoNoBD, this.numeroDoConcursoInicial, this.numeroDoConcursoFinal, numeroDoSorteio);
				let frequenciaPromise = this.concursoFacade.calculeFrequenciaTotalDaDezenaDentroDoIntervalo(sessao.loteria.nomeDoDocumentoNoBD, dezena.numero, numeroDoSorteio, this.numeroDoConcursoInicial, this.numeroDoConcursoFinal);
				let	ausenciaPromise = this.concursoFacade.calculeAusenciaTotalDaDezenaDentroDoIntervalo(sessao.loteria.nomeDoDocumentoNoBD, dezena.numero, numeroDoSorteio, this.numeroDoConcursoInicial, this.numeroDoConcursoFinal);	
				
				concursosPromise.then(concursos => {
					let frequenciasPorConcursos = this.crieObjetoComPontosDoPlanoCartesiano(concursos);
					let frequenciasAcumuladas = this.crieObjetoComFrequenciasAcumuladas(frequenciasPorConcursos);
					let acumuloRemanescente: number = this.procurePorAcumuloRemanescente(frequenciasAcumuladas);
					let ausenciaRemanescente: number = this.calculeAusenciaRemanescente(frequenciasAcumuladas);
					
					frequenciaPromise.then(frequencia => {
						ausenciaPromise.then(ausencia => {
							this.frequenciasSorteio.push({
								dezena: dezena.numero, 
								frequenciaTotal: frequencia.total===undefined?0:frequencia.total,
								ausenciaTotal: ausencia.total===undefined?0:ausencia.total,
								acumuloRemanescente: acumuloRemanescente,
								ausenciaRemanescente: ausenciaRemanescente
							});
						});
					});
					loading.dismiss();
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