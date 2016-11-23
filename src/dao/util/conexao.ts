import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

export class Conexao {
	private static conexaoSingleton: any = new PouchDB('bdagente');

    constructor() {
        if (Conexao.conexaoSingleton) {
            throw new Error("Erro ao instanciar: Use Conexao.getInstance() no lugar da palavra reservada new.");
        }
		Conexao.conexaoSingleton = this;
    }

    public static getInstance(): any {
        return Conexao.conexaoSingleton;
    }
}