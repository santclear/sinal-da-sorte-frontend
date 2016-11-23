import {Component} from '@angular/core';
import {ConexaoFabrica} from '../dao/util/conexao-fabrica';

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
		return this.bd.get('sessao').then(sessao => {
			// Caso já tenha sido inserido um dado de loteria na sessão
			if (sessao.loteria != undefined) {
				sessao.loteria.id = objLoteriaSessao.id;
				sessao.loteria.sufixoCssLoteria = objLoteriaSessao.sufixoCssLoteria;
				sessao.loteria.nome = objLoteriaSessao.nome;
				sessao.loteria.caminhoDoIconeAvatar = objLoteriaSessao.caminhoDoIconeAvatar;
				sessao.loteria.logo = objLoteriaSessao.logo;
				// Sobrescreve com o novo dado
				return this.bd.put(sessao);
			} else {// Se não cria um novo dado de loteria na sessão
				sessao.push(
					{
						loteria: {
							id: objLoteriaSessao.id,
							sufixoCssLoteria: objLoteriaSessao.sufixoCssLoteria,
							nome: objLoteriaSessao.nome,
							caminhoDoIconeAvatar: objLoteriaSessao.caminhoDoIconeAvatar,
							logo: objLoteriaSessao.logo
						}
					}
				);
				return this.bd.put(sessao);
			}

		}).then(() => {
			console.log('Loteria salva com sucesso na sessao => ' + JSON.stringify(objLoteriaSessao));
			return this.bd.get('sessao');
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
				console.log('Entidade sessão criada com sucesso. => ' + JSON.stringify(loteria));
				return this.bd.get('sessao');
			}).catch(erro => {
				console.log('Ocorreu um erro ao tentar criar a entidade sessão => ' + erro);
				return erro;
			});
		});
	}
}
