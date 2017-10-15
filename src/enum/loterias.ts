export abstract class Loterias {
	static readonly DOMINIO = 'http://localhost:8080/';
	// static readonly DOMINIO = 'http://localhost:8084/agente-da-sorte-servico/';
	// static readonly DOMINIO = 'http://192.168.0.12:8084/agente-da-sorte-servico/';
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
			urlDoServico: Loterias.DOMINIO +  'concursos/procureConcursosComNumeroMaiorQue/'
    	},
		tiposDeAcertos: ['15 Números','14 Números','13 Números','12 Números','11 Números'],
		dezenas: [
			'01','02','03','04','05',
			'06','07','08','09','10',
			'11','12','13','14','15',
			'16','17','18','19','20',
			'21','22','23','24','25'
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
			urlDoServico: Loterias.DOMINIO +  'concursos/procureConcursosComNumeroMaiorQue/'
    	},
		tiposDeAcertos: ['Sena','Quina','Quadra'],
		dezenas: [
			'01','02','03','04','05',
			'06','07','08','09','10',
			'11','12','13','14','15',
			'16','17','18','19','20',
			'21','22','23','24','25',
			'26','27','28','29','30',
			'31','32','33','34','35',
			'36','37','38','39','40',
			'41','42','43','44','45',
			'46','47','48','49','50',
			'51','52','53','54','55',
			'56','57','58','59','60'
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
			urlDoServico: Loterias.DOMINIO +  'concursos/procureConcursosComNumeroMaiorQue/'
    	},
		tiposDeAcertos: ['Quina','Quadra','Terno','Duque'],
		dezenas: [
			'01','02','03','04','05',
			'06','07','08','09','10',
			'11','12','13','14','15',
			'16','17','18','19','20',
			'21','22','23','24','25',
			'26','27','28','29','30',
			'31','32','33','34','35',
			'36','37','38','39','40',
			'41','42','43','44','45',
			'46','47','48','49','50',
			'51','52','53','54','55',
			'56','57','58','59','60',
			'61','62','63','64','65',
			'66','67','68','69','70',
			'71','72','73','74','75',
			'76','77','78','79','80'
			
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
			urlDoServico: Loterias.DOMINIO +  'concursos/procureConcursosComNumeroMaiorQue/'
    	},
		tiposDeAcertos: ['20 Números','19 Números','18 Números','17 Números','16 Números','Nenhum número'],
		dezenas: [
			'00','01','02','03','04',
			'05','06','07','08','09',
			'10','11','12','13','14',
			'15','16','17','18','19',
			'20','21','22','23','24',
			'25','26','27','28','29',
			'30','31','32','33','34',
			'35','36','37','38','39',
			'40','41','42','43','44',
			'45','46','47','48','49',
			'50','51','52','53','54',
			'55','56','57','58','59',
			'60','61','62','63','64',
			'65','66','67','68','69',
			'70','71','72','73','74',
			'75','76','77','78','79',
			'80','81','82','83','84',
			'85','86','87','88','89',
			'90','91','92','93','94',
			'95','96','97','98','99',
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
			urlDoServico: Loterias.DOMINIO +  'concursos/procureConcursosComNumeroMaiorQue/'
    	},
		tiposDeAcertos: ['7 Números','6 Números','5 Números','4 Números','3 Números','Time do Coração'],
		dezenas: [
			'01','02','03','04','05',
			'06','07','08','09','10',
			'11','12','13','14','15',
			'16','17','18','19','20',
			'21','22','23','24','25',
			'26','27','28','29','30',
			'31','32','33','34','35',
			'36','37','38','39','40',
			'41','42','43','44','45',
			'46','47','48','49','50',
			'51','52','53','54','55',
			'56','57','58','59','60',
			'61','62','63','64','65',
			'66','67','68','69','70',
			'71','72','73','74','75',
			'76','77','78','79','80'
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
			urlDoServico: Loterias.DOMINIO +  'concursos/procureConcursosComNumeroMaiorQue/'
    	},
		tiposDeAcertos: ['Sena','Quina','Quadra','Terno'],
		dezenas: [
			'01','02','03','04','05',
			'06','07','08','09','10',
			'11','12','13','14','15',
			'16','17','18','19','20',
			'21','22','23','24','25',
			'26','27','28','29','30',
			'31','32','33','34','35',
			'36','37','38','39','40',
			'41','42','43','44','45',
			'46','47','48','49','50',
		]
	};
	static readonly FAIXA_DE_CONCURSO = {
		"extensoes": [
			{id: 9, valor: 10}, {id: 19, valor: 20}, {id: 29, valor: 30}, {id: 39, valor: 40}, {id: 49, valor: 50}, 
			{id: 59, valor: 60}, {id: 69, valor: 70}, {id: 79, valor: 80}, {id: 89, valor: 90}, {id: 99, valor: 100}, 
			{id: 149, valor: 150}, {id: 199, valor: 200}, {id: 249, valor: 250}, {id: 299, valor: 300}, {id: 349, valor: 350}, 
			{id: 399, valor: 400}, {id: 449, valor: 450}, {id: 499, valor: 500}, {id: 999, valor: 1000}
		]
	};
}