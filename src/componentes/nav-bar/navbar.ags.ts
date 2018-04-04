import { Component } from '@angular/core';
import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';
import { Loterias } from '../../enum/loterias';

@Component({
	selector: "ags-navbar",
	inputs: ['tituloInput'],
	templateUrl: 'navbar.ags.html'
})
export class NavBarAgS {
	public logoSelecionado: string;
	public nomeDaLoteria: string;
	public sufixoCssLoteriaSelecionada: string;
	private bd: any;

	constructor() {
		this.bd = ConexaoFabrica.getConexao();
		this.salveLoteriaSessao(Loterias.LOTOFACIL).then(resultadoQuery => {
			this.logoSelecionado = resultadoQuery.antigo.loteria.logo;
			this.nomeDaLoteria = resultadoQuery.antigo.loteria.nome;
			this.sufixoCssLoteriaSelecionada = resultadoQuery.antigo.loteria.sufixoCssLoteria;
		});
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
					resolve({ estado: 'criado', novo: { loteria: objLoteriaSessao }, antigo: null })
				} else {
					this.bd.get('sessao').then(sessao => {
						resolve({ estado: 'existente', novo: null, antigo: {loteria: sessao.loteria} });
					}).catch(erro => {
						console.log(erro);
					});
				}
			}).catch(erro => {
				console.log(erro);
			});
		});
	}
}
