import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { NavBarAgS } from '../componentes/navbar.ags';
import { EstatisticaAgs } from '../pages/estatistica/base/estatistica.ags';
import { FrequenciaAcumuladaAgs } from '../pages/estatistica/frequencia-acumulada/frequencia-acumulada.ags';
import { FrequenciaSomaDezenasAgs } from '../pages/estatistica/frequencia-soma-dezenas/frequencia-soma-dezenas.ags';

import { LoginPage } from '../pages/login/login';
import { ContaPage } from '../pages/cadastro/conta';
import { BemVindoPage } from '../pages/bem-vindo/bem-vindo';
import { EstatisticaPage } from '../pages/estatistica/estatistica';
import { SimuladorPage } from '../pages/simulador/simulador';
import { FechamentoPage } from '../pages/fechamento/fechamento';
import { ApostaPage } from '../pages/aposta/aposta';
import { GruposEspeciaisPage } from '../pages/grupos-especiais/grupos-especiais';
import { BolaoPage } from '../pages/bolao/bolao';
import { HistoricoDeApostasPage } from '../pages/historico-de-apostas/historico-de-apostas';

import { ConcursoDAOServico } from '../dao/concurso/concurso-dao.servico';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';
import { StorageService } from '../services/storage.service';
import { ContaService } from '../services/conta.service';
import { EnderecoService } from '../services/endereco.service';
import { UtilService } from '../services/util.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';

import { DataTableModule } from "angular2-datatable";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';

@NgModule({
	declarations: [
		MyApp,
		NavBarAgS,
		EstatisticaAgs,
		FrequenciaAcumuladaAgs,
		FrequenciaSomaDezenasAgs,
		LoginPage,
		ContaPage,
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
		BrowserModule,
		HttpModule,
		HttpClientModule,
		DataTableModule,
		BrowserAnimationsModule,
		CalendarModule,
		InputTextModule,
		InputMaskModule,
		DropdownModule,
		PasswordModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		NavBarAgS,
		EstatisticaAgs,
		FrequenciaAcumuladaAgs,
		FrequenciaSomaDezenasAgs,
		LoginPage,
		ContaPage,
		BemVindoPage,
		EstatisticaPage,
		SimuladorPage,
		FechamentoPage,
		ApostaPage,
		GruposEspeciaisPage,
		BolaoPage,
		HistoricoDeApostasPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		ConcursoDAOServico,
		AuthService,
		MenuService,
		ErrorInterceptorProvider,
		StorageService,
		ContaService,
		EnderecoService,
		UtilService,
		AuthInterceptorProvider,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{ provide: LOCALE_ID, useValue: "pt-BR" }
	]
})
export class AppModule { }
