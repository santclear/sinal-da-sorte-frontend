import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {ConcursoDAOServico} from '../../dao/concurso/concurso-dao.servico';
import {LoteriaDAOServico} from '../../dao/loteria/loteria-dao.servico';
import {BasePage} from '../base';
import {NavController} from 'ionic-angular';
import {ConcursoFacade} from '../../dao/concurso/concurso-facade';
import {ConexaoFabrica} from '../../dao/util/conexao-fabrica';
import {LoteriaFacade} from '../../dao/loteria/loteria-facade';

declare var require: any;
var hcharts = require('highcharts');
require('highcharts/modules/exporting')(hcharts);

@Component({
    templateUrl: 'build/pages/estatistica/estatistica.html',
    directives: [NavBarAgS],
	providers: [ConcursoDAOServico, LoteriaDAOServico]
})
export class EstatisticaPage extends BasePage {
    @ViewChild('myChart') canvas: ElementRef;
	private numeroDoConcursoInicial: number;
	private numeroDoConcursoFinal: number;
	private dezena: string = '1';
	private bd: any;

    constructor(public nav: NavController, private concursoDAOServico: ConcursoDAOServico, private loteriaDAOServico: LoteriaDAOServico) {
        super();
        this.setTitulo("Estatística");
    }

	ngAfterViewInit() {
		let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
		this.bd = ConexaoFabrica.getConexao();
		this.bd.get('idLoteriaSelecionada').then((idLoteriaSelecionadaCallBack) => {
			concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualAo(idLoteriaSelecionadaCallBack, (concursoCallBack) => {
				this.numeroDoConcursoInicial = concursoCallBack.maior_numero - 10;
				this.numeroDoConcursoFinal = concursoCallBack.maior_numero;
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
							this.renderizeFrequenciaAcumulada(maiorNumeroCallBack, concursosCallBack, rotulosDoEixoX, this.dezena);
						});
					} else {
						this.renderizeFrequenciaAcumulada(undefined, concursosCallBack, rotulosDoEixoX, this.dezena);
					}
				});
			});
		});
	}

	renderizeFrequenciaAcumulada(maiorNumeroCallBack, concursosCallBack, rotulosDoEixoX, dezena) {
		let frequencia = [];
		let acumulador = maiorNumeroCallBack != undefined? this.numeroDoConcursoInicial - maiorNumeroCallBack.maior_numero - 1: 0;
		let iConcurso = 0;

		for (let iConcurso = 0; iConcurso < concursosCallBack.length; iConcurso++) {
			if (concursosCallBack[iConcurso][0].dezena_encontrada == 'sim') {
				acumulador++;
			} else {
				acumulador = 0;
			}
			frequencia.push({ y: acumulador, concurso: concursosCallBack[iConcurso][0] });
			rotulosDoEixoX.push(concursosCallBack[iConcurso][0].numero)
		}
		var chart = hcharts.chart(this.canvas.nativeElement, {
			chart: {
				zoomType: 'x',
				events: {
					load: function () {
						var self = this;
						setTimeout(function () {
							self.reflow();
						}, 100)
					}
				}
			},
			title: {
				text: 'Frequência acumulada da dezena ' + dezena + ', entre o concurso ' + this.numeroDoConcursoInicial + ' e ' + this.numeroDoConcursoFinal
			},
			tooltip: {
				formatter: function () {
					return `<b>Data do concurso: </b>` + this.point.concurso.dataDoSorteio +
						`<br/><b>Concurso: </b>` + this.x +
						`<br/><b>Frequência acumulada: </b>` + this.y + ` (Quantidade de vezes consecutivas que o número ` + dezena + ` foi sorteado)` +
						`<br/><b>Números sorteados: </b>` + this.point.concurso.numerosSorteados;
				}
			},
			yAxis: {
				title: {
					text: 'Frequência acumulada'
				},
				tickInterval: 1
			},
			xAxis: {
				title: {
					text: 'Concursos'
				},
				categories: rotulosDoEixoX
			},
			series: [{
				name: 'Frequência acumulada da dezena ' + dezena,
				data: frequencia
			}],
		});
	}
}
