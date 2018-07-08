import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';
import { StorageService } from '../../services/storage.service';
import { ContaLocalDTO } from '../../dtos/conta-local.dto';

@IonicPage()
@Component({
	selector: 'pagina-aposta',
    templateUrl: 'aposta.html'
})
export class ApostaPage extends PaginaBase {

    constructor(public navCtrl: NavController, public storage: StorageService) {
        super();
        this.setTitulo("Aposta");
    }

    ionViewDidEnter() {
		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		if(!contaLocal) this.navCtrl.setRoot('ContaExternoPage');
	}
}
