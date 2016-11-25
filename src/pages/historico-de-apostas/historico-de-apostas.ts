import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PaginaBase} from '../pagina.base';

@Component({
	selector: 'pagina-historico-de-apostas',
    templateUrl: 'historico-de-apostas.html'
})
export class HistoricoDeApostasPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Histórico de Apostas");
    }
}