import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';

@IonicPage()
@Component({
	selector: 'pagina-grupos-especiais',
    templateUrl: 'grupos-especiais.html'
})
export class GruposEspeciaisPage extends PaginaBase {

    constructor(public nav: NavController) {
        super();
        this.setTitulo("Grupos Especiais");
    }
}
