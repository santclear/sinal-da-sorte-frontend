import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ConexaoFabrica } from '../dao/util/conexao-fabrica';
import { BemVindoPage } from '../pages/bem-vindo/bem-vindo';
import { EstatisticaPage } from '../pages/estatistica/estatistica';
import { SimuladorPage } from '../pages/simulador/simulador';
import { FechamentoPage } from '../pages/fechamento/fechamento';
import { ApostaPage } from '../pages/aposta/aposta';
import { GruposEspeciaisPage } from '../pages/grupos-especiais/grupos-especiais';
import { BolaoPage } from '../pages/bolao/bolao';
import { HistoricoDeApostasPage } from '../pages/historico-de-apostas/historico-de-apostas';
import { ConcursoDAOServico } from '../dao/concurso/concurso-dao.servico';
import { ConcursoFacade } from '../dao/concurso/concurso-facade';
import { Loterias } from '../enum/loterias';

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
	private indicePaginaAtual: number;
	private menuAtivo: string;
	private bd: any;

	constructor(public plataforma: Platform, public menu: MenuController, public concursoDAOServico: ConcursoDAOServico, public loadingCtrl: LoadingController) {
		this.bd = ConexaoFabrica.getConexao();

		this.loterias = [
			Loterias.LOTOFACIL,
			Loterias.MEGASENA,
			Loterias.QUINA,
			Loterias.LOTOMANIA,
			Loterias.TIMEMANIA,
			Loterias.DUPLASENA
		];

		this.indicePaginaAtual = 0 // página Bem Vindo;

		this.salveLoteriaSessao(Loterias.LOTOFACIL).then(resultadoQuery => {
			let resultadoSincronizePromise = this.sincronizeOsConcursosDaLoteria(this.loterias[0]);
			resultadoSincronizePromise.then(resultadoSincronize => {
				if (resultadoQuery.estado === 'criado') {
					this.sufixoCssLoteriaSelecionada = resultadoQuery.novo.loteria.sufixoCssLoteria;
					this.nomeLoteriaSelecionada = resultadoQuery.novo.loteria.nome;
					this.caminhoDoIconeAvatarDaLoteriaSelecionada = resultadoQuery.novo.loteria.caminhoDoIconeAvatar;
					this.paginaInicial = EstatisticaPage;
					this.paginas = this.getPaginas(resultadoQuery.novo);
				} else {
					this.sufixoCssLoteriaSelecionada = resultadoQuery.antigo.loteria.sufixoCssLoteria;
					this.nomeLoteriaSelecionada = resultadoQuery.antigo.loteria.nome;
					this.caminhoDoIconeAvatarDaLoteriaSelecionada = resultadoQuery.antigo.loteria.caminhoDoIconeAvatar;
					this.paginaInicial = EstatisticaPage;
					this.paginas = this.getPaginas(resultadoQuery.antigo);
				}

				this.initializeApp();
			});
		});
	}
	
	initializeApp() {
		this.plataforma.ready().then(() => {
			StatusBar.styleDefault();
			Splashscreen.hide();
		});
	}

	abraAPagina(objetoPagina, indicePagina) {
		this.indicePaginaAtual = indicePagina;
		this.menu.close();
		this.nav.setRoot(objetoPagina.class);
	}

	ativeMenuPaginas(indiceLoteria) {
		let resultadoSincronizePromise = this.sincronizeOsConcursosDaLoteria(this.loterias[indiceLoteria]);
		resultadoSincronizePromise.then(resultadoSincronize => {
			this.sufixoCssLoteriaSelecionada = this.loterias[indiceLoteria].sufixoCssLoteria;
			this.nomeLoteriaSelecionada = this.loterias[indiceLoteria].nome;
			this.caminhoDoIconeAvatarDaLoteriaSelecionada = this.loterias[indiceLoteria].caminhoDoIconeAvatar;

			this.salveOuAtualizeLoteriaSessao(this.loterias[indiceLoteria]).then(resultadoQuery => {
				this.paginas = this.getPaginas(resultadoQuery.novo);
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

	private sincronizeOsConcursosDaLoteria(parametrosDeServicosWeb: any) {
		return new Promise(resolve => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let loading = this.loadingCtrl.create({
				content: 'Por favor aguarde, estou atualizando os resultados da ' + parametrosDeServicosWeb.nome + ' para sua análise...'
			});

			loading.present();

			concursoFacade.sincronize(parametrosDeServicosWeb).then(concursos => {
				resolve(concursos);
				loading.dismiss(concursos);
			});
		})
	}

	private getPaginas(estadoSessao) {
		let cor = ''+ estadoSessao.loteria.cor.escuro +'';
		return [
			{ sufixoCssPagina: 'BemVindo', titulo: 'Bem Vindo', class: BemVindoPage, icone: 'home', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Estatistica', titulo: 'Estatística', class: EstatisticaPage, icone: 'trending-up', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Simulador', titulo: 'Simulador', class: SimuladorPage, icone: 'ios-car', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Fechamento', titulo: 'Fechamento', class: FechamentoPage, icone: 'md-lock', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Aposta', titulo: 'Aposta', class: ApostaPage, icone: 'md-cash', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'GruposEspeciais', titulo: 'Grupos Especiais', class: GruposEspeciaisPage, icone: 'md-grid', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Bolao', titulo: 'Bolão', class: BolaoPage, icone: 'ios-people', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'HistoricoDeApostas', titulo: 'Histórico de Apostas', class: HistoricoDeApostasPage, icone: 'ios-list-box-outline', corTexto: '#bbb', exibir_texto: 'inline' }
		];
	}
}