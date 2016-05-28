import {Page, NavController} from 'ionic-angular';
import {NavBarAgS} from '../../componentes/navbar-componente';
import {BasePage} from '../base';

@Page({
    templateUrl: 'build/pages/estatistica/estatistica.html',
    directives: [NavBarAgS],
})
export class EstatisticaPage extends BasePage {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Estatística");
    }
}
