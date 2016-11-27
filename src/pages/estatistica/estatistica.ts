import {Component} from '@angular/core';
import {PaginaBase} from '../pagina.base';

@Component({
	selector: 'pagina-estatistica',
    templateUrl: 'estatistica.html'
})
export class EstatisticaPage extends PaginaBase {
	public cbxTipoDeGrafico: string = 'frequenciaAcumulada';
	public tiposDeGrafico: any;

	constructor() {
		super();
        this.setTitulo("Estatística");

		this.tiposDeGrafico = [
			{id: 'frequenciaAcumulada', tipo: 'Frequência Acumulada'},
			{id: 'frequenciaSomaDezenas', tipo: 'Frequência de Soma de Dezenas'}
		]
    }

	cbxTipoDeGraficoAtualize(idTipoDeGrafico) {
		this.cbxTipoDeGrafico = idTipoDeGrafico;
	}
}