import { LoadingController } from "ionic-angular";
import { Injectable } from "@angular/core";
import { ConcursoFacade } from "../dao/concurso/concurso-facade";
import { ConcursoDAOServico } from "../dao/concurso/concurso-dao.servico";
import { Loterias } from "../enum/loterias";

@Injectable()
export class MenuService {

	constructor(public loadingCtrl: LoadingController, public concursoDAOServico: ConcursoDAOServico) {
	}

	public sincronizeOsConcursosDaLoteria(parametrosDeServicosWeb: any) {
		return new Promise(resolve => {
			let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
			let loading = this.loadingCtrl.create({
				content: 'Por favor aguarde, verificando se há concursos da ' + parametrosDeServicosWeb.nome + ' para serem atualizados... Esse processo pode demorar dependendo do seu dispositivo ou conexão.'
			});

			loading.present();

			concursoFacade.sincronize(parametrosDeServicosWeb).then(concursos => {
				resolve(concursos);
				loading.dismiss(concursos);
			}).catch(erro => {
				loading.dismiss();
			});
		});
	}

	public getPaginas(estadoSessao) {
		let cor = '' + estadoSessao.loteria.cor.escuro + '';
		return [
			{ sufixoCssPagina: 'Resultado', titulo: 'Resultados', class: 'ResultadoPage', icone: 'done-all', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Estatistica', titulo: 'Estatística', class: 'EstatisticaPage', icone: 'trending-up', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Conta', titulo: 'Conta', class: 'AtualizacaoContaPage', icone: 'key', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Contato', titulo: 'Contato', class: 'ContatoPage', icone: 'contact', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Sair', titulo: 'Sair', class: 'LoginPage', icone: 'exit', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Simulador', titulo: 'Simulador', class: 'SimuladorPage', icone: 'game-controller-b', corTexto: '#777', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Fechamento', titulo: 'Fechamento', class: 'FechamentoPage', icone: 'lock', corTexto: '#777', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Aposta', titulo: 'Geração de Volantes', class: 'ApostaPage', icone: 'document', corTexto: '#777', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'HistoricoDeApostas', titulo: 'Histórico de Volantes', class: 'HistoricoDeApostasPage', icone: 'list-box', corTexto: '#777', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Bolao', titulo: 'Bolão', class: 'BolaoPage', icone: 'people', corTexto: '#777', exibir_texto: 'inline' },
			// // { sufixoCssPagina: 'GruposEspeciais', titulo: 'Grupos Especiais', class: 'GruposEspeciaisPage', icone: 'grid', corTexto: '#777', exibir_texto: 'inline' },
			
			
			// { sufixoCssPagina: 'Resultado', titulo: 'Resultados', class: 'ResultadoPage', icone: 'done-all', corTexto: cor, exibir_texto: 'none' },
			// { sufixoCssPagina: 'Estatistica', titulo: 'Estatística', class: 'EstatisticaPage', icone: 'trending-up', corTexto: cor, exibir_texto: 'none' },
			// { sufixoCssPagina: 'Simulador', titulo: 'Simulador', class: 'SimuladorPage', icone: 'game-controller-b', corTexto: cor, exibir_texto: 'none' },
			// { sufixoCssPagina: 'Fechamento', titulo: 'Fechamento', class: 'FechamentoPage', icone: 'lock', corTexto: cor, exibir_texto: 'none' },
			// { sufixoCssPagina: 'Aposta', titulo: 'Geração de Volantes ', class: 'ApostaPage', icone: 'document', corTexto: cor, exibir_texto: 'none' },
			// { sufixoCssPagina: 'HistoricoDeApostas', titulo: 'Histórico de Volantes', class: 'HistoricoDeApostasPage', icone: 'list-box', corTexto: cor, exibir_texto: 'none' },
			// { sufixoCssPagina: 'Bolao', titulo: 'Bolão', class: 'BolaoPage', icone: 'people', corTexto: cor, exibir_texto: 'none' },
			// { sufixoCssPagina: 'Conta', titulo: 'Conta', class: 'AtualizacaoContaPage', icone: 'key', corTexto: cor, exibir_texto: 'none' },
			// { sufixoCssPagina: 'Contato', titulo: 'Contato', class: 'ContatoPage', icone: 'contact', corTexto: cor, exibir_texto: 'none' },
			// { sufixoCssPagina: 'Sair', titulo: 'Sair', class: 'LoginPage', icone: 'exit', corTexto: cor, exibir_texto: 'none' },
		];
	}
	
	public getLoterias() {
		return [
			Loterias.LOTOFACIL,
			Loterias.MEGASENA,
			Loterias.QUINA,
			Loterias.LOTOMANIA,
			Loterias.TIMEMANIA,
			Loterias.DUPLASENA,
			Loterias.DIADESORTE
		];
	}
}