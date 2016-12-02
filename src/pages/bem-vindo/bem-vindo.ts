import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {PaginaBase} from '../pagina.base';

@Component({
	selector: 'pagina-bem-vindo',
    templateUrl: 'bem-vindo.html'
})
export class BemVindoPage extends PaginaBase {
	public dezenas;
	public exibeDezenasComQuebraDeLinha: boolean;

    constructor(public nav: NavController, private menu: MenuController) {
        super();
        this.setTitulo("Bem Vindo");
		
		this.exibeDezenasComQuebraDeLinha = true;

		this.dezenas = [
			{numero: '01'},{numero: '02'},{numero: '03'},{numero: '04'},{numero: '05'},
			{numero: '06'},{numero: '07'},{numero: '08'},{numero: '09'},{numero: '10'},
			{numero: '11'},{numero: '12'},{numero: '13'},{numero: '14'},{numero: '15'},
		];


        // this.menu.open();

		
    }
}
