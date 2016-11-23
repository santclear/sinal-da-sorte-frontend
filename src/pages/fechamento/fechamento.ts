import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PaginaBase} from '../pagina.base';

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
