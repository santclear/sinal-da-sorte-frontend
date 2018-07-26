import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';
import { Component } from '@angular/core';
import { PaginaBase } from '../pagina.base';
import { IonicPage, NavController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ContaLocalDTO } from '../../dtos/conta-local.dto';
import { InterstitialAdMobService } from '../../services/interstitial-admob.service';
import { AvisoService } from '../../services/aviso.service';

@IonicPage()
@Component({
	selector: 'pagina-estatistica',
    templateUrl: 'estatistica.html'
})
export class EstatisticaPage extends PaginaBase {
	public cbxTipoDeGrafico: string = 'frequenciaAcumulada';
	public tiposDeGrafico: {id: string, tipo: string, desabilitado: boolean}[];
	public exibeAviso: boolean;

	constructor(
		public navCtrl: NavController, 
		public storage: StorageService,
		public intersticialAdMobService: InterstitialAdMobService,
		public avisoService: AvisoService) {
		super();
        this.setTitulo('Estatística');

		this.tiposDeGrafico = [
			{id: 'frequenciaAcumulada', tipo: 'Frequência', desabilitado: false},
			{id: 'frequenciaSomaDezenas', tipo: 'Soma dezenas', desabilitado: false},
			{id: 'a', tipo: 'Dezenas por Casa', desabilitado: true},
			{id: 'a', tipo: 'Dezenas Repetidas', desabilitado: true},
			{id: 'a', tipo: 'Linhas', desabilitado: true},
			{id: 'a', tipo: 'Colunas', desabilitado: true},
			{id: 'a', tipo: 'Quadrantes', desabilitado: true},
			{id: 'a', tipo: 'Pares e Ímpares', desabilitado: true},
			{id: 'a', tipo: 'Primos', desabilitado: true},
		];

		let bd = ConexaoFabrica.getConexao();

		bd.get('sessao').then((sessao) => {
			let loteria = sessao.loteria.nomeDoDocumentoNoBD;
			if(loteria === 'lotofacil' || loteria === 'diadesorte') {
				this.cbxTipoDeGrafico = 'frequenciaAcumulada';
			} else {
				this.cbxTipoDeGrafico = 'frequenciaSomaDezenas';
			}
		});

		this.exibeAviso = this.avisoService.exibeAviso;
	}
	
	ionViewDidEnter() {
		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		if(!contaLocal) this.navCtrl.setRoot('ContaExternoPage');
	}

	cbxTipoDeGraficoAtualize(tipoDeGrafico: string): void {
		this.intersticialAdMobService.consomeCredito();
		this.cbxTipoDeGrafico = tipoDeGrafico;
	}
}