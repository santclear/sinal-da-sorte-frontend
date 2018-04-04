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
				content: 'Por favor aguarde, estou atualizando os resultados da ' + parametrosDeServicosWeb.nome + ' para sua análise...'
			});

			loading.present();

			concursoFacade.sincronize(parametrosDeServicosWeb).then(concursos => {
				resolve(concursos);
				loading.dismiss(concursos);
			});
		});
	}

	public getPaginas(estadoSessao) {
		let cor = '' + estadoSessao.loteria.cor.escuro + '';
		return [
			{ sufixoCssPagina: 'Resultado', titulo: 'Resultado', class: 'ResultadoPage', icone: 'done-all', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Estatistica', titulo: 'Estatística', class: 'EstatisticaPage', icone: 'trending-up', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Conta', titulo: 'Conta', class: 'AtualizacaoContaPage', icone: 'key', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Sair', titulo: 'Sair', class: 'LoginPage', icone: 'exit', corTexto: cor, exibir_texto: 'none' },
			{ sufixoCssPagina: 'Simulador', titulo: 'Simulador', class: 'SimuladorPage', icone: 'car', corTexto: '#777', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Fechamento', titulo: 'Fechamento', class: 'FechamentoPage', icone: 'lock', corTexto: '#777', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Aposta', titulo: 'Aposta', class: 'ApostaPage', icone: 'cash', corTexto: '#777', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'GruposEspeciais', titulo: 'Grupos Especiais', class: 'GruposEspeciaisPage', icone: 'grid', corTexto: '#777', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'Bolao', titulo: 'Bolão', class: 'BolaoPage', icone: 'people', corTexto: '#777', exibir_texto: 'inline' },
			{ sufixoCssPagina: 'HistoricoDeApostas', titulo: 'Histórico de Apostas', class: 'HistoricoDeApostasPage', icone: 'list-box', corTexto: '#777', exibir_texto: 'inline' },
		];
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