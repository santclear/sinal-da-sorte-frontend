import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { LoadingController, Range} from 'ionic-angular';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { ConcursoFacade } from '../../../dao/concurso/concurso-facade';
import { ConexaoFabrica } from '../../../dao/util/conexao-fabrica';
import { Loterias } from '../../../enum/loterias';

@Component({
	selector: 'ags-estatistica',
    templateUrl: 'estatistica.ags.html'
})
export class EstatisticaAgs {
	@ViewChild('grafico') protected canvas: ElementRef;

	// public cbxTipoDeGrafico: string;
	private rdSorteios: number = 0;
	private cbxExtensaoDaFaixaDeConcursos: number = 9;
	private extensoesDaFaixaDeConcursos: any;
	private extensaoDaFaixaDeConcurso: number;
	private extensaoDaFaixaDeConcursoAnterior: number;
	private rgeFaixaDeConcursos: number;
	private rgeFaixaDeConcursosMin: number;
	private rgeFaixaDeConcursosMax: number;
	private numeroDoConcursoInicial: number;
	private numeroDoConcursoFinal: number;
	private sufixoCssLoteria: string;
	private isDuplasena: boolean = false;
	private dezena: string = '01';
	private bd: any;
	private dezenas: string[] = [];
	private concursoFacade: ConcursoFacade;
	
	@Output() canvasOutput = new EventEmitter();
	@Output() cbxExtensaoDaFaixaDeConcursosAtualizeOutput = new EventEmitter();
	@Output() rgeFaixaDeConcursosAtualizeOutput = new EventEmitter();
	@Output() rgeDesloqueParaEsquerdaOutput = new EventEmitter();
	@Output() rgeDesloqueParaDireitaOutput = new EventEmitter();
	@Output() rgeDesloqueParaEsquerdaEFCOutput = new EventEmitter();
	@Output() rgeDesloqueParaDireitaEFCOutput = new EventEmitter();
	@Output() selecioneDezenaOutput = new EventEmitter();
	@Output() toggleMostreMaisEstatisticasOutput = new EventEmitter();
	@Output() atualizeOGraficoOutput = new EventEmitter();

	constructor(public concursoDAOServico: ConcursoDAOServico, public loadingCtrl: LoadingController) {
		this.concursoFacade = new ConcursoFacade(this.concursoDAOServico);
		this.bd = ConexaoFabrica.getConexao();
		this.bd.get('sessao').then((sessao) => {
			let concursosPromise = this.concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				this.numeroDoConcursoInicial = concursos.maiorNumero -9;
				this.numeroDoConcursoFinal = concursos.maiorNumero;
				this.extensoesDaFaixaDeConcursos = Loterias.FAIXA_DE_CONCURSO.extensoes;
				this.sufixoCssLoteria = sessao.loteria.nomeDoDocumentoNoBD;
				this.isDuplasena = this.sufixoCssLoteria === 'duplasena' ? true : false;
				this.dezenas = sessao.loteria.dezenas;
				this.cbxExtensaoDaFaixaDeConcursosAtualize(this.cbxExtensaoDaFaixaDeConcursos);
				this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso;
				this.rgeFaixaDeConcursosMax = this.numeroDoConcursoFinal;
				this.rgeFaixaDeConcursos = this.numeroDoConcursoFinal;
				this.atualizeOGrafico(this.rdSorteios);
			});
		});
	}

	cbxExtensaoDaFaixaDeConcursosAtualize(valorExtensaoDaFaixaDeConcursos: number): void {
		if (this.extensoesDaFaixaDeConcursos != undefined) {
			this.extensaoDaFaixaDeConcursoAnterior = this.extensaoDaFaixaDeConcurso;
			this.extensaoDaFaixaDeConcurso = Number(valorExtensaoDaFaixaDeConcursos);
			this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso;
		}

		if (this.rgeFaixaDeConcursos != undefined) {
			this.bd.get('sessao').then(sessao => {
				let concursosPromise = this.concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
				concursosPromise.then(concursos => {
					this.atualizeRotulosDoRgeFaixaDeConcursos(concursos);
					this.cbxExtensaoDaFaixaDeConcursosAtualizeOutput.emit({
						canvas: this.canvas, 
						dezena: this.dezena, 
						numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
						numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
						rdSorteios: this.rdSorteios});
				});
			});
		}
	}

	rgeFaixaDeConcursosAtualize(concursoFinal: Range): void {
		if(this.numeroDoConcursoInicial == 0) {
			this.rgeFaixaDeConcursosMin = concursoFinal.value +1;
			this.rgeFaixaDeConcursosAtualizeOutput.emit({
				canvas: this.canvas, 
				dezena: this.dezena, 
				numeroDoConcursoInicial: 1, 
				numeroDoConcursoFinal: concursoFinal.value +1, 
				rdSorteios: this.rdSorteios});
		} else {
			this.rgeFaixaDeConcursosAtualizeOutput.emit({
				canvas: this.canvas, 
				dezena: this.dezena, 
				numeroDoConcursoInicial: concursoFinal.value - this.extensaoDaFaixaDeConcurso, 
				numeroDoConcursoFinal: concursoFinal.value, 
				rdSorteios: this.rdSorteios});
		}
	}

	rgeDesloqueParaEsquerda(event: any): void {
		if (this.rgeFaixaDeConcursos > this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial--;
			this.numeroDoConcursoFinal--;
			this.rgeFaixaDeConcursos--;
		}
		this.rgeDesloqueParaEsquerdaOutput.emit({
			canvas: this.canvas, 
			dezena: this.dezena, 
			numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
			rgeFaixaDeConcursos: this.rgeFaixaDeConcursos, 
			rdSorteios: this.rdSorteios});
	}

	rgeDesloqueParaDireita(event: any): void {
		if (this.rgeFaixaDeConcursos < this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial++;
			this.numeroDoConcursoFinal++;
			this.rgeFaixaDeConcursos++;
		}
		this.rgeDesloqueParaDireitaOutput.emit({
			canvas: this.canvas, 
			dezena: this.dezena, 
			numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
			rgeFaixaDeConcursos: this.rgeFaixaDeConcursos, 
			rdSorteios: this.rdSorteios});
	}

	rgeDesloqueParaEsquerdaEFC(event: any): void {
		let subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso
		if (subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso >= this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial = this.numeroDoConcursoInicial - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursos - this.extensaoDaFaixaDeConcurso;
		} else {
			this.numeroDoConcursoInicial = this.rgeFaixaDeConcursosMin - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = this.rgeFaixaDeConcursosMin;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursosMin;
		}
		this.rgeDesloqueParaEsquerdaEFCOutput.emit({
			canvas: this.canvas, 
			dezena: this.dezena, 
			numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
			rgeFaixaDeConcursos: this.rgeFaixaDeConcursos, 
			rdSorteios: this.rdSorteios});
	}

	rgeDesloqueParaDireitaEFC(event: any): void {
		let sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso = this.numeroDoConcursoFinal + this.extensaoDaFaixaDeConcurso;
		if (sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso <= this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial = this.numeroDoConcursoInicial + this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursos + this.extensaoDaFaixaDeConcurso;
		} else {
			this.numeroDoConcursoInicial = this.rgeFaixaDeConcursosMax - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = this.rgeFaixaDeConcursosMax;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursosMax;
		}
		this.rgeDesloqueParaDireitaEFCOutput.emit({
			canvas: this.canvas, 
			dezena: this.dezena, 
			numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
			rgeFaixaDeConcursos: this.rgeFaixaDeConcursos, 
			rdSorteios: this.rdSorteios});
	}

	destaqueDezena(dezenaSelecionada: string): boolean {
		return dezenaSelecionada == this.dezena;
	}

	selecioneDezena(iDezena: number, rdSorteios: number): void {
		this.dezena = this.dezenas[iDezena];
		this.selecioneDezenaOutput.emit({
			canvas: this.canvas, 
			dezena: this.dezena, 
			numeroDoConcursoInicial: this.numeroDoConcursoInicial,
			numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
			rdSorteios: this.rdSorteios});
	}

	toggleMostreMaisEstatisticas(toggleMostrarMaisEstatisticas: any): void {
		this.toggleMostreMaisEstatisticasOutput.emit({
			checked: toggleMostrarMaisEstatisticas.checked,
			dezena: this.dezena, 
			numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: this.numeroDoConcursoFinal,
			rdSorteios: this.rdSorteios,
			dezenas: this.dezenas
		})
	}

	atualizeOGrafico(rdSorteios: number): void {
		this.rdSorteios = rdSorteios;
		this.atualizeOGraficoOutput.emit({
			canvas: this.canvas, 
			dezena: this.dezena, 
			numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
			rdSorteios: this.rdSorteios,
			dezenas: this.dezenas
		})
	}

	atualizeRotulosDoRgeFaixaDeConcursos(concursos: any): void {
		if (this.rgeFaixaDeConcursos != undefined) {
			if (this.extensaoDaFaixaDeConcurso + this.rgeFaixaDeConcursos <= concursos.maiorNumero) {
				this.numeroDoConcursoFinal = this.extensaoDaFaixaDeConcurso - this.extensaoDaFaixaDeConcursoAnterior + this.rgeFaixaDeConcursos;
				this.numeroDoConcursoInicial = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso;
				this.rgeFaixaDeConcursos = this.numeroDoConcursoFinal;
			} else {
				this.numeroDoConcursoFinal = concursos.maiorNumero;
				this.numeroDoConcursoInicial = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso;
				this.rgeFaixaDeConcursos = concursos.maiorNumero;
			}
		}
	}
}
