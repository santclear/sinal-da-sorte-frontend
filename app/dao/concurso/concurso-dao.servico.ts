import {Injectable} from '@angular/core';
import {IConcursoDAO} from './iconcurso-dao';
import {ConcursoDTO} from './concurso-dto';
import {LoteriaDTO} from '../loteria/loteria-dto';
import {ConexaoFabrica} from '../util/conexao-fabrica';
import {EntidadeBD} from '../util/sincronismo/entidade-bd';
import {ComandoConcurso} from './comando-concurso';
import {Entidade} from '../../enum/entidade';
import {Http} from '@angular/http';

@Injectable()
export class ConcursoDAOServico implements IConcursoDAO {
    bd: any;

	constructor(private http: Http) {
        this.bd = ConexaoFabrica.getConexao();

        let entidadeConcurso = Object.create(Entidade.CONCURSO);
        this.bd.query(entidadeConcurso.modeloDeCriacao).then((data) => {
        }, (error) => {
            console.log("Erro na criação da tabela " + JSON.stringify(error.err));
        });
    }

    salvar(concurso) {
        this.bd.query(`
                INSERT INTO concurso VALUES(?,?,?,?,?,?,?,?)
        `, [
				concurso[0].id,
				concurso[1].id,
				concurso[0].numero,
				concurso[0].dataDoSorteio,
				concurso[0].numerosSorteados,
				concurso[0].arrecadacaoTotal,
				concurso[0].estimativaDePremioParaOProximoConcurso,
				concurso[0].acumuladoParaOProximoConcurso
			]).then((dado) => {

			}, (error) => {
				console.log("Erro ao salvar o concurso " + JSON.stringify(error.err));
			});
    }

    atualizar(concurso) {

    }

    excluir(concurso) {

    }

    listarTodos(successCallBack) {

    }

	procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAoENumeroMenorQue(
		dezena: string, loteriaId: number, numeroConcursoInicial: number, successCallBack) {
		this.bd.query(`
			SELECT MAX(numero) AS maior_numero
			FROM concurso 
			WHERE 
				numeros_sorteados NOT LIKE ? AND
				loteria_id = ? AND
				numero < ?
		`, [dezena, loteriaId, numeroConcursoInicial]).then((concursosCallBack) => {
				successCallBack(concursosCallBack.res.rows.item(0));
			}, (error) => {
				console.log("Erro na execução do método procureMaiorNumeroDesdeQueNumerosSorteadosNaoComoELoteriaIdIgualAoENumeroMenorQue" + JSON.stringify(error.err));
			});
	}

	procurePorLoteriaIdIgualAoENumeroMaiorIgualAoENumeroMenorIgualAo(
		dezena: string, pLoteria, numeroConcursoInicial: number, numeroConcursoFinal: number, successCallBack) {
		this.bd.query(`
			SELECT
				 id,
				 loteria_id,
				 numero,
				 data_do_sorteio,
				 numeros_sorteados,
				 arrecadacao_total,
				 estimativa_de_premio_para_o_proximo_concurso,
				 acumulado_para_o_proximo_concurso,
				 CASE WHEN numeros_sorteados LIKE ? THEN 'sim' ELSE 'nao' END AS dezena_encontrada
			FROM concurso 
			WHERE
				loteria_id = ? AND
				numero >= ? AND
				numero <= ?`,
			[dezena, pLoteria[0].id, numeroConcursoInicial, numeroConcursoFinal]
		).then((concursosCallBack) => {
			let concursos = [];
			for (let i in concursosCallBack.res.rows) {
				if (concursosCallBack.res.rows[i].id != undefined) {
					let numerosSorteados = concursosCallBack.res.rows[i].numeros_sorteados;
					let numerosSorteadosSplit = numerosSorteados.split(',');
					let numerosSorteadosSort = numerosSorteadosSplit.sort(function (a, b) { return a - b });
					let concurso = [{
						id: concursosCallBack.res.rows[i].id,
						numero: concursosCallBack.res.rows[i].numero,
						dataDoSorteio: concursosCallBack.res.rows[i].data_do_sorteio,
						numerosSorteados: numerosSorteadosSort,
						arrecadacaoTotal: concursosCallBack.res.rows[i].arrecadacao_total,
						estimativaDePremioParaOProximoConcurso: concursosCallBack.res.rows[i].estimativa_de_premio_para_o_proximo_concurso,
						acumuladoParaOProximoConcurso: concursosCallBack.res.rows[i].acumulado_para_o_proximo_concurso,
						dezena_encontrada: concursosCallBack.res.rows[i].dezena_encontrada,
						loteria: [{
							id: pLoteria.id,
							nome: pLoteria.nome
						}]
					}];
					concursos.push(concurso);
				};
			}
            successCallBack(concursos);
        }, (error) => {
            console.log("Erro na execução do método procurePorLoteriaIdIgualAoENumeroMaiorIgualAoENumeroMenorIgualAo" + JSON.stringify(error.err));
        });
	};

	// Sincronismo
    sincronize(parametrosDeServico) {
		let entidadeBD = new EntidadeBD(this.http);
        entidadeBD.sincronize(parametrosDeServico.id, parametrosDeServico.urlConcursos, new ComandoConcurso(this));
    }

    procurePorNumeroMaiorDesdeQueLoteriaIdIgualAo(loteriaId: number, successCallBack) {
        this.bd.query("SELECT MAX(numero) AS maior_numero FROM concurso WHERE loteria_id = ?", [loteriaId]).then((concursosCallBack) => {
            successCallBack(concursosCallBack.res.rows.item(0));
        }, (error) => {
            console.log("Erro na procura do maior número " + JSON.stringify(error.err));
        });
    }

}
