import {Storage, SqlStorage} from 'ionic-angular';

export class Sessao {
    private sessao: Storage;
    private valor;

    constructor() {
        this.sessao = new Storage(SqlStorage);
    }

    get(valor, successCallBack) {
        this.sessao.get(valor).then((valorCallBack) => {
            console.log("Pegou da sessão: "+ valor);
            successCallBack(valorCallBack);
        }, (error) => {
            console.log("Erro ao tentar obter o valor '"+ valor +"' da sessão: "+ JSON.stringify(error.err));
        });
    }

    set(chave, valor) {
        console.log("Inseriu na sessão => Chave: "+ chave +", Valor: "+ valor);
        this.sessao.set(chave, valor);
    }
}
