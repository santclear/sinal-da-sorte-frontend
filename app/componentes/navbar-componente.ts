import {Component, Input} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Cookie} from '../util/cookie';

@Component({
    selector: "ags-navbar",
    directives: [IONIC_DIRECTIVES],
    inputs: ['tituloInput'],
    templateUrl: 'build/componentes/navbar-componente.html'
})
export class NavBarAgS {
    private idLoteriaSelecionada: string = "Lotofacil";
    private nomeLoteriaSelecionada: string = "Lotofácil";
    private caminhoDoIconeAvatarDaLoteriaSelecionada: string = "img/lotofacil.png";

    constructor() {
        this.idLoteriaSelecionada = Cookie.get('idLoteriaSelecionada');
        this.nomeLoteriaSelecionada = Cookie.get('nomeLoteriaSelecionada');  
        this.caminhoDoIconeAvatarDaLoteriaSelecionada = Cookie.get('caminhoDoIconeAvatarDaLoteriaSelecionada');  
    }
}
