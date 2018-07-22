import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtualizacaoContaPage } from './atualizacao-conta';
import { NavBarSsModule } from '../../../componentes/nav-bar/navbar.ss.module';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { RecaptchaModule } from 'ng-recaptcha';
import { RodapeSsModule } from '../../../componentes/rodape/rodape.ss.module';
import { BloqueiaCopiaColaDirectiveModule } from '../../../diretivas/bloqueia-copia-cola.module';
import { DoacaoSsModule } from '../../../componentes/doacao/doacao.ss.module';

@NgModule({
	declarations: [
		AtualizacaoContaPage
	],
	imports: [
		NavBarSsModule,
		CalendarModule,
		InputTextModule,
		InputMaskModule,
		DropdownModule,
		PasswordModule,
		TabViewModule,
		CardModule,
		BloqueiaCopiaColaDirectiveModule,
		DoacaoSsModule,
		RodapeSsModule,
		RecaptchaModule.forRoot(),
		IonicPageModule.forChild(AtualizacaoContaPage),
	]
})
export class AtualizacaoContaPageModule { }
