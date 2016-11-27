import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController, LoadingController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ConexaoFabrica} from '../dao/util/conexao-fabrica';
import {BemVindoPage} from '../pages/bem-vindo/bem-vindo';
import {EstatisticaPage} from '../pages/estatistica/estatistica';
import {SimuladorPage} from '../pages/simulador/simulador';
import {FechamentoPage} from '../pages/fechamento/fechamento';
import {ApostaPage} from '../pages/aposta/aposta';
import {GruposEspeciaisPage} from '../pages/grupos-especiais/grupos-especiais';
import {BolaoPage} from '../pages/bolao/bolao';
import {HistoricoDeApostasPage} from '../pages/historico-de-apostas/historico-de-apostas';
import {ConcursoDAOServico} from '../dao/concurso/concurso-dao.servico';
import {ConcursoFacade} from '../dao/concurso/concurso-facade';
import {Loterias} from '../enum/loterias';

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
		this.initializeApp();

		this.bd = ConexaoFabrica.getConexao();

		this.paginas = [
			{sufixoCssPagina: 'Estatistica', titulo: 'Estatística', class: EstatisticaPage},
			{sufixoCssPagina: 'Simulador', titulo: 'Simulador', class: SimuladorPage},
			{sufixoCssPagina: 'Fechamento', titulo: 'Fechamento', class: FechamentoPage},
			{sufixoCssPagina: 'Aposta', titulo: 'Aposta', class: ApostaPage},
			{sufixoCssPagina: 'GruposEspeciais', titulo: 'Grupos Especiais', class: GruposEspeciaisPage},
			{sufixoCssPagina: 'Bolao', titulo: 'Bolão', class: BolaoPage},
			{sufixoCssPagina: 'HistoricoDeApostas', titulo: 'Histórico de Apostas', class: HistoricoDeApostasPage},
			{sufixoCssPagina: 'BemVindo', titulo: 'Bem Vindo', class: BemVindoPage}
		];

		this.loterias = [
			Loterias.LOTOFACIL,
			Loterias.MEGASENA,
			Loterias.QUINA,
			Loterias.LOTOMANIA,
			Loterias.TIMEMANIA,
			Loterias.DUPLASENA
		];

		this.indicePaginaAtual = 6;

		this.salveLoteriaSessao(Loterias.LOTOFACIL).then(resultadoQuery => {
			if(resultadoQuery.estado === 'criado') {
				this.sufixoCssLoteriaSelecionada = resultadoQuery.novo.loteria.sufixoCssLoteria;
				this.nomeLoteriaSelecionada = resultadoQuery.novo.loteria.nome;
				this.caminhoDoIconeAvatarDaLoteriaSelecionada = resultadoQuery.novo.loteria.caminhoDoIconeAvatar;
				this.paginaInicial = EstatisticaPage;
			} else {
				this.sufixoCssLoteriaSelecionada = resultadoQuery.antigo.loteria.sufixoCssLoteria;
				this.nomeLoteriaSelecionada = resultadoQuery.antigo.loteria.nome;
				this.caminhoDoIconeAvatarDaLoteriaSelecionada = resultadoQuery.antigo.loteria.caminhoDoIconeAvatar;
				this.paginaInicial = EstatisticaPage;
			}
		});

		this.sincronizeOsConcursosDaLoteria(this.loterias[0]);
	}

	initializeApp() {
		this.plataforma.ready().then(() => {
			StatusBar.styleDefault();
		});
	}

	abraAPagina(objetoPagina, indicePagina) {
		this.indicePaginaAtual = indicePagina;
		this.menu.close();
		this.nav.setRoot(objetoPagina.class);
	}

	ativeMenuPaginas(indiceLoteria) {
		this.sufixoCssLoteriaSelecionada = this.loterias[indiceLoteria].sufixoCssLoteria;
		this.nomeLoteriaSelecionada = this.loterias[indiceLoteria].nome;
		this.caminhoDoIconeAvatarDaLoteriaSelecionada = this.loterias[indiceLoteria].caminhoDoIconeAvatar;

		this.salveOuAtualizeLoteriaSessao(this.loterias[indiceLoteria]).then(resultadoQuery => {
			this.nav.setRoot(this.paginas[this.indicePaginaAtual].class);
		});

		this.sincronizeOsConcursosDaLoteria(this.loterias[indiceLoteria]);

		this.menuAtivo = 'menuPaginas';
		this.menu.close();
		this.menu.enable(true, 'menuPaginas');
		this.menu.enable(false, 'menuLoterias');
		this.menu.open();
	}

	ativeMenuLoterias() {
		this.menuAtivo = 'menuLoterias';
		this.menu.close();
		this.menu.enable(false, 'menuPaginas');
		this.menu.enable(true, 'menuLoterias');
		this.menu.open();
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
					resolve({estado: 'criado', novo: {loteria: objLoteriaSessao}, antigo: null})
				} else {
					this.bd.get('sessao').then(sessao => {
						resolve({estado: 'existente', novo: null, antigo: {loteria: sessao.loteria}});
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
					resolve({estado: 'criado', novo: {loteria: objLoteriaSessao}, antigo: null})
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
						resolve({estado: 'atualizado', novo: {loteria: objLoteriaSessao}, antigo: sessaoAntiga});
					})
				}
			}).catch(erro => {
				console.log(erro);
			});
		});
	}

	private sincronizeOsConcursosDaLoteria(parametrosDeServicosWeb: any) {
		let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
		let loading = this.loadingCtrl.create({
			content: 'Por favor aguarde, estou atualizando os resultados da ' + parametrosDeServicosWeb.nome + ' para sua análise...'
		});

		loading.present();

		concursoFacade.sincronize(parametrosDeServicosWeb).then(concursos => {
			loading.dismiss();
		});

	}
}
