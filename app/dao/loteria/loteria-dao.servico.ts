import {Injectable} from '@angular/core';
import {ILoteriaDAO} from './iloteria-dao';
import {LoteriaDTO} from './loteria-dto';
import {ConexaoFabrica} from '../util/conexao-fabrica';
import {EntidadeBD} from '../util/sincronismo/entidade-bd';
import {ComandoLoteria} from './comando-loteria';
import {Entidade} from '../../enum/entidade';
import {Http} from '@angular/http';

@Injectable()
export class LoteriaDAOServico implements ILoteriaDAO {
    bd;

	constructor(private http: Http) {
        this.bd = ConexaoFabrica.getConexao();

        let entidadeLoteria = Object.create(Entidade.LOTERIA);
        this.bd.query(entidadeLoteria.modeloDeCriacao).then((data) => {
        }, (error) => {
            console.log("Erro na criação da tabela " + JSON.stringify(error.err));
        });
    }

    salvar(loteria) {
        this.bd.query(`
                INSERT INTO loteria VALUES(?,?)
        `, [
            loteria.id,
            loteria.nome,
        ]).then((dado) => {}, (error) => {
            console.log("Erro ao salvar o loteria " + JSON.stringify(error.err));
        });
    }

    atualizar(loteria) {

    }

    excluir(loteria) {

    }

    listarTodos(successCallBack) {

    }

	procurePorIdIgualAo(id: number, successCallBack) {
		this.bd.query(`SELECT * FROM loteria WHERE id = ?`, [id]).then((loteriaCallBack) => {
			let loteria = [{
				id: loteriaCallBack.res.rows.item(0).id,
				nome: loteriaCallBack.res.rows.item(0).nome
			}]
            successCallBack(loteria);
        }, (error) => {
            console.log("Erro na procura da loteria pelo id" + JSON.stringify(error.err));
        })
	}

	// Sincronismo
    sincronize(parametrosDeServico) {
		let entidadeBD = new EntidadeBD(this.http);
        entidadeBD.sincronize(undefined, parametrosDeServico.urlLoterias, new ComandoLoteria(this));
    }

    procurePorMaiorId(successCallBack) {
        this.bd.query("SELECT MAX(id) AS maior_id FROM loteria").then((loteriaCallBack) => {
            successCallBack(loteriaCallBack);
        }, (error) => {
            console.log("Erro na procura do maior id " + JSON.stringify(error.err));
        });
    }
}
