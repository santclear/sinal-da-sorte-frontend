import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';

@Component({
    templateUrl: 'build/pages/simulador/simulador.html',
    directives: [NavBarAgS],
})
export class SimuladorPage extends BasePage {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Simulador");
    }
}
