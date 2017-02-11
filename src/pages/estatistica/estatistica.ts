import { Component } from '@angular/core';
import { PaginaBase } from '../pagina.base';

@Component({
	selector: 'pagina-estatistica',
    templateUrl: 'estatistica.html'
})
export class EstatisticaPage extends PaginaBase {
	public cbxTipoDeGrafico: string = 'frequenciaAcumulada';
	public tiposDeGrafico: {id: string, tipo: string}[];

	constructor() {
		super();
        this.setTitulo('Estatística');

		this.tiposDeGrafico = [
			{id: 'frequenciaAcumulada', tipo: 'Acumulado'},
			{id: 'frequenciaSomaDezenas', tipo: 'Soma dezenas'}
		]
    }

	cbxTipoDeGraficoAtualize(tipoDeGrafico: string): void {
		this.cbxTipoDeGrafico = tipoDeGrafico;
	}
}