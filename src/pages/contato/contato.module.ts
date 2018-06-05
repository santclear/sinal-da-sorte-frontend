import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatoPage } from './contato';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CaptchaModule } from 'primeng/captcha';

@NgModule({
	declarations: [
		ContatoPage,
	],
	imports: [
		RadioButtonModule,
		InputTextModule,
		InputTextareaModule,
		NavBarSsModule,
		CaptchaModule,
		RodapeSsModule,
		IonicPageModule.forChild(ContatoPage),
	],
})
export class ContatoPageModule { }