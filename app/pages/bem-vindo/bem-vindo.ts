import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';

@Component({
    templateUrl: 'build/pages/bem-vindo/bem-vindo.html',
    directives: [NavBarAgS],
})
export class BemVindoPage extends BasePage {

    constructor(public nav: NavController, private menu: MenuController) {
        super();
        this.setTitulo("Bem Vindo");
        this.menu.open();
    }
}
