import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';
import {CHART_DIRECTIVES} from 'angular2-highcharts';
import {Highcharts} from 'angular2-highcharts/dist/Highcharts';

@Component({
    templateUrl: 'build/pages/estatistica/estatistica.html',
    directives: [NavBarAgS, CHART_DIRECTIVES],
})
export class EstatisticaPage extends BasePage {
    private options: Object;

    constructor(public nav: NavController) {
        super();
    }
	ngAfterViewInit() {
		this.setTitulo("Estatística");

        this.options = {
			title: { text: 'Frequência' },
			series: [{
				data: [29.9, 71.5, 106.4, 129.2],
			}]
        };
	}
}
