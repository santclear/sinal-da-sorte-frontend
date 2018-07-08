import { RodapeSsModule } from '../../../componentes/rodape/rodape.ss.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContaExternoPage } from './conta-externo';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { RecaptchaModule } from 'ng-recaptcha';
import { BloqueiaCopiaColaDirectiveModule } from '../../../diretivas/bloqueia-copia-cola.module';
import { NavbarConversaoLandscapeSsModule } from '../../../componentes/navbar-conversao-landscape/navbar-conversao-landscape.ss.module';

@NgModule({
	declarations: [
		ContaExternoPage
	],
	imports: [
		NavbarConversaoLandscapeSsModule,
		CalendarModule,
		InputTextModule,
		InputMaskModule,
		DropdownModule,
		PasswordModule,
		BloqueiaCopiaColaDirectiveModule,
		RodapeSsModule,
		RecaptchaModule.forRoot(),
		IonicPageModule.forChild(ContaExternoPage),
	]
})
export class ContaPageModule { }
