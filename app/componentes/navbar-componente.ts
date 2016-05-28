import {Component, Input} from 'angular2/core';
import {MenuController, NavController} from 'ionic-angular';
import {IONIC_DIRECTIVES} from 'ionic-angular/config/directives';
import {Sessao} from '../util/sessao';

@Component({
    selector: "ags-navbar",
    directives: [IONIC_DIRECTIVES],
    inputs: ['tituloInput'],
    template:`
        <ion-navbar *navbar primary>
            <button menuToggle>
                <ion-icon name="menu"></ion-icon>
            </button>

            <ion-title>
                {{tituloInput}}
            </ion-title>

            <ion-buttons end>
                <img src="{{caminhoDoIconeAvatarDaLoteriaSelecionada}}">
            </ion-buttons>
        </ion-navbar>
`})
export class NavBarAgS {
    private idLoteriaSelecionada: string = "Lotofacil";
    private nomeLoteriaSelecionada: string = "Lotofácil";
    private caminhoDoIconeAvatarDaLoteriaSelecionada: string = "img/lotofacil.png";

    constructor(private menu: MenuController, private nav: NavController) {
        let sessao = new Sessao();

        sessao.get('idLoteriaSelecionada', (valor) => {this.idLoteriaSelecionada = valor});
        sessao.get('nomeLoteriaSelecionada', (valor) => {this.nomeLoteriaSelecionada = valor});
        sessao.get('caminhoDoIconeAvatarDaLoteriaSelecionada', (valor) => {this.caminhoDoIconeAvatarDaLoteriaSelecionada = valor});
    }
}
