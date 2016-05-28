import {Page, NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';

@Page({
    templateUrl: 'build/pages/bem-vindo/bem-vindo.html',
    directives: [NavBarAgS],
})
export class BemVindoPage extends BasePage {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Bem Vindo");
    }
}
