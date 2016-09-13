import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar.ags';
import {PaginaBase} from '../pagina.base';

@Component({
    templateUrl: 'build/pages/fechamento/fechamento.html',
    directives: [NavBarAgS],
})
export class FechamentoPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Fechamento");
    }
}
