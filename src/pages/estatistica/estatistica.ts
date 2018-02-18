import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';
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
		];

		let bd = ConexaoFabrica.getConexao();

		bd.get('sessao').then((sessao) => {
			let loteria = sessao.loteria.nomeDoDocumentoNoBD;
			if(loteria === 'lotofacil') {
				this.cbxTipoDeGrafico = 'frequenciaAcumulada';
			} else {
				this.cbxTipoDeGrafico = 'frequenciaSomaDezenas';
			}
		});
    }

	cbxTipoDeGraficoAtualize(tipoDeGrafico: string): void {
		this.cbxTipoDeGrafico = tipoDeGrafico;
	}
}