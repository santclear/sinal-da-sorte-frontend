import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {BemVindoPage} from './pages/bem-vindo/bem-vindo';
import {EstatisticaPage} from './pages/estatistica/estatistica';
import {SimuladorPage} from './pages/simulador/simulador';
import {FechamentoPage} from './pages/fechamento/fechamento';
import {ApostaPage} from './pages/aposta/aposta';
import {GruposEspeciaisPage} from './pages/grupos-especiais/grupos-especiais';
import {BolaoPage} from './pages/bolao/bolao';
import {HistoricoDeApostasPage} from './pages/historico-de-apostas/historico-de-apostas';
import {Cookie} from './util/cookie';

@Component({
  templateUrl: 'build/app.html'
})
class AgenteDaSorte {
	@ViewChild(Nav) nav: Nav;
    // make HelloIonicPage the root (or first) page
    private paginaInicial: any = BemVindoPage;
    private paginas: Array<{id: string, titulo: string, class: any}>;
    private menuAtivo: string;
    private loterias: Array<{id: string, nome: string, caminhoDoIconeAvatar: string}>;
    private idLoteriaSelecionada: string = "Lotofacil";
    private nomeLoteriaSelecionada: string = "Lotofácil";
    private caminhoDoIconeAvatarDaLoteriaSelecionada: string = "img/lotofacil.png";
    private templateDaAplicacao: string;

    constructor(private plataforma: Platform, private menu: MenuController) {
        this.initializeApp();

        // set our app's pages
        this.paginas = [
            {id: 'Estatistica', titulo: 'Estatística', class: EstatisticaPage},
            {id: 'Simulador', titulo: 'Simulador', class: SimuladorPage},
            {id: 'Fechamento', titulo: 'Fechamento', class: FechamentoPage},
            {id: 'Aposta', titulo: 'Aposta', class: ApostaPage},
            {id: 'GruposEspeciais', titulo: 'Grupos Especiais', class: GruposEspeciaisPage},
            {id: 'Bolao', titulo: 'Bolão', class: BolaoPage},
            {id: 'HistoricoDeApostas', titulo: 'Histórico de Apostas', class: HistoricoDeApostasPage},
            {id: 'BemVindo', titulo: 'Bem Vindo', class: BemVindoPage}
        ];

        this.loterias = [
            {id: 'Lotofacil', nome: 'Lotofácil', caminhoDoIconeAvatar: 'img/lotofacil.png'},
            {id: 'MegaSena', nome: 'Mega Sena', caminhoDoIconeAvatar: 'img/mega-sena.png'},
            {id: 'Quina', nome: 'Quina', caminhoDoIconeAvatar: 'img/quina.png'},
            {id: 'Lotomania', nome: 'Lotomania', caminhoDoIconeAvatar: 'img/lotomania.png'},
            {id: 'DuplaSena', nome: 'Dupla Sena', caminhoDoIconeAvatar: 'img/dupla-sena.png'},
            {id: 'Timemania', nome: 'Timemania', caminhoDoIconeAvatar: 'img/timemania.png'}
        ];
        
        this.idLoteriaSelecionada = this._adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada('idLoteriaSelecionada', 'Lotofacil');
        this.nomeLoteriaSelecionada = this._adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada('nomeLoteriaSelecionada', 'Lotofácil');
        this.caminhoDoIconeAvatarDaLoteriaSelecionada = this._adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada('caminhoDoIconeAvatarDaLoteriaSelecionada', 'img/lotofacil.png');
        
        Cookie.set('indicePagina', '7');
    }

    initializeApp() {
        this.plataforma.ready().then(() => {
            StatusBar.styleDefault();
        });
    }

    abraAPagina(objetoPagina, indicePagina) {
        this.menu.close();
        Cookie.set('indicePagina', indicePagina)
		this.nav.setRoot(objetoPagina.class);

    }

    abraAPaginaBemVindo() {
        this.abraAPagina(this.paginas[7], 7);
    }

    ativeMenuPaginas(indiceLoteria) {
        this.idLoteriaSelecionada = this.loterias[indiceLoteria].id;
        this.nomeLoteriaSelecionada = this.loterias[indiceLoteria].nome;
        this.caminhoDoIconeAvatarDaLoteriaSelecionada = this.loterias[indiceLoteria].caminhoDoIconeAvatar;

        Cookie.set('idLoteriaSelecionada', this.idLoteriaSelecionada);
        Cookie.set('nomeLoteriaSelecionada', this.nomeLoteriaSelecionada);
        Cookie.set('caminhoDoIconeAvatarDaLoteriaSelecionada', this.caminhoDoIconeAvatarDaLoteriaSelecionada);

        this.nav.pop();
        this.nav.setRoot(this.paginas[Cookie.get('indicePagina')].class);
        
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
    
    _adicioneNaViewValoresEmSessaoDaUltimaLoteriaSelecionada(chaveDaLoteria: string, dadoPadrao: string): string {
        // através da chaveLoteria, tenta pegar da sessão um novo dado
        // se retornar undefined, quer dizer que não existe o valor na sessão
        // então seta um valor padrão na sessão
        let dadoEmSessaoDaLoteria = Cookie.get(chaveDaLoteria);
        let dadoDaLoteria = dadoEmSessaoDaLoteria != undefined ? dadoEmSessaoDaLoteria : dadoPadrao;
        Cookie.set(chaveDaLoteria, dadoDaLoteria);
        
        return dadoDaLoteria;
    }
}

ionicBootstrap(AgenteDaSorte);
