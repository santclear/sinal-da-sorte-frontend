export enum ParametrosDeServicosWeb {
	DOMINIO = <any> 'http://localhost:8080/',
	ENTIDADE_LOTERIA = <any> {
		urlLoterias: DOMINIO + 'loterias/procure_por_id_maior_que/0'//FIXME: refatorar 0, talvez criar outro método na classe EntidadeBDServico
	},
	CONCURSO_LOTOFACIL = <any> {
		id: 1,
		nome: 'Lotofácil',
        urlConcursos: DOMINIO +  'concursos/procure_por_loteria_id_igual_ao_e_numero_maior_que/1'
    },
	CONCURSO_MEGASENA = <any> {
		id: 2,
		nome: 'Mega-Sena',
        urlConcursos: DOMINIO +  'concursos/procure_por_loteria_id_igual_ao_e_numero_maior_que/2'
    }
}