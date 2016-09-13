import {Component, Input} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {ConexaoFabrica} from '../dao/util/conexao-fabrica';

@Component({
    selector: "ags-navbar",
    directives: [IONIC_DIRECTIVES],
    inputs: ['tituloInput'],
    templateUrl: 'build/componentes/navbar.ags.html'
})
export class NavBarAgS {
	private idLoteriaSelecionada: number;
    private sufixoCssLoteriaSelecionada: string = "Lotofacil";
    private nomeLoteriaSelecionada: string = "Lotofácil";
    private caminhoDoIconeAvatarDaLoteriaSelecionada: string = "img/lotofacil.png";
	private logoSelecionado: string = "img/logo-lotofacil.png";

    constructor() {
		let bd = ConexaoFabrica.getConexao();

		bd.get('idLoteriaSelecionada').then((idLoteriaSelecionadaCallBack) => {
			this.idLoteriaSelecionada = idLoteriaSelecionadaCallBack != undefined ? idLoteriaSelecionadaCallBack : 1;
		});
		bd.get('sufixoCssLoteriaSelecionada').then((sufixoCssLoteriaSelecionadaCallBack) => {
			this.sufixoCssLoteriaSelecionada = sufixoCssLoteriaSelecionadaCallBack != undefined ? sufixoCssLoteriaSelecionadaCallBack : "Lotofacil";
		});
        bd.get('nomeLoteriaSelecionada').then((nomeLoteriaSelecionadaCallBack) => {
			this.nomeLoteriaSelecionada = nomeLoteriaSelecionadaCallBack != undefined ? nomeLoteriaSelecionadaCallBack : "Lotofácil";
		});
        bd.get('caminhoDoIconeAvatarDaLoteriaSelecionada').then((caminhoDoIconeAvatarDaLoteriaSelecionadaCallBack) => {
			this.caminhoDoIconeAvatarDaLoteriaSelecionada = caminhoDoIconeAvatarDaLoteriaSelecionadaCallBack != undefined ? caminhoDoIconeAvatarDaLoteriaSelecionadaCallBack : "img/lotofacil.png";
		});
		bd.get('logoSelecionado').then((logoSelecionadoCallBack) => {
			this.logoSelecionado = logoSelecionadoCallBack != undefined ? logoSelecionadoCallBack : "img/logo-lotofacil.png";
		});
    }
}
