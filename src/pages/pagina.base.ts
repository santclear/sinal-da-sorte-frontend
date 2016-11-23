export abstract class PaginaBase {
    public titulo: string;

    constructor() {}

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }
}
