import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';
import { Component } from '@angular/core';
import { PaginaBase } from '../pagina.base';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ContaLocalDTO } from '../../dtos/conta-local.dto';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
	selector: 'pagina-estatistica',
    templateUrl: 'estatistica.html'
})
export class EstatisticaPage extends PaginaBase {
	public cbxTipoDeGrafico: string = 'frequenciaAcumulada';
	public tiposDeGrafico: {id: string, tipo: string, desabilitado: boolean}[];

	constructor(
		public navCtrl: NavController, 
		public storage: StorageService,
		public admob: AdMobFree,
		public plataforma: Platform) {
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
	}
	
	ionViewDidEnter() {
		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		if(!contaLocal) this.navCtrl.setRoot('ContaExternoPage');
		if(this.plataforma.is('android')) {
			super.mostreAnuncioBanner(this.admob);
			this.mostreAnuncioInterstitial();
		}
	}

	cbxTipoDeGraficoAtualize(tipoDeGrafico: string): void {
		this.cbxTipoDeGrafico = tipoDeGrafico;
	}

    mostreAnuncioInterstitial() {
		let interstitialConfig: AdMobFreeInterstitialConfig = {
			// isTesting: true, // Remove in production
			autoShow: true,
			id: 'ca-app-pub-5335868077868255/2236896705'
		};
	
		this.admob.interstitial.config(interstitialConfig);
	
		this.admob.interstitial.prepare().then(() => {
		}).catch(e => {console.log(e)});

		setTimeout(() => {
			this.mostreAnuncioInterstitial();
		}, 180000);
    }
}