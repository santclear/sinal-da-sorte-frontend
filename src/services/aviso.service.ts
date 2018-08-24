import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import { StorageService } from "./storage.service";

@Injectable()
export class AvisoService {
    public exibeAviso: boolean;

	constructor(public plataforma: Platform, public storage: StorageService) {
		if(!this.plataforma.is('android')) {
            this.consomeCredito();
		}
	}

    consomeCredito() {
		if(!this.plataforma.is('android')) {
			let contadorStr: string = this.storage.getContadorAnuncio();
			let contador;
			if(contadorStr === null) {
				contador = Math.floor((Math.random() * 2) + 3);
				contadorStr = contador.toString();
				this.storage.setContadorAnuncio(contadorStr);
			} else {
				contador = Number(this.storage.getContadorAnuncio());
				if(contador > 0) {
                    this.exibeAviso = false;
					contador--;
					this.storage.setContadorAnuncio(contador.toString());
				} else {
					contador = Math.floor((Math.random() * 2) + 3);
					contadorStr = contador.toString();
                    this.storage.setContadorAnuncio(contadorStr);
                    this.exibeAviso = true;
				}
			}
		}
    }
}