import { LoadingController } from "ionic-angular";
import { Injectable } from "@angular/core";
import { BemVindoPage } from '../pages/bem-vindo/bem-vindo';
import { EstatisticaPage } from '../pages/estatistica/estatistica';
import { SimuladorPage } from '../pages/simulador/simulador';
import { FechamentoPage } from '../pages/fechamento/fechamento';
import { ApostaPage } from '../pages/aposta/aposta';
import { GruposEspeciaisPage } from '../pages/grupos-especiais/grupos-especiais';
import { BolaoPage } from '../pages/bolao/bolao';
import { HistoricoDeApostasPage } from '../pages/historico-de-apostas/historico-de-apostas';
import { ConcursoFacade } from "../dao/concurso/concurso-facade";
import { ConcursoDAOServico } from "../dao/concurso/concurso-dao.servico";
import { Loterias } from "../enum/loterias";
import { AtualizacaoContaPage } from "../pages/conta/atualizacao-conta";
import { LoginPage } from "../pages/login/login";

@Injectable()
export class MenuService {

	constructor(public loadingCtrl: LoadingController, public concursoDAOServico: ConcursoDAOServico) {
	}

	public getPaginas(estadoSessao) {
		let cor = '' + estadoSessao.loteria.cor.escuro + '';
		return [
			{ sufixoCssPagina: 'BemVindo', titulo: 'Bem Vindo', class: BemVindoPage, icone: 'home', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Estatistica', titulo: 'Estatística', class: EstatisticaPage, icone: 'trending-up', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Simulador', titulo: 'Simulador', class: SimuladorPage, icone: 'ios-car', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Fechamento', titulo: 'Fechamento', class: FechamentoPage, icone: 'md-lock', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Aposta', titulo: 'Aposta', class: ApostaPage, icone: 'md-cash', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'GruposEspeciais', titulo: 'Grupos Especiais', class: GruposEspeciaisPage, icone: 'md-grid', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Bolao', titulo: 'Bolão', class: BolaoPage, icone: 'ios-people', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'HistoricoDeApostas', titulo: 'Histórico de Apostas', class: HistoricoDeApostasPage, icone: 'ios-list-box-outline', corTexto: '#bbb', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Conta', titulo: 'Conta', class: AtualizacaoContaPage, icone: 'key', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Sair', titulo: 'Sair', class: LoginPage, icone: 'exit', corTexto: cor, exibir_texto: 'none' }
		];
	}

	public sincronizeOsConcursosDaLoteria(parametrosDeServicosWeb: any) {
		return new Promise(resolve => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let loading = this.loadingCtrl.create({
				content: 'Por favor aguarde, estou atualizando os resultados da ' + parametrosDeServicosWeb.nome + ' para sua análise...'
			});

			loading.present();

			concursoFacade.sincronize(parametrosDeServicosWeb).then(concursos => {
				resolve(concursos);
				loading.dismiss(concursos);
			});
		});
	}
	
	public getLoterias() {
		return [
			Loterias.LOTOFACIL,
			Loterias.MEGASENA,
			Loterias.QUINA,
			Loterias.LOTOMANIA,
			Loterias.TIMEMANIA,
			Loterias.DUPLASENA
		];
	}
}