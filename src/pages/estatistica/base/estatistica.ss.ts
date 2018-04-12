import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { LoadingController, Range} from 'ionic-angular';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { ConcursoFacade } from '../../../dao/concurso/concurso-facade';
import { ConexaoFabrica } from '../../../dao/util/conexao-fabrica';
import { Loterias } from '../../../enum/loterias';

@Component({
	selector: 'ss-estatistica',
    templateUrl: 'estatistica.ss.html'
})
export class EstatisticaSs {
	@ViewChild('grafico') public canvas: ElementRef;
	
	public rdSorteios: number = 0;
	public cbxExtensaoDaFaixaDeConcursos: number = 10;
	public extensoesDaFaixaDeConcursos: any;
	public extensaoDaFaixaDeConcurso: number;
	public extensaoDaFaixaDeConcursoAnterior: number;
	public rgeFaixaDeConcursos: number;
	public rgeFaixaDeConcursosMin: number;
	public rgeFaixaDeConcursosMax: number;
	public numeroDoConcursoInicial: number;
	public numeroDoConcursoFinal: number;
	public sufixoCssLoteria: string;
	public isDuplasena: boolean = false;
	public bd: any;
	public concursoFacade: ConcursoFacade;
	
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
				this.numeroDoConcursoInicial = concursos.maiorNumero - 9;
				this.numeroDoConcursoFinal = concursos.maiorNumero;
				this.extensoesDaFaixaDeConcursos = Loterias.FAIXA_DE_CONCURSO.extensoes;
				this.sufixoCssLoteria = sessao.loteria.nomeDoDocumentoNoBD;
				this.isDuplasena = this.sufixoCssLoteria === 'duplasena' ? true : false;
				this.cbxExtensaoDaFaixaDeConcursosAtualize(this.cbxExtensaoDaFaixaDeConcursos);
				this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso + 1;
				this.rgeFaixaDeConcursosMax = this.numeroDoConcursoFinal;
				this.rgeFaixaDeConcursos = this.numeroDoConcursoFinal;
				this.atualizeOGrafico(this.rdSorteios);
			});
		});
	}

	cbxExtensaoDaFaixaDeConcursosAtualize(valorExtensaoDaFaixaDeConcursos: number): void {
		if (this.extensoesDaFaixaDeConcursos != undefined) {
			this.extensaoDaFaixaDeConcursoAnterior = this.extensaoDaFaixaDeConcurso;
			this.extensaoDaFaixaDeConcurso = Number(valorExtensaoDaFaixaDeConcursos) - 1;
			this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso + 1;
		}

		if (this.rgeFaixaDeConcursos != undefined) {
			this.bd.get('sessao').then(sessao => {
				let concursosPromise = this.concursoFacade.procurePorNumeroDoUltimoConcursoSorteado(sessao.loteria.nomeDoDocumentoNoBD);
				concursosPromise.then(concursos => {
					this.atualizeRotulosDoRgeFaixaDeConcursos(concursos);
					this.cbxExtensaoDaFaixaDeConcursosAtualizeOutput.emit({
						canvas: this.canvas, 
						numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
						numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
						rdSorteios: this.rdSorteios});
				});
			});
		}
	}

	rgeFaixaDeConcursosAtualize(concursoFinal: Range): void {
		let obj;
		if(this.numeroDoConcursoInicial == 0) {
			this.numeroDoConcursoInicial = 1;
			this.numeroDoConcursoFinal = this.cbxExtensaoDaFaixaDeConcursos;
			obj = {
				canvas: this.canvas, 
				numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
				numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
				rdSorteios: this.rdSorteios
			};
			this.rgeFaixaDeConcursosAtualizeOutput.emit(obj);
		} else {
			this.numeroDoConcursoInicial = concursoFinal.value - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = concursoFinal.value;
			obj = {
				canvas: this.canvas, 
				numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
				numeroDoConcursoFinal: this.numeroDoConcursoFinal,
				rdSorteios: this.rdSorteios
			};
			this.rgeFaixaDeConcursosAtualizeOutput.emit(obj);
		}
	}

	rgeDesloqueParaEsquerda(event: any): void {
		if (this.rgeFaixaDeConcursos > this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial--;
			this.numeroDoConcursoFinal--;
			this.rgeFaixaDeConcursos--;
		
			this.rgeDesloqueParaEsquerdaOutput.emit({
				canvas: this.canvas, 
				numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
				numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
				rdSorteios: this.rdSorteios});
		}
	}

	rgeDesloqueParaDireita(event: any): void {
		if (this.rgeFaixaDeConcursos < this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial++;
			this.numeroDoConcursoFinal++;
			this.rgeFaixaDeConcursos++;
		
			this.rgeDesloqueParaDireitaOutput.emit({
				canvas: this.canvas, 
				numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
				numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
				rdSorteios: this.rdSorteios});
		}
	}

	rgeDesloqueParaEsquerdaEFC(event: any): void {
		let subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso = this.numeroDoConcursoFinal - this.extensaoDaFaixaDeConcurso;
		if (subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso >= this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial = this.numeroDoConcursoInicial - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = subNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursos - this.extensaoDaFaixaDeConcurso;
			this.rgeDesloqueParaEsquerdaEFCOutput.emit({
				canvas: this.canvas, 
				numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
				numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
				rdSorteios: this.rdSorteios});
		} else {
			this.numeroDoConcursoInicial = this.rgeFaixaDeConcursosMin - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = this.rgeFaixaDeConcursosMin;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursosMin;
		}
	}

	rgeDesloqueParaDireitaEFC(event: any): void {
		let sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso = this.numeroDoConcursoFinal + this.extensaoDaFaixaDeConcurso;
		if (sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso <= this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial = this.numeroDoConcursoInicial + this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = sumNumeroDoConcursoFinalEExtensaoDaFaixaDeConcurso;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursos + this.extensaoDaFaixaDeConcurso;
			this.rgeDesloqueParaDireitaEFCOutput.emit({
				canvas: this.canvas, 
				numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
				numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
				rdSorteios: this.rdSorteios});
		} else {
			this.numeroDoConcursoInicial = this.rgeFaixaDeConcursosMax - this.extensaoDaFaixaDeConcurso;
			this.numeroDoConcursoFinal = this.rgeFaixaDeConcursosMax;
			this.rgeFaixaDeConcursos = this.rgeFaixaDeConcursosMax;
		}
	}

	atualizeOGrafico(rdSorteios: number): void {
		this.rdSorteios = rdSorteios;
		this.atualizeOGraficoOutput.emit({
			canvas: this.canvas, 
			numeroDoConcursoInicial: this.numeroDoConcursoInicial, 
			numeroDoConcursoFinal: this.numeroDoConcursoFinal, 
			rdSorteios: this.rdSorteios,
			sufixoCssLoteria: this.sufixoCssLoteria
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
