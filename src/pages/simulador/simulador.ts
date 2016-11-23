import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PaginaBase} from '../pagina.base';

@Component({
	selector: 'pagina-simulador',
    templateUrl: 'simulador.html'
})
export class SimuladorPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Simulador");
    }
}
