import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';

@IonicPage()
@Component({
	selector: 'pagina-fechamento',
    templateUrl: 'fechamento.html'
})
export class FechamentoPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Fechamento");
    }
}
