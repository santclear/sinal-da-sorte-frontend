import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NavBarAgS } from '../componentes/navbar.ags';
// import { EstatisticaAgs } from '../pages/estatistica/base/estatistica.ags';
import { FrequenciaAcumuladaAgs } from '../pages/estatistica/frequencia-acumulada/frequencia-acumulada.ags';
import { FrequenciaSomaDezenasAgs } from '../pages/estatistica/frequencia-soma-dezenas/frequencia-soma-dezenas.ags';
import { ConcursoDAOServico } from '../dao/concurso/concurso-dao.servico';
import { BemVindoPage } from '../pages/bem-vindo/bem-vindo';
import { EstatisticaPage } from '../pages/estatistica/estatistica';
import { SimuladorPage } from '../pages/simulador/simulador';
import { FechamentoPage } from '../pages/fechamento/fechamento';
import { ApostaPage } from '../pages/aposta/aposta';
import { GruposEspeciaisPage } from '../pages/grupos-especiais/grupos-especiais';
import { BolaoPage } from '../pages/bolao/bolao';
import { HistoricoDeApostasPage } from '../pages/historico-de-apostas/historico-de-apostas';
import { DataTableModule } from "angular2-datatable";

@NgModule({
	declarations: [
		MyApp,
		NavBarAgS,
		// EstatisticaAgs,
		FrequenciaAcumuladaAgs,
		FrequenciaSomaDezenasAgs,
		BemVindoPage,
		EstatisticaPage,
		SimuladorPage,
		FechamentoPage,
		ApostaPage,
		GruposEspeciaisPage,
		BolaoPage,
		HistoricoDeApostasPage
	],
	imports: [
		DataTableModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		NavBarAgS,
		// EstatisticaAgs,
		FrequenciaAcumuladaAgs,
		FrequenciaSomaDezenasAgs,
		BemVindoPage,
		EstatisticaPage,
		SimuladorPage,
		FechamentoPage,
		ApostaPage,
		GruposEspeciaisPage,
		BolaoPage,
		HistoricoDeApostasPage
	],
	providers: [ConcursoDAOServico, { provide: ErrorHandler, useClass: IonicErrorHandler }, { provide: LOCALE_ID, useValue: "pt-BR" }]
})
export class AppModule { }
