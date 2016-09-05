import {Component, ViewChild} from '@angular/core';
import {ConcursoDAOServico} from './dao/concurso/concurso-dao.servico';
import {LoteriaDAOServico} from './dao/loteria/loteria-dao.servico';
import {Nav, Platform, MenuController, ionicBootstrap} from 'ionic-angular';
import {EstatisticaPage} from './pages/estatistica/estatistica';
import {ConexaoFabrica} from './dao/util/conexao-fabrica';
import {SimuladorPage} from './pages/simulador/simulador';
import {FechamentoPage} from './pages/fechamento/fechamento';
import {ApostaPage} from './pages/aposta/aposta';
import {GruposEspeciaisPage} from './pages/grupos-especiais/grupos-especiais';
import {BolaoPage} from './pages/bolao/bolao';
import {HistoricoDeApostasPage} from './pages/historico-de-apostas/historico-de-apostas';
import {BemVindoPage} from './pages/bem-vindo/bem-vindo';
import {StatusBar} from 'ionic-native/dist';

@Component({
	templateUrl: 'build/app.html',
	providers: [ConcursoDAOServico, LoteriaDAOServico]
})
class AgenteDaSorte {
	@ViewChild(Nav) nav: Nav;
    // make HelloIonicPage the root (or first) page
    private paginaInicial: any = EstatisticaPage;
    private paginas: Array<{ sufixoCssPagina: string, titulo: string, class: any }>;
    private menuAtivo: string;
    private loterias: Array<{ id: number, sufixoCssLoteria: string, nome: string, caminhoDoIconeAvatar: string, logo: string }>;
	private idLoteriaSelecionada: number = 1;
    private sufixoCssLoteriaSelecionada: string = 'Lotofacil';
    private nomeLoteriaSelecionada: string = 'Lotofácil';
    private caminhoDoIconeAvatarDaLoteriaSelecionada: string = 'img/lotofacil.png';
	private logoSelecionado: string = 'img/logo-lotofacil.png';
    private templateDaAplicacao: string;
	private bd: any;

    constructor(
		private plataforma: Platform,
		private menu: MenuController,
		private concursoDAOServico: ConcursoDAOServico,
		private loteriaDAOServico: LoteriaDAOServico
	) {
        this.initializeApp();
		this.bd = ConexaoFabrica.getConexao();

        // set our app's pages
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
            { id: 1, sufixoCssLoteria: 'Lotofacil', nome: 'Lotofácil', caminhoDoIconeAvatar: 'img/lotofacil.png', logo: 'img/logo-lotofacil.png' },
            { id: 2, sufixoCssLoteria: 'MegaSena', nome: 'Mega Sena', caminhoDoIconeAvatar: 'img/mega-sena.png', logo: 'img/logo-mega-sena.png' },
            { id: 3, sufixoCssLoteria: 'Quina', nome: 'Quina', caminhoDoIconeAvatar: 'img/quina.png', logo: 'img/logo-quina.png' },
            { id: 4, sufixoCssLoteria: 'Lotomania', nome: 'Lotomania', caminhoDoIconeAvatar: 'img/lotomania.png', logo: 'img/logo-lotomania.png' },
            { id: 5, sufixoCssLoteria: 'DuplaSena', nome: 'Dupla Sena', caminhoDoIconeAvatar: 'img/dupla-sena.png', logo: 'img/logo-dupla-sena.png' },
            { id: 6, sufixoCssLoteria: 'Timemania', nome: 'Timemania', caminhoDoIconeAvatar: 'img/timemania.png', logo: 'img/logo-timemania.png' }
        ];

		this.adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada('idLoteriaSelecionada', 1, (idLoteriaSelecionadaCallBack) => {
			this.idLoteriaSelecionada = idLoteriaSelecionadaCallBack;
		});
		this.adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada('sufixoCssLoteriaSelecionada', 'Lotofacil', (sufixoCssLoteriaSelecionadaCallBack) => {
			this.sufixoCssLoteriaSelecionada = sufixoCssLoteriaSelecionadaCallBack;
		});
		this.adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada('nomeLoteriaSelecionada', 'Lotofácil', (nomeLoteriaSelecionadaCallBack) => {
			this.nomeLoteriaSelecionada = nomeLoteriaSelecionadaCallBack;
		});
		this.adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada('caminhoDoIconeAvatarDaLoteriaSelecionada', 'img/lotofacil.png', (caminhoDoIconeAvatarDaLoteriaSelecionadaCallBack) => {
			this.caminhoDoIconeAvatarDaLoteriaSelecionada = caminhoDoIconeAvatarDaLoteriaSelecionadaCallBack;
		});
		this.adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada('logoSelecionado', 'img/logo-lotofacil.png', (logoSelecionadoCallBack) => {
			this.logoSelecionado = logoSelecionadoCallBack;
		});

		// this.bd.set('indicePagina', Number('7'));//TODO: comentado temporariamente.
		this.bd.set('indicePagina', Number('0'));

		// let loteriaFacade = new LoteriaFacade(this.loteriaDAOServico);
		// loteriaFacade.sincronize(Object.create(ParametrosDeServicosWeb.ENTIDADE_LOTERIA));
		// let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
        // concursoFacade.sincronize(Object.create(ParametrosDeServicosWeb.CONCURSO_LOTOFACIL));
        // concursoFacade.sincronize(Object.create(ParametrosDeServicosWeb.CONCURSO_MEGASENA));
    }

    initializeApp() {
        this.plataforma.ready().then(() => {
            StatusBar.styleDefault();
        });
    }

    abraAPagina(objetoPagina, indicePagina) {
        this.menu.close();
		this.bd.set('indicePagina', indicePagina);
		this.nav.setRoot(objetoPagina.class);
    }

    abraAPaginaBemVindo() {
        // this.abraAPagina(this.paginas[7], Number('7'));//TODO: comentado temporariamente.
		this.abraAPagina(this.paginas[0], Number('0'));
    }
    
    ativeMenuPaginas(indiceLoteria) {
		this.idLoteriaSelecionada = this.loterias[indiceLoteria].id;
        this.sufixoCssLoteriaSelecionada = this.loterias[indiceLoteria].sufixoCssLoteria;
        this.nomeLoteriaSelecionada = this.loterias[indiceLoteria].nome;
        this.caminhoDoIconeAvatarDaLoteriaSelecionada = this.loterias[indiceLoteria].caminhoDoIconeAvatar;
		this.logoSelecionado = this.loterias[indiceLoteria].logo;

		this.bd.set('idLoteriaSelecionada', this.idLoteriaSelecionada);
		this.bd.set('sufixoCssLoteriaSelecionada', this.sufixoCssLoteriaSelecionada);
        this.bd.set('nomeLoteriaSelecionada', this.nomeLoteriaSelecionada);
        this.bd.set('caminhoDoIconeAvatarDaLoteriaSelecionada', this.caminhoDoIconeAvatarDaLoteriaSelecionada);
		this.bd.set('logoSelecionado', this.logoSelecionado);

		this.bd.get('indicePagina').then((indicePaginaCallBack) => {
			this.nav.pop();
			this.nav.setRoot(this.paginas[Number(indicePaginaCallBack)].class);

			this.menuAtivo = 'menuPaginas';
			this.menu.enable(true, 'menuPaginas');
			this.menu.enable(false, 'menuLoterias');
			this.menu.open();
		});

        
    }

    ativeMenuLoterias() {
		this.nav.pop();
        this.menuAtivo = 'menuLoterias';
        this.menu.enable(false, 'menuPaginas');
        this.menu.enable(true, 'menuLoterias');
        this.menu.open();
    }

    private adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada(chaveDaLoteria: string, dadoPadrao: any, successCallBack: any): void {
        // através da chaveLoteria, tenta pegar da sessão um novo dado
        // se retornar undefined, quer dizer que não existe o valor na sessão
        // então seta um valor padrão na sessão
		this.bd.get(chaveDaLoteria).then((dadoEmSessaoDaLoteriaCallBack) => {
			let dadoDaLoteria = dadoEmSessaoDaLoteriaCallBack != undefined ? dadoEmSessaoDaLoteriaCallBack : dadoPadrao;
			this.bd.set(chaveDaLoteria, dadoDaLoteria);

			successCallBack(dadoDaLoteria);
		});
    }
}

ionicBootstrap(AgenteDaSorte);
