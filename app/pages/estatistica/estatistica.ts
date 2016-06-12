import {Page, NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';
import {CHART_DIRECTIVES} from 'angular2-highcharts';

@Page({
    templateUrl: 'build/pages/estatistica/estatistica.html',
    directives: [NavBarAgS, CHART_DIRECTIVES],
})
export class EstatisticaPage extends BasePage {
    private options: Object;
    
    constructor(public nav: NavController) {
        super();
        this.setTitulo("Estatística");

        this.options = {
           title: { text: 'simple chart' },
           series: [{
               data: [29.9, 71.5, 106.4, 129.2],
           }]
        };
    }
}
