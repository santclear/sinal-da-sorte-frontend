import { ElementRef } from '@angular/core';

export interface EstatisticaI {
	configureEstatistica(
		canvas: ElementRef, 
		concursos: any, 
		dezena: string, 
		sessao: any, 
		numeroDoSorteio: number, 
		numeroDoConcursoInicial: number, 
		numeroDoConcursoFinal: number, 
		dezenas: string[]): void;
	configureOGrafico(
		sessao: any, 
		canvas: ElementRef, 
		dezena: string, 
		numeroDoSorteio: number, 
		rotulosDoEixoX: number[], 
		frequenciasPorConcursos: { y: number, concurso: any }[], 
		numeroDoConcursoInicial: number, 
		numeroDoConcursoFinal: number): void;
	atualizeFrequênciasDasDezenas(
		dezena: string, 
		numeroDoConcursoInicial: number, 
		numeroDoConcursoFinal: number, 
		numeroDoSorteio: number, 
		dezenas: string[]): void;
}