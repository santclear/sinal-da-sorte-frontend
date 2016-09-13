import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar.ags';
import {PaginaBase} from '../pagina.base';

@Component({
    templateUrl: 'build/pages/simulador/simulador.html',
    directives: [NavBarAgS],
})
export class SimuladorPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Simulador");
    }
}
