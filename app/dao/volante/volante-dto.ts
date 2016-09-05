import {LoteriaDTO} from '../loteria/loteria-dto';

export class VolanteDTO {
	private id: number;
    private dezenasMarcadas: string;
    private quantidadeDeDezenasNoVolante: number;
    private teimosinha: number;
    private dataDaAposta: Date;

	private loteria: LoteriaDTO;
	
    constructor() {}
	
	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}
	
	public get $dezenasMarcadas(): string {
		return this.dezenasMarcadas;
	}

	public set $dezenasMarcadas(value: string) {
		this.dezenasMarcadas = value;
	}

	public get $quantidadeDeDezenasNoVolante(): number {
		return this.quantidadeDeDezenasNoVolante;
	}

	public set $quantidadeDeDezenasNoVolante(value: number) {
		this.quantidadeDeDezenasNoVolante = value;
	}

	public get $teimosinha(): number {
		return this.teimosinha;
	}

	public set $teimosinha(value: number) {
		this.teimosinha = value;
	}

	public get $dataDaAposta(): Date {
		return this.dataDaAposta;
	}

	public set $dataDaAposta(value: Date) {
		this.dataDaAposta = value;
	}

	public get $loteria(): LoteriaDTO {
		return this.loteria;
	}

	public set $loteria(value: LoteriaDTO) {
		this.loteria = value;
	}
}
