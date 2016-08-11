import {LoteriaDTO} from '../loteria/loteria-dto';

export class ConcursoDTO {
	private id: number;
	private loteriaDTO: LoteriaDTO;
    private numero: number;
    private dataDoSorteio: string;
    private numerosSorteados: string;
	private arrecadacaoTotal: number;
    private estimativaDePremioParaOProximoConcurso: number;
    private acumuladoParaOProximoConcurso: number;

    constructor() {}

	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}

	public get $loteriaDTO(): LoteriaDTO {
		return this.loteriaDTO;
	}

	public set $loteriaDTO(value: LoteriaDTO) {
		this.loteriaDTO = value;
	}

	public get $numero(): number {
		return this.numero;
	}

	public set $numero(value: number) {
		this.numero = value;
	}

	public get $dataDoSorteio(): string {
		return this.dataDoSorteio;
	}

	public set $dataDoSorteio(value: string) {
		this.dataDoSorteio = value;
	}
	
	public get $numerosSorteados(): string {
		return this.numerosSorteados;
	}

	public set $numerosSorteados(value: string) {
		this.numerosSorteados = value;
	}

	public get $arrecadacaoTotal(): number {
		return this.arrecadacaoTotal;
	}

	public set $arrecadacaoTotal(value: number) {
		this.arrecadacaoTotal = value;
	}

	public get $estimativaDePremioParaOProximoConcurso(): number {
		return this.estimativaDePremioParaOProximoConcurso;
	}

	public set $estimativaDePremioParaOProximoConcurso(value: number) {
		this.estimativaDePremioParaOProximoConcurso = value;
	}

	public get $acumuladoParaOProximoConcurso(): number {
		return this.acumuladoParaOProximoConcurso;
	}

	public set $acumuladoParaOProximoConcurso(value: number) {
		this.acumuladoParaOProximoConcurso = value;
	}
}
