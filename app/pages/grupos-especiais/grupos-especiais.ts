import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';

@Component({
    templateUrl: 'build/pages/grupos-especiais/grupos-especiais.html',
    directives: [NavBarAgS],
})
export class GruposEspeciaisPage extends BasePage {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Grupos Especiais");
    }
}
