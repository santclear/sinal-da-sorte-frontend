export abstract class Loterias {
	// static readonly DOMINIO = 'http://localhost:8081/sinal-da-sorte-ws/';
	// static readonly DOMINIO = 'http://sinaldasorte-ws.jelasticlw.com.br/';
	// static readonly DOMINIO = 'http://www.sinaldasorte.com.br:7717/sinal-da-sorte-ws/';


	

	// static readonly DOMINIO = 'http://localhost:8080/';
	static readonly DOMINIO = 'https://www.sinaldasorte.com.br/sinal-da-sorte-ws/';


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
		tiposDeAcertos: ['20 Números','19 Números','18 Números','17 Números','16 Números','15 Números','Nenhum número'],
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

	static readonly DIADESORTE = {
		id: 7, 
		sufixoCssLoteria: 'DiaDeSorte', 
		nome: 'Dia de Sorte',
		nomeDoDocumentoNoBD: 'diadesorte',
		caminhoDoIconeAvatar: 'assets/img/dia-de-sorte.png', 
		logo: 'assets/img/logo-dia-de-sorte.png',
		labelAcumuladoEspecial: '',
		cor: {
			claro: '#f3dd93',
			escuro: '#d4a500'
		},
		parametrosDeServicosWeb: {
			urlDoServico: Loterias.DOMINIO +  'concursos/procureConcursosComNumeroMaiorQue/'
    	},
		tiposDeAcertos: ['7 Números','6 Números','5 Números','4 Números','Mês da Sorte'],
		dezenas: [
			'01','02','03','04','05',
			'06','07','08','09','10',
			'11','12','13','14','15',
			'16','17','18','19','20',
			'21','22','23','24','25',
			'26','27','28','29','30',
			'31'
		]
	};
	
	static readonly FAIXA_DE_CONCURSO = {
		"extensoes": [
			{id: 10, valor: 10}, {id: 20, valor: 20}, {id: 30, valor: 30}, {id: 40, valor: 40}, {id: 50, valor: 50}, 
			{id: 60, valor: 60}, {id: 70, valor: 70}, {id: 80, valor: 80}, {id: 90, valor: 90}, {id: 100, valor: 100}, 
			{id: 150, valor: 150}, {id: 200, valor: 200}, {id: 250, valor: 250}, {id: 300, valor: 300}, {id: 350, valor: 350}, 
			{id: 400, valor: 400}, {id: 450, valor: 450}, {id: 500, valor: 500}, {id: 1000, valor: 1000}
		]
	};
}