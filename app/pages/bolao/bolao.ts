import {Page, NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';

@Page({
    templateUrl: 'build/pages/bolao/bolao.html',
    directives: [NavBarAgS],
})
export class BolaoPage extends BasePage {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Bolão");
    }
}
