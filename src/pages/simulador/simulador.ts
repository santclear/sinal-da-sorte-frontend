import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';
import { StorageService } from '../../services/storage.service';
import { ContaLocalDTO } from '../../dtos/conta-local.dto';

@IonicPage()
@Component({
	selector: 'pagina-simulador',
    templateUrl: 'simulador.html'
})
export class SimuladorPage extends PaginaBase {

    constructor(public navCtrl: NavController, public storage: StorageService) {
        super();
        this.setTitulo("Simulador");
    }

    ionViewDidEnter() {
		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		if(!contaLocal) this.navCtrl.setRoot('ContaExternoPage');
	}
}
