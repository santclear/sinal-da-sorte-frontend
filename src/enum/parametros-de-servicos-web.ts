export class ParametrosDeServicosWeb {
	// static readonly DOMINIO = 'http://localhost:8080/agente-da-sorte-servico/';
	static readonly DOMINIO = 'http://localhost:8084/';
	static readonly ENTIDADE_LOTERIA = {
		urlLoterias: ParametrosDeServicosWeb.DOMINIO + 'loterias/procure_por_id_maior_que/0'//FIXME: refatorar 0, talvez criar outro método na classe EntidadeBDServico
	};
	static readonly CONCURSO_LOTOFACIL = {
		id: 1,
		nome: 'Lotofácil',
        urlConcursos: ParametrosDeServicosWeb.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que/1'
    };
	static readonly CONCURSO_MEGASENA = {
		id: 2,
		nome: 'Mega-Sena',
        urlConcursos: ParametrosDeServicosWeb.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que/2'
    }
}