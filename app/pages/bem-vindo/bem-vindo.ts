import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';
import {ConcursoFacade} from '../../dao/concurso/concurso-facade';
import {ConcursoDAOServico} from '../../dao/concurso/concurso-dao.servico';
import {EntidadeBDReceptorServico} from '../../dao/util/sincronismo/entidade-bd-receptor.servico';
import {Concursos} from '../../enum/concursos';

declare var require: any;
var hcharts = require('highcharts');
require('highcharts/modules/exporting')(hcharts);

@Component({
    templateUrl: 'build/pages/bem-vindo/bem-vindo.html',
    directives: [NavBarAgS],
    providers: [ConcursoDAOServico, EntidadeBDReceptorServico]
})
export class BemVindoPage extends BasePage {
	@ViewChild('myChart') canvas: ElementRef;

    constructor(public nav: NavController, private menu: MenuController, private concursoDAOServico: ConcursoDAOServico) {
        super();
        this.setTitulo("Bem Vindo");

        let concursoFacade = new ConcursoFacade(this.concursoDAOServico);

        concursoFacade.sincronize(Object.create(Concursos.LOTOFACIL));
		
        this.menu.open();
    }

	ngAfterViewInit() {
		var chart = hcharts.chart(this.canvas.nativeElement, {
			series: [{
				data: [1, 3, 2, 4]
			}],
		});
    }
}
