import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {PaginaBase} from '../pagina.base';

@Component({
	selector: 'pagina-bem-vindo',
    templateUrl: 'bem-vindo.html'
})
export class BemVindoPage extends PaginaBase {

    constructor(public nav: NavController, private menu: MenuController) {
        super();
        this.setTitulo("Bem Vindo");
		
        this.menu.open();
    }
}
