import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';
import { Component } from '@angular/core';
import { PaginaBase } from '../pagina.base';


@Component({
	selector: 'pagina-estatistica',
    templateUrl: 'estatistica.html'
})
export class EstatisticaPage extends PaginaBase {
	private cbxTipoDeGrafico: string = 'frequenciaAcumulada';
	private tiposDeGrafico: {id: string, tipo: string}[];

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
			if(loteria === 'lotofacil' || loteria === 'lotomania') {
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