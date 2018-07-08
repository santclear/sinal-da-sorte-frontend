import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatoExternoPage } from './contato-externo';
import { NavBarSsModule } from '../../../componentes/nav-bar/navbar.ss.module';
import { RodapeSsModule } from '../../../componentes/rodape/rodape.ss.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
	declarations: [
		ContatoExternoPage,
	],
	imports: [
		RadioButtonModule,
		InputTextModule,
		InputTextareaModule,
		NavBarSsModule,
		RodapeSsModule,
		RecaptchaModule.forRoot(),
		IonicPageModule.forChild(ContatoExternoPage),
	],
})
export class ContatoPageModule { }