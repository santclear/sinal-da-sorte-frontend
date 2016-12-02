import {ViewChild, ElementRef} from '@angular/core';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
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

	constructor(protected nav: NavController, protected concursoDAOServico: ConcursoDAOServico) {
        super(nav, concursoDAOServico);
    }

	renderizeEstatistica(maiorNumeroCallBack, concursosCallBack, rotulosDoEixoX, dezena, sessao, numeroDoSorteio) {
		let frequenciasPorConcursos = [];
		let acumulador = maiorNumeroCallBack != undefined ? this.numeroDoConcursoInicial - maiorNumeroCallBack.maiorNumero - 1 : 0;
		for (let iConcurso = 0; iConcurso < concursosCallBack.length; iConcurso++) {
			if (concursosCallBack[iConcurso].dezenaEncontrada == 'sim') {
				acumulador++;
			} else {
				acumulador = 0;
			}
			frequenciasPorConcursos.push({ y: acumulador, concurso: concursosCallBack[iConcurso] });
			rotulosDoEixoX.push(concursosCallBack[iConcurso].numero)
		}
		
		this.frequencia = [];
		frequenciasPorConcursos.forEach(frequenciaPorConcurso => {
			this.frequencia.push(frequenciaPorConcurso.y);
		});
		
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
		
		if(amostraDeFrequenciaEv.target.value != '') {
			let amostraDeFrequencia = amostraDeFrequenciaEv.target.value;
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
}