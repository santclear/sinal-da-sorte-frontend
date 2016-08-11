export enum Concursos {
	DOMINIO = <any> 'http://localhost:8080/',
	LOTOFACIL = <any> {
		id: 1,
        nomeId: 'LOTOFACIL',
		nome: 'Lotofácil',
        urls: [
			{endereco: DOMINIO + 'concursos/procure_por_numero_maior_que_e_loteria_nome_como/'},
			{endereco: DOMINIO + 'concursos/procure_por_numero_menor_que_e_loteria_nome_como/'}
		]
    }
}