import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContaPage } from './conta';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CaptchaModule } from 'primeng/captcha';

@NgModule({
	declarations: [
		ContaPage,
	],
	imports: [
		CalendarModule,
		InputTextModule,
		InputMaskModule,
		DropdownModule,
		PasswordModule,
		CaptchaModule,
		RodapeSsModule,
		IonicPageModule.forChild(ContaPage),
	]
})
export class ContaPageModule { }
