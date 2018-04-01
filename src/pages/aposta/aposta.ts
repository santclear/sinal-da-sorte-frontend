import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';

@IonicPage()
@Component({
	selector: 'pagina-aposta',
    templateUrl: 'aposta.html'
})
export class ApostaPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Aposta");
    }
}
