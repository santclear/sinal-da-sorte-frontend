import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar.ags';
import {PaginaBase} from '../pagina.base';

@Component({
    templateUrl: 'build/pages/grupos-especiais/grupos-especiais.html',
    directives: [NavBarAgS],
})
export class GruposEspeciaisPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Grupos Especiais");
    }
}
