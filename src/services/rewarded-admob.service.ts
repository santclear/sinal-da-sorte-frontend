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
				this.sincronizeResultados();
			});

			document.addEventListener('admob.rewardvideo.events.CLOSE', event => {
				if(this.exibirMensagem) {
					let alert = this.alertCtrl.create({
						// title: 'Conclusão obrigatória do tempo promocional',
						// message: `Para verificar se há novos sorteios para serem atualizados, certifique-se que o vídeo foi exibido completamente antes de fechar.`,
						title: 'Exibição necessária',
						message: `Desculpe, para verificar se há novos sorteios para serem atualizados, 
							é necessário a exibição completa do vídeo.`,
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
					message: `Isso pode ter ocorrido por falha de conexão, verifique se está ativa a sua internet, 
					se estiver e mesmo assim o erro persistir, tente mais tarde.
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
			}).catch(e => {
				let alert = this.alertCtrl.create({
					title: 'Falha ao buscar novos resultados',
					message: `Não foi possível buscar novos resultados de sorteios de loteria. Verifique sua conexão com a internet e tente novamente, 
						caso essa mensagem seja exibida novamente, entre em contato com o suporte: sinaldasorteweb@gmail.com
						`,
					enableBackdropDismiss: false,
					buttons: [{
						text: 'Ok',
					}]
				});
				alert.present();
			});
		} else {
			this.sincronizeResultados();
		}
	}

	sincronizeResultados() {
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
						message: `Excelente! A busca por novos resultados de sorteios de loteria ocorreu com sucesso.
							Verique no seu dispositivo se os novos sorteios foram atualizados.
							Caso não tenha atualizado, tente mais tarde.
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