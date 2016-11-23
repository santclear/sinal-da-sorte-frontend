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
import {ParametrosDeServicosWeb} from '../enum/parametros-de-servicos-web';


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
			{ sufixoCssPagina: 'Estatistica', titulo: 'Estatística', class: EstatisticaPage },
			{ sufixoCssPagina: 'Simulador', titulo: 'Simulador', class: SimuladorPage },
			{ sufixoCssPagina: 'Fechamento', titulo: 'Fechamento', class: FechamentoPage },
			{ sufixoCssPagina: 'Aposta', titulo: 'Aposta', class: ApostaPage },
			{ sufixoCssPagina: 'GruposEspeciais', titulo: 'Grupos Especiais', class: GruposEspeciaisPage },
			{ sufixoCssPagina: 'Bolao', titulo: 'Bolão', class: BolaoPage },
			{ sufixoCssPagina: 'HistoricoDeApostas', titulo: 'Histórico de Apostas', class: HistoricoDeApostasPage },
			{ sufixoCssPagina: 'BemVindo', titulo: 'Bem Vindo', class: BemVindoPage }
		];

		this.loterias = [
			{ id: 1, sufixoCssLoteria: 'Lotofacil', nome: 'Lotofácil', caminhoDoIconeAvatar: 'assets/img/lotofacil.png', logo: 'assets/img/logo-lotofacil.png', parametrosDeServicosWeb: ParametrosDeServicosWeb.CONCURSO_LOTOFACIL },
			{ id: 2, sufixoCssLoteria: 'MegaSena', nome: 'Mega Sena', caminhoDoIconeAvatar: 'assets/img/mega-sena.png', logo: 'assets/img/logo-mega-sena.png', parametrosDeServicosWeb: ParametrosDeServicosWeb.CONCURSO_MEGASENA },
			{ id: 3, sufixoCssLoteria: 'Quina', nome: 'Quina', caminhoDoIconeAvatar: 'assets/img/quina.png', logo: 'assets/img/logo-quina.png', parametrosDeServicosWeb: ParametrosDeServicosWeb.CONCURSO_LOTOFACIL },
			{ id: 4, sufixoCssLoteria: 'Lotomania', nome: 'Lotomania', caminhoDoIconeAvatar: 'assets/img/lotomania.png', logo: 'assets/img/logo-lotomania.png', parametrosDeServicosWeb: ParametrosDeServicosWeb.CONCURSO_LOTOFACIL },
			{ id: 5, sufixoCssLoteria: 'DuplaSena', nome: 'Dupla Sena', caminhoDoIconeAvatar: 'assets/img/dupla-sena.png', logo: 'assets/img/logo-dupla-sena.png', parametrosDeServicosWeb: ParametrosDeServicosWeb.CONCURSO_LOTOFACIL },
			{ id: 6, sufixoCssLoteria: 'Timemania', nome: 'Timemania', caminhoDoIconeAvatar: 'assets/img/timemania.png', logo: 'assets/img/logo-timemania.png', parametrosDeServicosWeb: ParametrosDeServicosWeb.CONCURSO_LOTOFACIL }
		];

		this.indicePaginaAtual = 6;
		// Caso exista dados em sessão, pega os dados
		this.bd.get('sessao').then(sessao => {
			this.sufixoCssLoteriaSelecionada = sessao.loteria.sufixoCssLoteria;
			this.nomeLoteriaSelecionada = sessao.loteria.nome;
			this.caminhoDoIconeAvatarDaLoteriaSelecionada = sessao.loteria.caminhoDoIconeAvatar;
			this.paginaInicial = BemVindoPage;
		}).catch(err => {// Caso não exista dados em sessão, salva com dados default
			this.salveOuAtualizeLoteriaSessao({
				id: 1,
				sufixoCssLoteria: 'Lotofacil',
				nome: 'Lotofácil',
				caminhoDoIconeAvatar: 'assets/img/lotofacil.png',
				logo: 'assets/img/logo-lotofacil.png'
			}).then(() => {
				this.paginaInicial = BemVindoPage;
			});
		});



		this.sincronizeOsConcursosDaLoteria(this.loterias[0].parametrosDeServicosWeb);
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

		this.salveOuAtualizeLoteriaSessao({
			id: this.loterias[indiceLoteria].id,
			sufixoCssLoteria: this.loterias[indiceLoteria].sufixoCssLoteria,
			nome: this.loterias[indiceLoteria].nome,
			caminhoDoIconeAvatar: this.loterias[indiceLoteria].caminhoDoIconeAvatar,
			logo: this.loterias[indiceLoteria].logo
		}).then(() => {
			this.nav.setRoot(this.paginas[this.indicePaginaAtual].class);
		});

		this.sincronizeOsConcursosDaLoteria(this.loterias[indiceLoteria].parametrosDeServicosWeb);

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

	private salveOuAtualizeLoteriaSessao(objLoteriaSessao) {
		// Caso exista a entidade sessão
		return this.bd.get('sessao').then(sessao => {
			// Caso já tenha sido inserido um dado de loteria na sessão
			if (sessao.loteria != undefined) {
				sessao.loteria.id = objLoteriaSessao.id;
				sessao.loteria.sufixoCssLoteria = objLoteriaSessao.sufixoCssLoteria;
				sessao.loteria.nome = objLoteriaSessao.nome;
				sessao.loteria.caminhoDoIconeAvatar = objLoteriaSessao.caminhoDoIconeAvatar;
				sessao.loteria.logo = objLoteriaSessao.logo;
				// Sobrescreve com o novo dado
				return this.bd.put(sessao);
			} else {// Se não cria um novo dado de loteria na sessão
				sessao.push(
					{
						loteria: {
							id: objLoteriaSessao.id,
							sufixoCssLoteria: objLoteriaSessao.sufixoCssLoteria,
							nome: objLoteriaSessao.nome,
							caminhoDoIconeAvatar: objLoteriaSessao.caminhoDoIconeAvatar,
							logo: objLoteriaSessao.logo
						}
					}
				);
				return this.bd.put(sessao);
			}

		}).then(() => {
			console.log('Loteria salva com sucesso na sessao => ' + JSON.stringify(objLoteriaSessao));
			return this.bd.get('sessao');
		}).catch(err => {// Caso não exista a entidade sessão
			this.sufixoCssLoteriaSelecionada = objLoteriaSessao.sufixoCssLoteria;
			this.nomeLoteriaSelecionada = objLoteriaSessao.nome;
			this.caminhoDoIconeAvatarDaLoteriaSelecionada = objLoteriaSessao.caminhoDoIconeAvatar;
			let loteria = {
				id: objLoteriaSessao.id,
				sufixoCssLoteria: objLoteriaSessao.sufixoCssLoteria,
				nome: objLoteriaSessao.nome,
				caminhoDoIconeAvatar: objLoteriaSessao.caminhoDoIconeAvatar,
				logo: objLoteriaSessao.logo
			}

			this.bd.bulkDocs([
				{
					_id: 'sessao',
					loteria
				}
			]).then(sucesso => {
				console.log('Entidade sessão criada com sucesso. => ' + JSON.stringify(loteria));
				return this.bd.get('sessao');
			}).catch(erro => {
				console.log('Ocorreu um erro ao tentar criar a entidade sessão => ' + erro);
				return erro;
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
