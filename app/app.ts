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

@App({
    templateUrl: 'build/app.html',
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class AgenteDaSorte {
    // make HelloIonicPage the root (or first) page
    paginaInicial: any = BemVindoPage;
    paginas: Array<{id: string, titulo: string, componente: any}>;
    menuAtivo: string;
    loterias: Array<{id: string, nome: string, caminhoDoIconeAvatar: string}>;
    loteriaSelecionada: string;
    caminhoDoIconeAvatarDaLoteriaSelecionada: string;

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
            {id: 'lotofacil', nome: 'Lotofácil', caminhoDoIconeAvatar: 'img/lotofacil.png'},
            {id: 'mega-senha', nome: 'Mega Sena', caminhoDoIconeAvatar: 'img/mega-sena.png'},
            {id: 'quina', nome: 'Quina', caminhoDoIconeAvatar: 'img/quina.png'},
            {id: 'lotomania', nome: 'Lotomania', caminhoDoIconeAvatar: 'img/lotomania.png'},
            {id: 'dupla-sena', nome: 'Dupla Sena', caminhoDoIconeAvatar: 'img/dupla-sena.png'},
            {id: 'timemania', nome: 'Timemania', caminhoDoIconeAvatar: 'img/timemania.png'}
        ];

        this.loteriaSelecionada = "Lotofácil";
        this.caminhoDoIconeAvatarDaLoteriaSelecionada = "img/lotofacil.png";
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

    ativeMenuPaginas(loteria, caminhoDoIconeAvatar) {
        // altera o nome e o caminho do icone avatar no menuPaginas, conforme selecionado no menuLoterias
        this.loteriaSelecionada = loteria;
        this.caminhoDoIconeAvatarDaLoteriaSelecionada = caminhoDoIconeAvatar;

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
