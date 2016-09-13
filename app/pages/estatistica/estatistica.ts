import {Component} from '@angular/core';
import {NavBarAgS} from '../../componentes/navbar.ags';
import {FrequenciaAcumuladaAgs} from './frequencia-acumulada/frequencia-acumulada.ags';
import {PaginaBase} from '../pagina.base';

@Component({
    templateUrl: 'build/pages/estatistica/estatistica.html',
    directives: [NavBarAgS, FrequenciaAcumuladaAgs]
})
export class EstatisticaPage extends PaginaBase {

	constructor() {
		super();
        this.setTitulo("Estatística");
    }
}