import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { PaginaBase } from '../pagina.base';
import { ConexaoFabrica } from '../../dao/util/conexao-fabrica';
import { ConcursoFacade } from '../../dao/concurso/concurso-facade';
import { ConcursoDAOServico } from '../../dao/concurso/concurso-dao.servico';


@Component({
	selector: 'pagina-bem-vindo',
	templateUrl: 'bem-vindo.html'
})
export class BemVindoPage extends PaginaBase {
	public numeroDoConcurso;
	public dataDoSorteio;
	public dezenas = [];
	public exibeDezenasComQuebraDeLinha: boolean;
	public estimativaDePremioParaOProximoConcurso;
	public acumuladoEspecial;
	public labelAcumuladoEspecial;
	public rgeFaixaDeConcursos: number;
	public numeroDoConcursoInicial: number;
	public numeroDoConcursoFinal: number;
	public rgeFaixaDeConcursosMin: number;
	public rgeFaixaDeConcursosMax: number;
	public extensaoDaFaixaDeConcurso: number;
	public bd;

	constructor(public nav: NavController, private menu: MenuController, public concursoDAOServico: ConcursoDAOServico) {
		super();
		this.setTitulo("Bem Vindo");

		this.bd = ConexaoFabrica.getConexao();

		let concursoFacade = new ConcursoFacade(this.concursoDAOServico);
		this.bd.get('sessao').then((sessao) => {
			let concursosPromise = concursoFacade.procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(sessao.loteria.nomeDoDocumentoNoBD);
			concursosPromise.then(concursos => {
				let concursoPromise = concursoFacade.procurePorUnicoConcurso(sessao.loteria.nomeDoDocumentoNoBD, concursos.maiorNumero);
				concursoPromise.then(concurso => {
					this.numeroDoConcurso = concurso.numero;
					this.dataDoSorteio = concurso.dataDoSorteio;
					let numerosSorteados = concurso.sorteios[0].numerosSorteados;
					let numerosSorteadosSplit = numerosSorteados.split(';');
					this.dezenas = numerosSorteadosSplit.sort(function (a, b) { return a - b });
					console.log(this.dezenas)
					this.estimativaDePremioParaOProximoConcurso = concurso.estimativaDePremioParaOProximoConcurso;
					this.acumuladoEspecial = concurso.acumuladoEspecial;
					this.labelAcumuladoEspecial = sessao.loteria.labelAcumuladoEspecial;
					
					this.numeroDoConcursoInicial = concursos.maiorNumero -9;
					this.numeroDoConcursoFinal = concursos.maiorNumero;
					this.rgeFaixaDeConcursosMin = this.extensaoDaFaixaDeConcurso;
					this.rgeFaixaDeConcursosMax = this.numeroDoConcursoFinal;
					this.rgeFaixaDeConcursos = this.numeroDoConcursoFinal;
				});
			});
		});


		this.exibeDezenasComQuebraDeLinha = true;

		this.dezenas = [
			{ numero: '01' }, { numero: '02' }, { numero: '03' }, { numero: '04' }, { numero: '05' },
			{ numero: '06' }, { numero: '07' }, { numero: '08' }, { numero: '09' }, { numero: '10' },
			{ numero: '11' }, { numero: '12' }, { numero: '13' }, { numero: '14' }, { numero: '15' },
		];


		// this.menu.open();


	}

	rgeFaixaDeConcursosAtualize(concursoFinal) {
		this.numeroDoConcursoInicial = concursoFinal.value - this.extensaoDaFaixaDeConcurso;
		if (this.numeroDoConcursoInicial == 0) {
			this.numeroDoConcursoInicial = 1;
			this.numeroDoConcursoFinal = concursoFinal.value + 1;
			this.rgeFaixaDeConcursosMin = concursoFinal.value + 1;
		} else {
			this.numeroDoConcursoFinal = concursoFinal.value;
		}
	}

	rgeDesloqueParaEsquerda() {
		if (this.rgeFaixaDeConcursos > this.rgeFaixaDeConcursosMin) {
			this.numeroDoConcursoInicial--;
			this.numeroDoConcursoFinal--;
			this.rgeFaixaDeConcursos--;
		}
	}

	rgeDesloqueParaDireita() {
		if (this.rgeFaixaDeConcursos < this.rgeFaixaDeConcursosMax) {
			this.numeroDoConcursoInicial++;
			this.numeroDoConcursoFinal++;
			this.rgeFaixaDeConcursos++;
		}
	}

	rgeDesloqueParaEsquerdaEFC() {
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
	}

	rgeDesloqueParaDireitaEFC() {
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
	}
}
