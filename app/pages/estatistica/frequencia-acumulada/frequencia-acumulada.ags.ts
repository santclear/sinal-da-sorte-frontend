import {Component} from '@angular/core';
import {IONIC_DIRECTIVES, NavController} from 'ionic-angular';
import {ConcursoDAOServico} from '../../../dao/concurso/concurso-dao.servico';
import {LoteriaDAOServico} from '../../../dao/loteria/loteria-dao.servico';
import {EstatisticaBase} from '../base/estatistica.base';

declare var require: any;
var hcharts = require('highcharts');
require('highcharts/modules/exporting')(hcharts);

@Component({
	selector: "ags-frequencia-acumulada",
    templateUrl: 'build/pages/estatistica/base/estatistica.ags.html',
    directives: [IONIC_DIRECTIVES],
	providers: [ConcursoDAOServico, LoteriaDAOServico]
})
export class FrequenciaAcumuladaAgs extends EstatisticaBase {

	constructor(protected nav: NavController, protected concursoDAOServico: ConcursoDAOServico, protected loteriaDAOServico: LoteriaDAOServico) {
        super(nav, concursoDAOServico, loteriaDAOServico);
    }

	renderizeEstatistica(maiorNumeroCallBack, concursosCallBack, rotulosDoEixoX, dezena) {
		let frequencia = [];
		let acumulador = maiorNumeroCallBack != undefined ? this.numeroDoConcursoInicial - maiorNumeroCallBack.maior_numero - 1 : 0;
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