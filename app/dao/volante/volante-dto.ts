export class VolanteDTO {
    private dezenasMarcadas: string;
    private quantidadeDeDezenasNoVolante: number;
    private teimosinha: number;
    private dataDaAposta: Date;

    constructor() {}

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
    
}
