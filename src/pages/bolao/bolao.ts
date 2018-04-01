import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';

@IonicPage()
@Component({
	selector: 'pagina-bolao',
    templateUrl: 'bolao.html'
})
export class BolaoPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Bolão");
    }
}
