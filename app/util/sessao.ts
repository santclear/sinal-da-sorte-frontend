import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class Sessao {
    private sessao: Storage;
    private valor;

    constructor() {
        this.sessao = new Storage(SqlStorage);
    }

    getValor(valor, successCallBack) {
        this.sessao.get(valor).then((valorCallBack) => {
            console.log("Pegou da sessão: "+ valorCallBack);
            successCallBack(valorCallBack);
        }, (error) => {
            console.log("Erro ao tentar obter o valor '"+ valor +"' da sessão: "+ JSON.stringify(error.err));
        });
    }

    setValor(chave, valor) {
        console.log("Inseriu na sessão => Chave: "+ chave +", Valor: "+ valor);
        this.sessao.set(chave, valor);
    }

    getSessao(): Storage {
        return this.sessao;
    }
}
