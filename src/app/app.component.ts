import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { BemVindoPage } from '../pages/bem-vindo/bem-vindo';
import { ContaLocalDTO } from '../dtos/conta-local.dto';
import { Loterias } from '../enum/loterias';

import { ConexaoFabrica } from '../dao/util/conexao-fabrica';
import { ConcursoDAOServico } from '../dao/concurso/concurso-dao.servico';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UtilService } from '../services/util.service';
import { ContaService } from '../services/conta.service';

@Component({
	templateUrl: `app.html`,
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	public paginaInicial: any;
	public paginas = [];
	public loterias = [];
	public sufixoCssLoteriaSelecionada: string;
	public nomeLoteriaSelecionada: string;
	public caminhoDoIconeAvatarDaLoteriaSelecionada: string;
	public indicePaginaAtual: number;
	public menuAtivo: string;
	public bd: any;

	constructor(public plataforma: Platform,
		public menu: MenuController,
		public concursoDAOServico: ConcursoDAOServico,
		public loadingCtrl: LoadingController,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public menuService: MenuService, 
		public auth: AuthService,
		public util: UtilService,
		public storage: StorageService,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private contaService: ContaService) {
		
		this.bd = ConexaoFabrica.getConexao();

		this.loterias = this.menuService.getLoterias();

		this.indicePaginaAtual = 0 // página Login;
		
		this.salveLoteriaSessao(Loterias.LOTOFACIL).then(resultadoQuery => {
			if(resultadoQuery.novo != null) {
				this.sufixoCssLoteriaSelecionada = resultadoQuery.novo.loteria.sufixoCssLoteria;
				this.nomeLoteriaSelecionada = resultadoQuery.novo.loteria.nome;
				this.caminhoDoIconeAvatarDaLoteriaSelecionada = resultadoQuery.novo.loteria.caminhoDoIconeAvatar;
				this.paginas = this.menuService.getPaginas(resultadoQuery.novo)
			} else {
				this.sufixoCssLoteriaSelecionada = resultadoQuery.antigo.loteria.sufixoCssLoteria;
				this.nomeLoteriaSelecionada = resultadoQuery.antigo.loteria.nome;
				this.caminhoDoIconeAvatarDaLoteriaSelecionada = resultadoQuery.antigo.loteria.caminhoDoIconeAvatar;
				this.paginas = this.menuService.getPaginas(resultadoQuery.antigo)
			};

			this.sincronize();
		});
	}

	initializeApp() {
		this.plataforma.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	abraAPagina(objetoPagina, indicePagina) {
		this.indicePaginaAtual = indicePagina;
		switch(objetoPagina.titulo) {
			case 'Conta':
				this.nav.push(objetoPagina.class);
				break;
			case 'Sair':
				this.auth.logout();
			default:
				this.nav.setRoot(objetoPagina.class);
		}
		this.menu.close();
	}

	ativeMenuPaginas(indiceLoteria) {
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
			}
			this.sufixoCssLoteriaSelecionada = this.menuService.getLoterias()[indiceLoteria].sufixoCssLoteria;
			this.nomeLoteriaSelecionada = this.menuService.getLoterias()[indiceLoteria].nome;
			this.caminhoDoIconeAvatarDaLoteriaSelecionada = this.menuService.getLoterias()[indiceLoteria].caminhoDoIconeAvatar;

			this.salveOuAtualizeLoteriaSessao(this.menuService.getLoterias()[indiceLoteria]).then(resultadoQuery => {
				this.paginas = this.menuService.getPaginas(resultadoQuery.novo);
				this.nav.setRoot(this.paginas[this.indicePaginaAtual].class);
			});

			this.menuAtivo = 'menuPaginas';
			this.menu.close().then(() => {
				this.menu.enable(true, 'menuPaginas');
				this.menu.enable(false, 'menuLoterias');
				this.menu.open();
			}).catch(erro => {
				console.log(erro);
			});
		});
	}

	ativeMenuLoterias() {
		this.menuAtivo = 'menuLoterias';
		this.menu.close().then(() => {
			this.menu.enable(false, 'menuPaginas');
			this.menu.enable(true, 'menuLoterias');
			this.menu.open();
		}).catch(erro => {
			console.log(erro);
		});
	}

	private salveOuAtualizeLoteriaSessao(objLoteriaSessao): any {
		return new Promise(resolve => {
			this.bd.bulkDocs([
				{
					_id: 'sessao',
					loteria: objLoteriaSessao
				}
			]).then(resultadoQuery => {
				if (resultadoQuery[0].ok == true) {
					resolve({ estado: 'criado', novo: { loteria: objLoteriaSessao }, antigo: null })
				} else {
					this.bd.get('sessao').then(sessao => {
						// Caso já tenha sido inserido um dado de loteria na sessão
						let novosDadosDeSessao = {
							_id: 'sessao',
							_rev: sessao._rev,
							loteria: objLoteriaSessao
						}
						// Atualiza com novos dados
						this.bd.put(novosDadosDeSessao);
						return sessao;
					}).then(sessaoAntiga => {
						resolve({ estado: 'atualizado', novo: { loteria: objLoteriaSessao }, antigo: sessaoAntiga });
					})
				}
			}).catch(erro => {
				console.log(erro);
			});
		});
	}

	private salveLoteriaSessao(objLoteriaSessao): any {
		return new Promise(resolve => {
			this.bd.bulkDocs([
				{
					_id: 'sessao',
					loteria: objLoteriaSessao
				}
			]).then(resultadoQuery => {
				if (resultadoQuery[0].ok == true) {
					resolve({ estado: 'criado', novo: { loteria: objLoteriaSessao }, antigo: null })
				} else {
					this.bd.get('sessao').then(sessao => {
						resolve({ estado: 'existente', novo: null, antigo: { loteria: sessao.loteria } });
					}).catch(erro => {
						console.log(erro);
					});
				}
			}).catch(erro => {
				console.log(erro);
			});
		});
	}

	private sincronize() {
		this.bd.get('sessao').then((sessao) => {
			this.util.ping().subscribe(response => {
				let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
				this.contaService.encontrePorEmail(contaLocal.email).subscribe(conta => {
					if(conta.situacao === 'ATIVO') {
						let indiceLoteria = sessao.loteria.id - 1;
						let resultadoSincronizePromise = this.menuService.sincronizeOsConcursosDaLoteria(this.menuService.getLoterias()[indiceLoteria]);
						resultadoSincronizePromise.then(resultadoSincronize => {
							this.setPaginaInicial();
						});
					} else {
						let alert = this.alertCtrl.create({
							title: 'Conta inativa',
							message: `Sua conta não está ativada.\nPara ativar, 
							clique no link enviado para o e-mail `+ contaLocal.email +`. 
							Caso não consiga por esse link, clique no botão 
							ESQUECI MINHA SENHA na página inicial e siga as instruções exibidas na página.`,
							enableBackdropDismiss: false,
							buttons: [{
								text: 'Ok',
								handler: () => { this.paginaInicial = LoginPage; }
							}]
						});
						alert.present();
					}
				});
			}, erro => {
				this.setPaginaInicial();
			});
		});
	}

	private setPaginaInicial() {
		let contaLocal = this.storage.getContaLocal();
		if(contaLocal) {
			this.paginaInicial = BemVindoPage;
		} else {
			this.paginaInicial = LoginPage;
		}
		this.initializeApp();
	}
}

