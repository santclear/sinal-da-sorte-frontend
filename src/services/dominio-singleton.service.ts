import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

@Injectable()
export class DominioSingletonService {
	
	public dominio = '';
	
	constructor(public util: UtilService) {
		util.dominio().subscribe(response => {
			this.dominio = response;
		});
	}

	getDominio() {
		return this.dominio;
	}
}