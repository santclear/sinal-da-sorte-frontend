import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PaginaBase} from '../pagina.base';

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
