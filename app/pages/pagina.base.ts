export abstract class PaginaBase {
    protected titulo: string;

    constructor() {}

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }
}
