import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar.ags';
import {PaginaBase} from '../pagina.base';

@Component({
    templateUrl: 'build/pages/historico-de-apostas/historico-de-apostas.html',
    directives: [NavBarAgS],
})
export class HistoricoDeApostasPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Histórico de Apostas");
    }
}
