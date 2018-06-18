import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { LoadingController, Range} from 'ionic-angular';
import { ConcursoDAOServico } from '../../../dao/concurso/concurso-dao.servico';
import { ConcursoFacade } from '../../../dao/concurso/concurso-facade';
import { ConexaoFabrica } from '../../../dao/util/conexao-fabrica';
import { Loterias } from '../../../enum/loterias';
import lodash from 'lodash';

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
				this.extensoesDaFaixaDeConcursos = this.getExtensoesDaFaixaDeConcursos(concursos.maiorNumero, Loterias.FAIXA_DE_CONCURSO.extensoes)
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

	getExtensoesDaFaixaDeConcursos(numeroConcurso: number, extensaoDaFaixaDeConcursos: any) {
		if(numeroConcurso < 10) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 19);
		}
		if(numeroConcurso < 20) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 18);
		}
		if(numeroConcurso < 30) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 17);
		}
		if(numeroConcurso < 40) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 16);
		}
		if(numeroConcurso < 50) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 15);
		}
		if(numeroConcurso < 60) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 14);
		}
		if(numeroConcurso < 70) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 13);
		}
		if(numeroConcurso < 80) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 12);
		}
		if(numeroConcurso < 90) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 11);
		}
		if(numeroConcurso < 100) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 10);
		}
		if(numeroConcurso < 150) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 9);
		}
		if(numeroConcurso < 200) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 8);
		}
		if(numeroConcurso < 250) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 7);
		}
		if(numeroConcurso < 300) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 6);
		}
		if(numeroConcurso < 350) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 5);
		}
		if(numeroConcurso < 400) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 4);
		}
		if(numeroConcurso < 450) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 3);
		}
		if(numeroConcurso < 500) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 2);
		}
		if(numeroConcurso < 1000) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length - 1);
		}
		if(numeroConcurso >= 1000) {
			return lodash.slice(extensaoDaFaixaDeConcursos, 0, extensaoDaFaixaDeConcursos.length);
		}
	}
}
