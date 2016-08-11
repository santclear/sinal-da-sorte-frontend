export enum Entidade {
    CONCURSO = <any> {
        nome: 'concurso',
        modeloDeCriacao: `
            CREATE TABLE IF NOT EXISTS concurso(
                id INTEGER PRIMARY KEY, 
                loteria_id INTEGER,
                numero INTEGER, 
                data_do_sorteio TEXT, 
                numeros_sorteados TEXT, 
                arrecadacao_total NUMERIC,
                estimativa_de_premio_para_o_proximo_concurso NUMERIC,
                acumulado_para_o_proximo_concurso NUMERIC
            )`
    },
}