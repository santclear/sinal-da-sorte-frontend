import { ConcursoFacade } from '../../../dao/concurso/concurso-facade';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { LoadingController } from 'ionic-angular';
import { ConexaoFabrica } from '../../../dao/util/conexao-fabrica';
import { ElementRef } from '@angular/core';

export abstract class EstatisticaBase {
	protected canvas: ElementRef;
	protected dezena: string;
	protected numeroDoConcursoInicial: number;
	protected numeroDoConcursoFinal: number;
	protected sufixoCssLoteria: string;
	protected rdSorteios: number; 
	protected dezenas: string[];
	// protected textoExtensaoDaFaixaDeConcursos: string;
	// protected textoQuantidadeDeAmostrasDeFrequencia: string;
	// protected textoPrevisaoPositiva: string;
	// protected textoPrevisaoNegativa: string;
	// protected iptPesquisaDeAmostraFrequencia: string = '';
	// protected exibirQuantidadeDeAmostrasDeFrequencia: boolean = false;
	protected toggleMostrarMaisEstatisticasChecked: boolean = false;
	protected bd: any;
	protected concursoFacade: ConcursoFacade;

	// ngDoCheck() {
	// 	if(this.iptPesquisaDeAmostraFrequencia == '' || this.iptPesquisaDeAmostraFrequencia == undefined) {
	// 		this.textoExtensaoDaFaixaDeConcursos = '';
	// 		this.textoQuantidadeDeAmostrasDeFrequencia = '';
	// 		this.textoPrevisaoPositiva = '';
	// 		this.textoPrevisaoNegativa = '';
	// 		this.exibirQuantidadeDeAmostrasDeFrequencia = false;
	// 	} else {
	// 		this.exibirQuantidadeDeAmostrasDeFrequencia = true;
	// 	}
	// }

	constructor(public concursoDAOServico: ConcursoDAOServico, public loadingCtrl: LoadingController) {
		this.bd = ConexaoFabrica.getConexao();
        this.concursoFacade = new ConcursoFacade(this.concursoDAOServico);
    }

	cbxExtensaoDaFaixaDeConcursosAtualize(cbxExtensaoDaFaixaDeConcursosAtualizeOutput: any): void {
		this.canvas = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.canvas;
		this.dezena = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.dezena; 
		this.rdSorteios = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.rdSorteios;
		this.numeroDoConcursoInicial = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal;
		this.dezenas = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.dezenas;

		this.atualizeOGrafico({
			canvas: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.canvas,
			dezena: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.dezena, 
			numeroDoConcursoInicial: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal, 
			rdSorteios: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.rdSorteios,
			dezenas: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.dezenas});
	}

	rgeFaixaDeConcursosAtualize(rgeFaixaDeConcursosAtualizeOutput: any): void {
		this.canvas = rgeFaixaDeConcursosAtualizeOutput.canvas;
		this.dezena = rgeFaixaDeConcursosAtualizeOutput.dezena; 
		this.rdSorteios = rgeFaixaDeConcursosAtualizeOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal;
		this.dezenas = rgeFaixaDeConcursosAtualizeOutput.dezenas;

		this.atualizeOGrafico({
			canvas: rgeFaixaDeConcursosAtualizeOutput.canvas,
			dezena: rgeFaixaDeConcursosAtualizeOutput.dezena, 
			numeroDoConcursoInicial: rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeFaixaDeConcursosAtualizeOutput.rdSorteios,
			dezenas: rgeFaixaDeConcursosAtualizeOutput.dezenas});
	}

	rgeDesloqueParaEsquerda(rgeDesloqueParaEsquerdaOutput: any): void {
		this.canvas = rgeDesloqueParaEsquerdaOutput.canvas;
		this.dezena = rgeDesloqueParaEsquerdaOutput.dezena; 
		this.rdSorteios = rgeDesloqueParaEsquerdaOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeDesloqueParaEsquerdaOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeDesloqueParaEsquerdaOutput.numeroDoConcursoFinal;
		this.dezenas = rgeDesloqueParaEsquerdaOutput.dezenas;

		this.atualizeOGrafico({
			canvas: rgeDesloqueParaEsquerdaOutput.canvas,
			dezena: rgeDesloqueParaEsquerdaOutput.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaEsquerdaOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaEsquerdaOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaEsquerdaOutput.rdSorteios,
			dezenas: rgeDesloqueParaEsquerdaOutput.dezenas});
	}

	rgeDesloqueParaDireita(rgeDesloqueParaDireitaOutput: any): void {
		this.canvas = rgeDesloqueParaDireitaOutput.canvas;
		this.dezena = rgeDesloqueParaDireitaOutput.dezena; 
		this.rdSorteios = rgeDesloqueParaDireitaOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeDesloqueParaDireitaOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeDesloqueParaDireitaOutput.numeroDoConcursoFinal;
		this.dezenas = rgeDesloqueParaDireitaOutput.dezenas;

		this.atualizeOGrafico({
			canvas: rgeDesloqueParaDireitaOutput.canvas,
			dezena: rgeDesloqueParaDireitaOutput.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaDireitaOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaDireitaOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaDireitaOutput.rdSorteios,
			dezenas: rgeDesloqueParaDireitaOutput.dezenas});
	}

	rgeDesloqueParaEsquerdaEFC(rgeDesloqueParaEsquerdaEFCOutput: any): void {
		this.canvas = rgeDesloqueParaEsquerdaEFCOutput.canvas;
		this.dezena = rgeDesloqueParaEsquerdaEFCOutput.dezena; 
		this.rdSorteios = rgeDesloqueParaEsquerdaEFCOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoFinal;
		this.dezenas = rgeDesloqueParaEsquerdaEFCOutput.dezenas;

		this.atualizeOGrafico({
			canvas: rgeDesloqueParaEsquerdaEFCOutput.canvas,
			dezena: rgeDesloqueParaEsquerdaEFCOutput.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaEsquerdaEFCOutput.rdSorteios,
			dezenas: rgeDesloqueParaEsquerdaEFCOutput.dezenas});
	}

	rgeDesloqueParaDireitaEFC(rgeDesloqueParaDireitaEFCOutput: any): void {
		this.canvas = rgeDesloqueParaDireitaEFCOutput.canvas;
		this.dezena = rgeDesloqueParaDireitaEFCOutput.dezena; 
		this.rdSorteios = rgeDesloqueParaDireitaEFCOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoFinal;
		this.dezenas = rgeDesloqueParaDireitaEFCOutput.dezenas;

		this.atualizeOGrafico({
			canvas: rgeDesloqueParaDireitaEFCOutput.canvas,
			dezena: rgeDesloqueParaDireitaEFCOutput.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaDireitaEFCOutput.rdSorteios,
			dezenas: rgeDesloqueParaDireitaEFCOutput.dezenas});
	}

	toggleMostreMaisEstatisticas(toggleMostreMaisEstatisticasOutput: any): void {
		this.toggleMostrarMaisEstatisticasChecked = toggleMostreMaisEstatisticasOutput.checked;
		if(this.toggleMostrarMaisEstatisticasChecked) {
			this.atualizeFrequênciasDasDezenas(
				this.dezena, 
				this.numeroDoConcursoInicial, 
				this.numeroDoConcursoFinal, 
				this.rdSorteios, 
				this.dezenas);
		}
	}

	atualizeOGrafico(atualizeOGraficoOutput: any): void {
		if(atualizeOGraficoOutput.rdSorteios !== undefined) {
			this.bd.get('sessao').then(sessao => {
				let concursosPromise = this.concursoFacade.procurePorConcursosQueContenhamADezenaDentroDoIntervalo(
						atualizeOGraficoOutput.dezena, 
						sessao.loteria.nomeDoDocumentoNoBD, 
						atualizeOGraficoOutput.numeroDoConcursoInicial, 
						atualizeOGraficoOutput.numeroDoConcursoFinal, 
						atualizeOGraficoOutput.rdSorteios);

				concursosPromise.then(concursos => {
					this.canvas = atualizeOGraficoOutput.canvas;
					this.dezena = atualizeOGraficoOutput.dezena; 
					this.rdSorteios = atualizeOGraficoOutput.rdSorteios; 
					this.numeroDoConcursoInicial = atualizeOGraficoOutput.numeroDoConcursoInicial;
					this.numeroDoConcursoFinal = atualizeOGraficoOutput.numeroDoConcursoFinal;
					this.dezenas = atualizeOGraficoOutput.dezenas;
					this.sufixoCssLoteria = sessao.loteria.nomeDoDocumentoNoBD;

					this.configureEstatistica(
						atualizeOGraficoOutput.canvas, 
						concursos, 
						atualizeOGraficoOutput.dezena, 
						sessao, 
						atualizeOGraficoOutput.rdSorteios, 
						atualizeOGraficoOutput.numeroDoConcursoInicial, 
						atualizeOGraficoOutput.numeroDoConcursoFinal, 
						atualizeOGraficoOutput.dezenas);
				});
			});
		} else {
			this.bd.get('sessao').then(sessao => {
				let concursosPromise = this.concursoFacade.procurePorConcursosQueContenhamADezenaDentroDoIntervalo(
						this.dezena, 
						sessao.loteria.nomeDoDocumentoNoBD, 
						this.numeroDoConcursoInicial, 
						this.numeroDoConcursoFinal, 
						atualizeOGraficoOutput);

				concursosPromise.then(concursos => {
					this.sufixoCssLoteria = sessao.loteria.nomeDoDocumentoNoBD;

					this.configureEstatistica(
						this.canvas,
						concursos,
						this.dezena,
						sessao,
						this.rdSorteios,
						this.numeroDoConcursoInicial,
						this.numeroDoConcursoFinal,
						this.dezenas);
				});
			});
		}
	}

	abstract configureEstatistica(canvas: ElementRef, concursos: any, dezena: string, sessao: any, numeroDoSorteio: number, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, dezenas: string[]): void;
	abstract atualizeFrequênciasDasDezenas(dezena: string, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, numeroDoSorteio: number, dezenas: string[]): void;
}