import {Component, Input} from '@angular/core';
import {MenuController, IONIC_DIRECTIVES} from 'ionic-angular';
import {Sessao} from '../util/sessao';

@Component({
    selector: "ags-navbar",
    directives: [IONIC_DIRECTIVES],
    inputs: ['tituloInput'],
    providers: [Sessao],
    templateUrl: 'build/componentes/navbar-componente.html'
})
export class NavBarAgS {
    private idLoteriaSelecionada: string = "Lotofacil";
    private nomeLoteriaSelecionada: string = "Lotofácil";
    private caminhoDoIconeAvatarDaLoteriaSelecionada: string = "img/lotofacil.png";

    constructor(private menu: MenuController, private sessao: Sessao) {
        this.sessao.getValor('idLoteriaSelecionada', (valor) => {this.idLoteriaSelecionada = valor});
        this.sessao.getValor('nomeLoteriaSelecionada', (valor) => {this.nomeLoteriaSelecionada = valor});
        this.sessao.getValor('caminhoDoIconeAvatarDaLoteriaSelecionada', (valor) => {this.caminhoDoIconeAvatarDaLoteriaSelecionada = valor});
    }
}
