export class RateioDTO {
    private rateio: number;
    private numeroDeGanhadores: number;

    constructor() {}

    getRateio(): number {
        return this.rateio;
    }

    setRateio(rateio: number) {
        this.rateio = rateio;
    }

    getNumeroDeGanhadores(): number {
        return this.numeroDeGanhadores;
    }

    setNumeroDeGanhadores(numeroDeGanhadores: number) {
        this.numeroDeGanhadores = numeroDeGanhadores;
    }
}
