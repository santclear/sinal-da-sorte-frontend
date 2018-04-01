import { NavController } from 'ionic-angular';
import { StorageService } from "../services/storage.service";

export abstract class PaginaBase {
    protected titulo: string;
    protected paginaAnterior: any;
    protected pbNav: NavController;
    protected pbStorage: StorageService;

    constructor() {}

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    voltar() {
        this.pbNav.setRoot(this.pbStorage.getPaginaAnterior());
    }
}
