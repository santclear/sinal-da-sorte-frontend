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
		labelAcumuladoEspecial: 'Acumulado para Sorteio Especial da Independência',
		cor: {
			claro: '#c87fc3',
			escuro: '#930089'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que_e_sorteio_numero_igual_a/1'
    	},
		tiposDeAcertos: ['15 Números','14 Números','13 Números','12 Números','11 Números'],
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
		labelAcumuladoEspecial: 'Acumulado Mega da Virada',
		cor: {
			claro: '#8fcbb3',
			escuro: '#209869'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que_e_sorteio_numero_igual_a/2'
    	},
		tiposDeAcertos: ['Sena','Quina','Quadra'],
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
		labelAcumuladoEspecial: 'Acumulado para Sorteio Especial de São João',
		cor: {
			claro: '#927fc1',
			escuro: '#260085'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que_e_sorteio_numero_igual_a/3'
    	},
		tiposDeAcertos: ['Quina','Quadra','Terno','Duque'],
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
		labelAcumuladoEspecial: '',
		cor: {
			claro: '#fabf7f',
			escuro: '#e16e00'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que_e_sorteio_numero_igual_a/4'
    	},
		tiposDeAcertos: ['20 Números','19 Números','18 Números','17 Números','16 Números','Nenhum número'],
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
		labelAcumuladoEspecial: '',
		cor: {
			claro: '#99ff99',
			escuro: '#008c00'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que_e_sorteio_numero_igual_a/5'
    	},
		tiposDeAcertos: ['7 Números','6 Números','5 Números','4 Números','3 Números','Time do Coração'],
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
		labelAcumuladoEspecial: 'Acumulado para Sorteio Especial de Páscoa',
		cor: {
			claro: '#d28891',
			escuro: '#a61324'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procure_por_loteria_id_igual_a_e_numero_maior_que_e_sorteio_numero_igual_a/6'
    	},
		tiposDeAcertos: ['Sena','Quina','Quadra','Terno'],
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
			{id: 9, valor: 10}, {id: 19, valor: 20}, {id: 29, valor: 30}, {id: 39, valor: 40}, {id: 49, valor: 50}, 
			{id: 59, valor: 60}, {id: 69, valor: 70}, {id: 79, valor: 80}, {id: 89, valor: 90}, {id: 99, valor: 100}, 
			{id: 149, valor: 150}, {id: 199, valor: 200}, {id: 249, valor: 250}, {id: 299, valor: 300}, {id: 349, valor: 350}, 
			{id: 399, valor: 400}, {id: 449, valor: 450}, {id: 499, valor: 500}
		]
	};
}