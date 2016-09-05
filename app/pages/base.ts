export abstract class BasePage {
    private titulo: string;

    constructor() {}

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }
}
