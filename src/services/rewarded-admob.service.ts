import { Injectable } from "@angular/core";
import { Platform, ToastController, AlertController } from 'ionic-angular';
import { AdMobFree, AdMobFreeRewardVideoConfig} from "@ionic-native/admob-free";
import { MenuService } from "./menu.service";
import { ConexaoFabrica } from "../dao/util/conexao-fabrica";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RewardVideoAdMobService {
	
	private bd: any;

	private dismissObserver: any;
	public dismiss: any;

	private exibirMensagem: boolean = true;

	constructor(
		private admob: AdMobFree, 
		private menuService: MenuService,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private plataforma: Platform) {

		this.bd = ConexaoFabrica.getConexao();
		
		if(this.plataforma.is('android')) {
			document.addEventListener('admob.rewardvideo.events.REWARD', () => {
				this.exibirMensagem = false;
				this.atualizeResultados();
			});

			document.addEventListener('admob.rewardvideo.events.CLOSE', event => {
				if(this.exibirMensagem) {
					let alert = this.alertCtrl.create({
						title: 'Conclusão obrigatória do tempo promocional',
						message: `Para verificar se há novos sorteios para serem atualizados, certifique-se que o vídeo foi exibido completamente antes de fechar.`,
						enableBackdropDismiss: false,
						buttons: [{
							text: 'Ok',
						}]
					});
					alert.present();
				}
				this.dismissObserver.next(true);
				this.exibirMensagem = true;
			});

			document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', (event) => {
				let alert = this.alertCtrl.create({
					title: 'Erro ao buscar novos sorteios',
					message: ` Ocorreu um erro ao tentar buscar novos sorteios, tente novamente.
						`,
					enableBackdropDismiss: false,
					buttons: [{
						text: 'Ok',
					}]
				});
				alert.present();
				this.dismissObserver.next(true);
			});
		}

		this.dismissObserver = null;
		this.dismiss = Observable.create(observer => {
			this.dismissObserver = observer;
		});
	}
	
    mostreAnuncioRewardVideo() {
		if(this.plataforma.is('android')) {
			let rewardVideoConfig: AdMobFreeRewardVideoConfig = {
				isTesting: true, // Remove in production
				autoShow: true,
				// id: 'ca-app-pub-5335868077868255/8883684198'
			};
			
			this.admob.rewardVideo.config(rewardVideoConfig);
			
			this.admob.rewardVideo.prepare().then(() => {
			}).catch(e => {console.log(e)});
		} else {
			this.atualizeResultados();
		}
	}

	atualizeResultados() {
		this.bd.get('sessao').then((sessao) => {
			let indiceLoteria = sessao.loteria.id - 1;
			let resultadoSincronizePromise = this.menuService.sincronizeOsConcursosDaLoteria(this.menuService.getLoterias()[indiceLoteria]);
			resultadoSincronizePromise.then(resultadoSincronize => {
				let ultimoConcursoStr = JSON.stringify(resultadoSincronize);
				let ultimoConcurso = JSON.parse(ultimoConcursoStr);
				if(ultimoConcurso.maiorNumero === 0) {
					let toast = this.toastCtrl.create({
						message: 'Código 403: Sem autorização para acessar todos os recursos, por falha de conexão de internet ou token inválido',
						showCloseButton: true,
						closeButtonText: 'Ok',
						duration: 5000,
						position: 'top',
						cssClass: 'toastGeral'
					});
					toast.present();
				} else {
					let alert = this.alertCtrl.create({
						title: 'Busca realizada com sucesso',
						message: ` A busca por novos sorteios ocorreu com sucesso. 
							Verique no seu dispositivo se os novos sorteios foram atualizados.
							Caso não tenha atualizado tente mais tarde.
							`,
						enableBackdropDismiss: false,
						buttons: [{
							text: 'Ok',
						}]
					});
					alert.present();
				}
				this.dismissObserver.next(true);
			});
		});
	}
}