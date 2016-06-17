import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';

@Component({
    templateUrl: 'build/pages/historico-de-apostas/historico-de-apostas.html',
    directives: [NavBarAgS],
})
export class HistoricoDeApostasPage extends BasePage {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Histórico de Apostas");
    }
}
