import {Injectable} from '@angular/core';
import {IConcursoDAO} from './iconcurso-dao';
import {ConcursoDTO} from './concurso-dto';
import {ConexaoFabrica} from '../util/conexao-fabrica';
import {EntidadeBDServico} from '../util/sincronismo/entidade-bd.servico';
import {ComandoConcurso} from './comando-concurso';
import {EntidadeBDReceptorServico} from "../util/sincronismo/entidade-bd-receptor.servico";
import {Entidade} from '../../enum/entidade';

@Injectable()
export class ConcursoDAOServico implements IConcursoDAO {
    bd: any;

    constructor(private entidadeBDReceptorServico: EntidadeBDReceptorServico) {
        this.bd = ConexaoFabrica.getConexao();

        let entidadeConcurso = Object.create(Entidade.CONCURSO);
        this.bd.query(entidadeConcurso.modeloDeCriacao).then((data) => {
            console.log("Entidade `concurso` criada com sucesso!");
        }, (error) => {
            console.log("Erro na criação da tabela " + JSON.stringify(error.err));
        });
    }

    salvar(concursoDTO: ConcursoDTO) {
        this.bd.query(`
                INSERT INTO concurso VALUES(?,?,?,?,?,?,?,?)
        `, [
            concursoDTO.$id,
            concursoDTO.$loteriaDTO.$id,
            concursoDTO.$numero,
            concursoDTO.$dataDoSorteio,
            concursoDTO.$numerosSorteados,
            concursoDTO.$arrecadacaoTotal,
            concursoDTO.$estimativaDePremioParaOProximoConcurso,
            concursoDTO.$acumuladoParaOProximoConcurso
        ]).then((dado) => {
            
        }, (error) => {
            console.log("Erro ao salvar o concurso " + JSON.stringify(error.err));
        });
    }

    atualizar(concursoDTO: ConcursoDTO) {

    }

    excluir(concursoDTO: ConcursoDTO) {

    }

    listarTodos(successCallBack: any) {

    }


    sincronize(concursos: any) {
        let entidadeBDServico = new EntidadeBDServico(this.entidadeBDReceptorServico);
        entidadeBDServico.sincronize(concursos.id, concursos.urls[0].endereco, concursos.nomeId, new ComandoConcurso(this));
    }

    procurePorNumeroMaiorDesdeQueLoteriaIdIgualA(loteriaId: number, successCallBack: any) {
        this.bd.query("SELECT MAX(numero) AS maior_numero FROM concurso WHERE loteria_id = ?", [loteriaId]).then((dado) => {
            successCallBack(dado.res.rows.item(0));
        }, (error) => {
            console.log("Erro na procura do maior número " + JSON.stringify(error.err));
        })
    }

}
