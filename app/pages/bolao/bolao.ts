import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar.ags';
import {PaginaBase} from '../pagina.base';

@Component({
    templateUrl: 'build/pages/bolao/bolao.html',
    directives: [NavBarAgS],
})
export class BolaoPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Bolão");
    }
}
