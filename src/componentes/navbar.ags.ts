import { Component } from '@angular/core';
import { ConexaoFabrica } from '../dao/util/conexao-fabrica';

@Component({
	selector: "ags-navbar",
	inputs: ['tituloInput'],
	templateUrl: 'navbar.ags.html'
})
export class NavBarAgS {
	public logoSelecionado: string;
	private bd: any;

	constructor() {
		this.bd = ConexaoFabrica.getConexao();

		this.bd.get('sessao').then(sessao => {
			this.logoSelecionado = sessao.loteria.logo;
		}).catch(err => {// Caso não exista dados em sessão, salva com dados default
			this.salveOuAtualizeLoteriaSessao({
				id: 1,
				sufixoCssLoteria: 'Lotofacil',
				nome: 'Lotofácil',
				caminhoDoIconeAvatar: 'assets/img/lotofacil.png',
				logo: 'assets/img/logo-lotofacil.png'
			});
		});
	}

	private salveOuAtualizeLoteriaSessao(objLoteriaSessao) {
		// Caso exista a entidade sessão
		return new Promise(resolve => {
			this.bd.get('sessao').then(sessao => {
				// Caso já tenha sido inserido um dado de loteria na sessão
				if (sessao.loteria != undefined) {
					let novo = {
						_doc_id_rev: 'sessao::'+sessao._rev,
						loteria: {
							id: objLoteriaSessao.id,
							sufixoCssLoteria: objLoteriaSessao.sufixoCssLoteria,
							nome: objLoteriaSessao.nome,
							caminhoDoIconeAvatar: objLoteriaSessao.caminhoDoIconeAvatar,
							logo: objLoteriaSessao.logo
						}
					}
					// Sobrescreve com o novo dado
					return this.bd.put(novo);
				}

			}).then(() => {
				resolve('Loteria salva com sucesso na sessao => ' + JSON.stringify(objLoteriaSessao));
			}).catch(err => {// Caso não exista a entidade sessão
				this.logoSelecionado = objLoteriaSessao.logo;
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
					resolve('Entidade sessao criada com sucesso.');
				}).catch(erro => {
					console.log(erro);
				});
			});
		});
	}
}
