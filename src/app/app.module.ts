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
import { AdMobFree } from '@ionic-native/admob-free';

import { MyApp } from './app.component';

import { ConcursoDAOServico } from '../dao/concurso/concurso-dao.servico';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';
import { StorageService } from '../services/storage.service';
import { ContaService } from '../services/conta.service';
import { EnderecoService } from '../services/endereco.service';
import { UtilService } from '../services/util.service';
import { UsuarioService } from '../services/usuario.service';
import { EmailService } from '../services/email.service';
import { NavegadoresSuportadosService } from '../services/navegadores-suportados.service';
import { IntersticialAdMobService } from '../services/intersticial-admob.service';
import { AvisoService } from '../services/aviso.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContaPageModule } from '../pages/conta/conta.module';
import { ResultadoPageModule } from '../pages/resultado/resultado.module';
import { EsqueciMinhaSenhaPageModule } from '../pages/esqueci-minha-senha/esqueci-minha-senha.module';
import { BannerAdMobService } from '../services/banner-admob.service';

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		HttpModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ContaPageModule,
		ResultadoPageModule,
		EsqueciMinhaSenhaPageModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
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
		UsuarioService,
		EmailService,
		NavegadoresSuportadosService,
		BannerAdMobService,
		IntersticialAdMobService,
		AuthInterceptorProvider,
		AdMobFree,
		AvisoService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{ provide: LOCALE_ID, useValue: "pt-BR" }
	]
})
export class AppModule { }
