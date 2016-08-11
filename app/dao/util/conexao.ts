import {Storage, SqlStorage} from 'ionic-angular';

export class Conexao {
    private static _conexaoSingleton: any = new Storage(SqlStorage);

    constructor() {
        if (Conexao._conexaoSingleton) {
            throw new Error("Erro ao instanciar: Use Conexao.getInstance() no lugar da palavra reservada new.");
        }
        Conexao._conexaoSingleton = this;
    }

    public static getInstance(): Storage {
        return Conexao._conexaoSingleton;
    }
}