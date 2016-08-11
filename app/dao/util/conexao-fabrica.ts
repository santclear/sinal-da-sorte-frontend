import {Conexao} from './conexao';

export class ConexaoFabrica {
    public static getConexao(): any {
        try {
            return Conexao.getInstance();
        } catch(e) {
            console.log(e.status);
            throw new Error("Ocorreu um erro ao tentar conectar com o banco de dados local");
        }
    }
}