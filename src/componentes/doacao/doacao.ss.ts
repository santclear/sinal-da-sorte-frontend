import { Component } from '@angular/core';

@Component({
	selector: "ss-doacao",
	templateUrl: 'doacao.ss.html'
})
export class DoacaoSs {
	public exibeDoacao: boolean;

	constructor() {}

	toggleDoacao(event) {
		this.exibeDoacao = event.checked;
	}
}