import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';

@Component({
    templateUrl: 'build/pages/aposta/aposta.html',
    directives: [NavBarAgS],
})
export class ApostaPage extends BasePage {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Aposta");
    }
}
