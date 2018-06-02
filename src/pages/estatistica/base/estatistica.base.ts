import { ConcursoFacade } from '../../../dao/concurso/concurso-facade';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { ConexaoFabrica } from '../../../dao/util/conexao-fabrica';
import { ElementRef } from '@angular/core';

export abstract class EstatisticaBase {
	protected canvas: ElementRef;
	protected dezena: string = '01';
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

	constructor(public concursoDAOServico: ConcursoDAOServico) {
		this.bd = ConexaoFabrica.getConexao();
        this.concursoFacade = new ConcursoFacade(this.concursoDAOServico);
		this.bd.get('sessao').then((sessao) => {
			let concursosPromise = this.concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				this.dezenas = sessao.loteria.dezenas;
			});
		});
    }

	cbxExtensaoDaFaixaDeConcursosAtualize(cbxExtensaoDaFaixaDeConcursosAtualizeOutput: any): void {
		this.canvas = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.canvas;
		this.rdSorteios = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.rdSorteios;
		this.numeroDoConcursoInicial = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal;

		this.atualizeOGrafico({
			canvas: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.canvas,
			dezena: this.dezena, 
			numeroDoConcursoInicial: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal, 
			rdSorteios: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.rdSorteios,
			dezenas: this.dezenas});
	}

	rgeFaixaDeConcursosAtualize(rgeFaixaDeConcursosAtualizeOutput: any): void {
		this.canvas = rgeFaixaDeConcursosAtualizeOutput.canvas;
		this.rdSorteios = rgeFaixaDeConcursosAtualizeOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal;

		this.atualizeOGrafico({
			canvas: rgeFaixaDeConcursosAtualizeOutput.canvas,
			dezena: this.dezena, 
			numeroDoConcursoInicial: rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeFaixaDeConcursosAtualizeOutput.rdSorteios,
			dezenas: this.dezenas});
	}

	rgeDesloqueParaEsquerda(rgeDesloqueParaEsquerdaOutput: any): void {
		this.canvas = rgeDesloqueParaEsquerdaOutput.canvas;
		this.rdSorteios = rgeDesloqueParaEsquerdaOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeDesloqueParaEsquerdaOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeDesloqueParaEsquerdaOutput.numeroDoConcursoFinal;
		
		this.atualizeOGrafico({
			canvas: rgeDesloqueParaEsquerdaOutput.canvas,
			dezena: this.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaEsquerdaOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaEsquerdaOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaEsquerdaOutput.rdSorteios,
			dezenas: this.dezenas});
	}

	rgeDesloqueParaDireita(rgeDesloqueParaDireitaOutput: any): void {
		this.canvas = rgeDesloqueParaDireitaOutput.canvas;
		this.rdSorteios = rgeDesloqueParaDireitaOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeDesloqueParaDireitaOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeDesloqueParaDireitaOutput.numeroDoConcursoFinal;

		this.atualizeOGrafico({
			canvas: rgeDesloqueParaDireitaOutput.canvas,
			dezena: this.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaDireitaOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaDireitaOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaDireitaOutput.rdSorteios,
			dezenas: this.dezenas});
	}

	rgeDesloqueParaEsquerdaEFC(rgeDesloqueParaEsquerdaEFCOutput: any): void {
		this.canvas = rgeDesloqueParaEsquerdaEFCOutput.canvas;
		this.rdSorteios = rgeDesloqueParaEsquerdaEFCOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoFinal;

		this.atualizeOGrafico({
			canvas: rgeDesloqueParaEsquerdaEFCOutput.canvas,
			dezena: this.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaEsquerdaEFCOutput.rdSorteios,
			dezenas: this.dezenas});
	}

	rgeDesloqueParaDireitaEFC(rgeDesloqueParaDireitaEFCOutput: any): void {
		this.canvas = rgeDesloqueParaDireitaEFCOutput.canvas;
		this.rdSorteios = rgeDesloqueParaDireitaEFCOutput.rdSorteios;
		this.numeroDoConcursoInicial = rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoInicial;
		this.numeroDoConcursoFinal = rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoFinal;

		this.atualizeOGrafico({
			canvas: rgeDesloqueParaDireitaEFCOutput.canvas,
			dezena: this.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaDireitaEFCOutput.rdSorteios,
			dezenas: this.dezenas});
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
						this.dezena, 
						sessao.loteria.nomeDoDocumentoNoBD, 
						atualizeOGraficoOutput.numeroDoConcursoInicial, 
						atualizeOGraficoOutput.numeroDoConcursoFinal, 
						atualizeOGraficoOutput.rdSorteios);

				concursosPromise.then(concursos => {
					this.canvas = atualizeOGraficoOutput.canvas;
					this.rdSorteios = atualizeOGraficoOutput.rdSorteios; 
					this.numeroDoConcursoInicial = atualizeOGraficoOutput.numeroDoConcursoInicial;
					this.numeroDoConcursoFinal = atualizeOGraficoOutput.numeroDoConcursoFinal;
					this.sufixoCssLoteria = sessao.loteria.nomeDoDocumentoNoBD;

					this.configureEstatistica(
						atualizeOGraficoOutput.canvas, 
						concursos, 
						this.dezena, 
						sessao, 
						atualizeOGraficoOutput.rdSorteios, 
						atualizeOGraficoOutput.numeroDoConcursoInicial, 
						atualizeOGraficoOutput.numeroDoConcursoFinal, 
						this.dezenas);
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