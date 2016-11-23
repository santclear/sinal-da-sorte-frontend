import {Component} from '@angular/core';
import {PaginaBase} from '../pagina.base';

@Component({
	selector: 'pagina-estatistica',
    templateUrl: 'estatistica.html'
})
export class EstatisticaPage extends PaginaBase {

	constructor() {
		super();
        this.setTitulo("Estatística");
    }
}