import {RateioDTO} from '../rateio/rateio-dto';
import {Loteria} from '../enum/loteria';

export class ConcursoDTO {
    private numerosSorteados: string;
    private concurso: number;
    private dataDoSorteio: Date;
    private proximoConcurso: number;
    private estimativaDePremioParaOProximoConcurso: number;
    private acumuladoParaOproximoConcurso: number;
    private dataDoProximoConcurso: Date;
	private loteria: Loteria;
    private rateios: Array<RateioDTO>;

    constructor() {}


	public get $numerosSorteados(): string {
		return this.numerosSorteados;
	}

	public set $numerosSorteados(value: string) {
		this.numerosSorteados = value;
	}

	public get $concurso(): number {
		return this.concurso;
	}

	public set $concurso(value: number) {
		this.concurso = value;
	}

	public get $dataDoSorteio(): Date {
		return this.dataDoSorteio;
	}

	public set $dataDoSorteio(value: Date) {
		this.dataDoSorteio = value;
	}

	public get $proximoConcurso(): number {
		return this.proximoConcurso;
	}

	public set $proximoConcurso(value: number) {
		this.proximoConcurso = value;
	}

	public get $estimativaDePremioParaOProximoConcurso(): number {
		return this.estimativaDePremioParaOProximoConcurso;
	}

	public set $estimativaDePremioParaOProximoConcurso(value: number) {
		this.estimativaDePremioParaOProximoConcurso = value;
	}

	public get $acumuladoParaOproximoConcurso(): number {
		return this.acumuladoParaOproximoConcurso;
	}

	public set $acumuladoParaOproximoConcurso(value: number) {
		this.acumuladoParaOproximoConcurso = value;
	}

	public get $dataDoProximoConcurso(): Date {
		return this.dataDoProximoConcurso;
	}

	public set $dataDoProximoConcurso(value: Date) {
		this.dataDoProximoConcurso = value;
	}
	
	public get $loteria(): Loteria {
		return this.loteria;
	}

	public set $loteria(value: Loteria) {
		this.loteria = value;
	}
	
	public get $rateios(): Array<RateioDTO> {
		return this.rateios;
	}

	public set $rateios(value: Array<RateioDTO>) {
		this.rateios = value;
	}
    
}
