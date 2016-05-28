import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {BemVindoPage} from './pages/bem-vindo/bem-vindo';
import {EstatisticaPage} from './pages/estatistica/estatistica';
import {SimuladorPage} from './pages/simulador/simulador';
import {FechamentoPage} from './pages/fechamento/fechamento';
import {ApostaPage} from './pages/aposta/aposta';
import {GruposEspeciaisPage} from './pages/grupos-especiais/grupos-especiais';
import {BolaoPage} from './pages/bolao/bolao';
import {HistoricoDeApostasPage} from './pages/historico-de-apostas/historico-de-apostas';
import {Sessao} from './util/sessao';

@App({
    templateUrl: 'build/app.html',
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class AgenteDaSorte {
    // make HelloIonicPage the root (or first) page
    private paginaInicial: any = BemVindoPage;
    private paginas: Array<{id: string, titulo: string, componente: any}>;
    private menuAtivo: string;
    private loterias: Array<{id: string, nome: string, caminhoDoIconeAvatar: string}>;
    private idLoteriaSelecionada: string = "Lotofacil";
    private nomeLoteriaSelecionada: string = "Lotofácil";
    private caminhoDoIconeAvatarDaLoteriaSelecionada: string = "img/lotofacil.png";
    private templateDaAplicacao: string;

    constructor(private app: IonicApp, private plataforma: Platform, private menu: MenuController) {
        this.initializeApp();

        // set our app's pages
        this.paginas = [
            {id: 'Estatistica', titulo: 'Estatística', componente: EstatisticaPage},
            {id: 'Simulador', titulo: 'Simulador', componente: SimuladorPage},
            {id: 'Fechamento', titulo: 'Fechamento', componente: FechamentoPage},
            {id: 'Aposta', titulo: 'Aposta', componente: ApostaPage},
            {id: 'GruposEspeciais', titulo: 'Grupos Especiais', componente: GruposEspeciaisPage},
            {id: 'Bolao', titulo: 'Bolão', componente: BolaoPage},
            {id: 'HistoricoDeApostas', titulo: 'Histórico de Apostas', componente: HistoricoDeApostasPage},
            {id: 'BemVindo', titulo: 'Bem Vindo', componente: BemVindoPage}
        ];

        this.loterias = [
            {id: 'Lotofacil', nome: 'Lotofácil', caminhoDoIconeAvatar: 'img/lotofacil.png'},
            {id: 'MegaSena', nome: 'Mega Sena', caminhoDoIconeAvatar: 'img/mega-sena.png'},
            {id: 'Quina', nome: 'Quina', caminhoDoIconeAvatar: 'img/quina.png'},
            {id: 'Lotomania', nome: 'Lotomania', caminhoDoIconeAvatar: 'img/lotomania.png'},
            {id: 'DuplaSena', nome: 'Dupla Sena', caminhoDoIconeAvatar: 'img/dupla-sena.png'},
            {id: 'Timemania', nome: 'Timemania', caminhoDoIconeAvatar: 'img/timemania.png'}
        ];

        let sessao = new Sessao();
        sessao.set('idLoteriaSelecionada', this.idLoteriaSelecionada);
        sessao.set('nomeLoteriaSelecionada', this.nomeLoteriaSelecionada);
        sessao.set('caminhoDoIconeAvatarDaLoteriaSelecionada', this.caminhoDoIconeAvatarDaLoteriaSelecionada);
    }

    initializeApp() {
        this.plataforma.ready().then(() => {
            StatusBar.styleDefault();
        });
    }

    abraAPagina(pagina) {
        this.menu.close();
        let nav = this.app.getComponent('nav');
        nav.setRoot(pagina.componente);

    }

    abraAPaginaBemVindo() {
        this.abraAPagina(this.paginas[7]);
    }

    ativeMenuPaginas(indiceLoteria) {
        let sessao = new Sessao();

        sessao.set('idLoteriaSelecionada', this.loterias[indiceLoteria].id);
        sessao.set('nomeLoteriaSelecionada', this.loterias[indiceLoteria].nome);
        sessao.set('caminhoDoIconeAvatarDaLoteriaSelecionada', this.loterias[indiceLoteria].caminhoDoIconeAvatar);

        this.idLoteriaSelecionada = this.loterias[indiceLoteria].id;
        this.nomeLoteriaSelecionada = this.loterias[indiceLoteria].nome;
        this.caminhoDoIconeAvatarDaLoteriaSelecionada = this.loterias[indiceLoteria].caminhoDoIconeAvatar;


        this.menuAtivo = 'menuPaginas';
        this.menu.enable(true, 'menuPaginas');
        this.menu.enable(false, 'menuLoterias');
        this.menu.open();
    }

    ativeMenuLoterias() {
        this.menuAtivo = 'menuLoterias';
        this.menu.enable(false, 'menuPaginas');
        this.menu.enable(true, 'menuLoterias');
        this.menu.open();
    }
}
