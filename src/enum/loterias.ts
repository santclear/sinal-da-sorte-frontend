export abstract class Loterias {
	static readonly DOMINIO = 'http://localhost:8084/';
	static readonly ENTIDADE_LOTERIA = {
		urlLoterias: Loterias.DOMINIO + 'loterias/procure_por_id_maior_que/0'//FIXME: refatorar 0, talvez criar outro método na classe EntidadeBDServico
	};
	static readonly LOTOFACIL = {
		id: 1,
		sufixoCssLoteria: 'Lotofacil',
		nome: 'Lotofácil',
		nomeDoDocumentoNoBD: 'lotofacil',
		caminhoDoIconeAvatar: 'assets/img/lotofacil.png',
		logo: 'assets/img/logo-lotofacil.png',
		cor: {
			claro: '#c87fc3',
			escuro: '#930089'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que/1'
    	},
		"dezenas": [
			{numero: '01'},{numero: '02'},{numero: '03'},{numero: '04'},{numero: '05'},
			{numero: '06'},{numero: '07'},{numero: '08'},{numero: '09'},{numero: '10'},
			{numero: '11'},{numero: '12'},{numero: '13'},{numero: '14'},{numero: '15'},
			{numero: '16'},{numero: '17'},{numero: '18'},{numero: '19'},{numero: '20'},
			{numero: '21'},{numero: '22'},{numero: '23'},{numero: '24'},{numero: '25'}
		]
	};
	static readonly MEGASENA = {
		id: 2, 
		sufixoCssLoteria: 'MegaSena', 
		nome: 'Mega Sena',
		nomeDoDocumentoNoBD: 'megasena',
		caminhoDoIconeAvatar: 'assets/img/mega-sena.png', 
		logo: 'assets/img/logo-mega-sena.png',
		cor: {
			claro: '#8fcbb3',
			escuro: '#209869'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que/2'
    	},
		"dezenas": [
			{numero: '01'},{numero: '02'},{numero: '03'},{numero: '04'},{numero: '05'},
			{numero: '06'},{numero: '07'},{numero: '08'},{numero: '09'},{numero: '10'},
			{numero: '11'},{numero: '12'},{numero: '13'},{numero: '14'},{numero: '15'},
			{numero: '16'},{numero: '17'},{numero: '18'},{numero: '19'},{numero: '20'},
			{numero: '21'},{numero: '22'},{numero: '23'},{numero: '24'},{numero: '25'},
			{numero: '26'},{numero: '27'},{numero: '28'},{numero: '29'},{numero: '30'},
			{numero: '31'},{numero: '32'},{numero: '33'},{numero: '34'},{numero: '35'},
			{numero: '36'},{numero: '37'},{numero: '38'},{numero: '39'},{numero: '40'},
			{numero: '41'},{numero: '42'},{numero: '43'},{numero: '44'},{numero: '45'},
			{numero: '46'},{numero: '47'},{numero: '48'},{numero: '49'},{numero: '50'},
			{numero: '51'},{numero: '52'},{numero: '53'},{numero: '54'},{numero: '55'},
			{numero: '56'},{numero: '57'},{numero: '58'},{numero: '59'},{numero: '60'}
		]
	};
	static readonly QUINA = {
		id: 3, 
		sufixoCssLoteria: 'Quina', 
		nome: 'Quina',
		nomeDoDocumentoNoBD: 'quina',
		caminhoDoIconeAvatar: 'assets/img/quina.png', 
		logo: 'assets/img/logo-quina.png',
		cor: {
			claro: '#927fc1',
			escuro: '#260085'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que/3'
    	},
		"dezenas": [
			{numero: '01'},{numero: '02'},{numero: '03'},{numero: '04'},{numero: '05'},
			{numero: '06'},{numero: '07'},{numero: '08'},{numero: '09'},{numero: '10'},
			{numero: '11'},{numero: '12'},{numero: '13'},{numero: '14'},{numero: '15'},
			{numero: '16'},{numero: '17'},{numero: '18'},{numero: '19'},{numero: '20'},
			{numero: '21'},{numero: '22'},{numero: '23'},{numero: '24'},{numero: '25'},
			{numero: '26'},{numero: '27'},{numero: '28'},{numero: '29'},{numero: '30'},
			{numero: '31'},{numero: '32'},{numero: '33'},{numero: '34'},{numero: '35'},
			{numero: '36'},{numero: '37'},{numero: '38'},{numero: '39'},{numero: '40'},
			{numero: '41'},{numero: '42'},{numero: '43'},{numero: '44'},{numero: '45'},
			{numero: '46'},{numero: '47'},{numero: '48'},{numero: '49'},{numero: '50'},
			{numero: '51'},{numero: '52'},{numero: '53'},{numero: '54'},{numero: '55'},
			{numero: '56'},{numero: '57'},{numero: '58'},{numero: '59'},{numero: '60'},
			{numero: '61'},{numero: '62'},{numero: '63'},{numero: '64'},{numero: '65'},
			{numero: '66'},{numero: '67'},{numero: '68'},{numero: '69'},{numero: '70'},
			{numero: '71'},{numero: '72'},{numero: '73'},{numero: '74'},{numero: '75'},
			{numero: '76'},{numero: '77'},{numero: '78'},{numero: '79'},{numero: '80'}
			
		]
	};
	static readonly LOTOMANIA = {
		id: 4, 
		sufixoCssLoteria: 'Lotomania', 
		nome: 'Lotomania',
		nomeDoDocumentoNoBD: 'lotomania',
		caminhoDoIconeAvatar: 'assets/img/lotomania.png', 
		logo: 'assets/img/logo-lotomania.png',
		cor: {
			claro: '#fabf7f',
			escuro: '#e16e00'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que/4'
    	},
		"dezenas": [
			{numero: '00'},{numero: '01'},{numero: '02'},{numero: '03'},{numero: '04'},
			{numero: '05'},{numero: '06'},{numero: '07'},{numero: '08'},{numero: '09'},
			{numero: '10'},{numero: '11'},{numero: '12'},{numero: '13'},{numero: '14'},
			{numero: '15'},{numero: '16'},{numero: '17'},{numero: '18'},{numero: '19'},
			{numero: '20'},{numero: '21'},{numero: '22'},{numero: '23'},{numero: '24'},
			{numero: '25'},{numero: '26'},{numero: '27'},{numero: '28'},{numero: '29'},
			{numero: '30'},{numero: '31'},{numero: '32'},{numero: '33'},{numero: '34'},
			{numero: '35'},{numero: '36'},{numero: '37'},{numero: '38'},{numero: '39'},
			{numero: '40'},{numero: '41'},{numero: '42'},{numero: '43'},{numero: '44'},
			{numero: '45'},{numero: '46'},{numero: '47'},{numero: '48'},{numero: '49'},
			{numero: '50'},{numero: '51'},{numero: '52'},{numero: '53'},{numero: '54'},
			{numero: '55'},{numero: '56'},{numero: '57'},{numero: '58'},{numero: '59'},
			{numero: '60'},{numero: '61'},{numero: '62'},{numero: '63'},{numero: '64'},
			{numero: '65'},{numero: '66'},{numero: '67'},{numero: '68'},{numero: '69'},
			{numero: '70'},{numero: '71'},{numero: '72'},{numero: '73'},{numero: '74'},
			{numero: '75'},{numero: '76'},{numero: '77'},{numero: '78'},{numero: '79'},
			{numero: '80'},{numero: '81'},{numero: '82'},{numero: '83'},{numero: '84'},
			{numero: '85'},{numero: '86'},{numero: '87'},{numero: '88'},{numero: '89'},
			{numero: '90'},{numero: '91'},{numero: '92'},{numero: '93'},{numero: '94'},
			{numero: '95'},{numero: '96'},{numero: '97'},{numero: '98'},{numero: '99'},
		]
	};
	static readonly TIMEMANIA = {
		id: 5, 
		sufixoCssLoteria: 'Timemania', 
		nome: 'Timemania',
		nomeDoDocumentoNoBD: 'timemania',
		caminhoDoIconeAvatar: 'assets/img/timemania.png', 
		logo: 'assets/img/logo-timemania.png',
		cor: {
			claro: '#99ff99',
			escuro: '#008c00'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que/5'
    	},
		"dezenas": [
			{numero: '01'},{numero: '02'},{numero: '03'},{numero: '04'},{numero: '05'},
			{numero: '06'},{numero: '07'},{numero: '08'},{numero: '09'},{numero: '10'},
			{numero: '11'},{numero: '12'},{numero: '13'},{numero: '14'},{numero: '15'},
			{numero: '16'},{numero: '17'},{numero: '18'},{numero: '19'},{numero: '20'},
			{numero: '21'},{numero: '22'},{numero: '23'},{numero: '24'},{numero: '25'},
			{numero: '26'},{numero: '27'},{numero: '28'},{numero: '29'},{numero: '30'},
			{numero: '31'},{numero: '32'},{numero: '33'},{numero: '34'},{numero: '35'},
			{numero: '36'},{numero: '37'},{numero: '38'},{numero: '39'},{numero: '40'},
			{numero: '41'},{numero: '42'},{numero: '43'},{numero: '44'},{numero: '45'},
			{numero: '46'},{numero: '47'},{numero: '48'},{numero: '49'},{numero: '50'},
			{numero: '51'},{numero: '52'},{numero: '53'},{numero: '54'},{numero: '55'},
			{numero: '56'},{numero: '57'},{numero: '58'},{numero: '59'},{numero: '60'},
			{numero: '61'},{numero: '62'},{numero: '63'},{numero: '64'},{numero: '65'},
			{numero: '66'},{numero: '67'},{numero: '68'},{numero: '69'},{numero: '70'},
			{numero: '71'},{numero: '72'},{numero: '73'},{numero: '74'},{numero: '75'},
			{numero: '76'},{numero: '77'},{numero: '78'},{numero: '79'},{numero: '80'}
		]
	};
	static readonly DUPLASENA = {
		id: 6, 
		sufixoCssLoteria: 'DuplaSena', 
		nome: 'Dupla Sena',
		nomeDoDocumentoNoBD: 'duplasena',
		caminhoDoIconeAvatar: 'assets/img/dupla-sena.png', 
		logo: 'assets/img/logo-dupla-sena.png',
		cor: {
			claro: '#d28891',
			escuro: '#a61324'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que/6'
    	},
		"dezenas": [
			{numero: '01'},{numero: '02'},{numero: '03'},{numero: '04'},{numero: '05'},
			{numero: '06'},{numero: '07'},{numero: '08'},{numero: '09'},{numero: '10'},
			{numero: '11'},{numero: '12'},{numero: '13'},{numero: '14'},{numero: '15'},
			{numero: '16'},{numero: '17'},{numero: '18'},{numero: '19'},{numero: '20'},
			{numero: '21'},{numero: '22'},{numero: '23'},{numero: '24'},{numero: '25'},
			{numero: '26'},{numero: '27'},{numero: '28'},{numero: '29'},{numero: '30'},
			{numero: '31'},{numero: '32'},{numero: '33'},{numero: '34'},{numero: '35'},
			{numero: '36'},{numero: '37'},{numero: '38'},{numero: '39'},{numero: '40'},
			{numero: '41'},{numero: '42'},{numero: '43'},{numero: '44'},{numero: '45'},
			{numero: '46'},{numero: '47'},{numero: '48'},{numero: '49'},{numero: '50'},
		]
	};
	static readonly FAIXA_DE_CONCURSO = {
		"extensoes": [
			{id: 'id0', valor: 10}, {id: 'id1', valor: 20}, {id: 'id2', valor: 30}, {id: 'id3', valor: 40}, {id: 'id4', valor: 50}, 
			{id: 'id5', valor: 60}, {id: 'id6', valor: 70}, {id: 'id7', valor: 80}, {id: 'id8', valor: 90}, {id: 'id9', valor: 100}, 
			{id: 'id10', valor: 150}, {id: 'id11', valor: 200}, {id: 'id12', valor: 250}, {id: 'id13', valor: 300}, {id: 'id14', valor: 350}, 
			{id: 'id15', valor: 400}, {id: 'id16', valor: 450}, {id: 'id17', valor: 500}
		]
	};
}