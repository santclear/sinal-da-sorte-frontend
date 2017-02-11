import { ConcursoFacade } from '../../../dao/concurso/concurso-facade';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { LoadingController } from 'ionic-angular';
import { ConexaoFabrica } from '../../../dao/util/conexao-fabrica';
import { ElementRef } from '@angular/core';

export abstract class EstatisticaBase {
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
		this.atualizeOGrafico({
			canvas: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.canvas,
			dezena: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.dezena, 
			numeroDoConcursoInicial: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal, 
			rdSorteios: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.rdSorteios,
			dezenas: cbxExtensaoDaFaixaDeConcursosAtualizeOutput.dezenas});
	}

	rgeFaixaDeConcursosAtualize(rgeFaixaDeConcursosAtualizeOutput: any): void {
		this.atualizeOGrafico({
			canvas: rgeFaixaDeConcursosAtualizeOutput.canvas,
			dezena: rgeFaixaDeConcursosAtualizeOutput.dezena, 
			numeroDoConcursoInicial: rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeFaixaDeConcursosAtualizeOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeFaixaDeConcursosAtualizeOutput.rdSorteios,
			dezenas: rgeFaixaDeConcursosAtualizeOutput.dezenas});
	}

	rgeDesloqueParaEsquerda(rgeDesloqueParaEsquerdaOutput: any): void {
		this.atualizeOGrafico({
			canvas: rgeDesloqueParaEsquerdaOutput.canvas,
			dezena: rgeDesloqueParaEsquerdaOutput.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaEsquerdaOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaEsquerdaOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaEsquerdaOutput.rdSorteios,
			dezenas: rgeDesloqueParaEsquerdaOutput.dezenas});
	}

	rgeDesloqueParaDireita(rgeDesloqueParaDireitaOutput: any): void {
		this.atualizeOGrafico({
			canvas: rgeDesloqueParaDireitaOutput.canvas,
			dezena: rgeDesloqueParaDireitaOutput.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaDireitaOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaDireitaOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaDireitaOutput.rdSorteios,
			dezenas: rgeDesloqueParaDireitaOutput.dezenas});
	}

	rgeDesloqueParaEsquerdaEFC(rgeDesloqueParaEsquerdaEFCOutput: any): void {
		this.atualizeOGrafico({
			canvas: rgeDesloqueParaEsquerdaEFCOutput.canvas,
			dezena: rgeDesloqueParaEsquerdaEFCOutput.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaEsquerdaEFCOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaEsquerdaEFCOutput.rdSorteios,
			dezenas: rgeDesloqueParaEsquerdaEFCOutput.dezenas});
	}

	rgeDesloqueParaDireitaEFC(rgeDesloqueParaDireitaEFCOutput: any): void {
		this.atualizeOGrafico({
			canvas: rgeDesloqueParaDireitaEFCOutput.canvas,
			dezena: rgeDesloqueParaDireitaEFCOutput.dezena, 
			numeroDoConcursoInicial: rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: rgeDesloqueParaDireitaEFCOutput.numeroDoConcursoFinal, 
			rdSorteios: rgeDesloqueParaDireitaEFCOutput.rdSorteios,
			dezenas: rgeDesloqueParaDireitaEFCOutput.dezenas});
	}

	selecioneDezena(selecioneDezenaOutput: any): void {
		this.atualizeOGrafico({
			canvas: selecioneDezenaOutput.canvas,
			dezena: selecioneDezenaOutput.dezena, 
			numeroDoConcursoInicial: selecioneDezenaOutput.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: selecioneDezenaOutput.numeroDoConcursoFinal, 
			rdSorteios: selecioneDezenaOutput.rdSorteios,
			dezenas: selecioneDezenaOutput.dezenas});
	}

	toggleMostreMaisEstatisticas(toggleMostreMaisEstatisticasOutput: any): void {
		this.toggleMostrarMaisEstatisticasChecked = toggleMostreMaisEstatisticasOutput.checked;
		if(this.toggleMostrarMaisEstatisticasChecked) {
			this.atualizeFrequênciasDasDezenas(
				toggleMostreMaisEstatisticasOutput.dezena, 
				toggleMostreMaisEstatisticasOutput.numeroDoConcursoInicial, 
				toggleMostreMaisEstatisticasOutput.numeroDoConcursoFinal, 
				toggleMostreMaisEstatisticasOutput.rdSorteios, 
				toggleMostreMaisEstatisticasOutput.dezenas);
		}
	}

	atualizeOGrafico(atualizeOGraficoOutput: any): void {
		if(atualizeOGraficoOutput.rdSorteios !== undefined) {
			this.bd.get('sessao').then(sessao => {
				let concursosPromise = this.concursoFacade.procurePorConcursosQueContenhamADezenaDentroDoIntervalo(atualizeOGraficoOutput.dezena, sessao.loteria.nomeDoDocumentoNoBD, atualizeOGraficoOutput.numeroDoConcursoInicial, atualizeOGraficoOutput.numeroDoConcursoFinal, atualizeOGraficoOutput.rdSorteios);
				concursosPromise.then(concursos => {
					this.configureEstatistica(
						atualizeOGraficoOutput.canvas, 
						concursos, 
						atualizeOGraficoOutput.dezena, 
						sessao, atualizeOGraficoOutput.rdSorteios, 
						atualizeOGraficoOutput.numeroDoConcursoInicial, 
						atualizeOGraficoOutput.numeroDoConcursoFinal, 
						atualizeOGraficoOutput.dezenas);
				});
			});
		}
	}

	abstract configureEstatistica(canvas: ElementRef, concursos: any, dezena: string, sessao: any, numeroDoSorteio: number, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, dezenas: string[]): void;
	abstract atualizeFrequênciasDasDezenas(dezena: string, numeroDoConcursoInicial: number, numeroDoConcursoFinal: number, numeroDoSorteio: number, dezenas: string[]): void;
}
