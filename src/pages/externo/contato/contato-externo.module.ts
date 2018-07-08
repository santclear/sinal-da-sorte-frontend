import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatoExternoPage } from './contato-externo';
import { RodapeSsModule } from '../../../componentes/rodape/rodape.ss.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RecaptchaModule } from 'ng-recaptcha';
import { NavbarConversaoLandscapeSsModule } from '../../../componentes/navbar-conversao-landscape/navbar-conversao-landscape.ss.module';

@NgModule({
	declarations: [
		ContatoExternoPage,
	],
	imports: [
		NavbarConversaoLandscapeSsModule,
		RadioButtonModule,
		InputTextModule,
		InputTextareaModule,
		RodapeSsModule,
		RecaptchaModule.forRoot(),
		IonicPageModule.forChild(ContatoExternoPage),
	],
})
export class ContatoPageModule { }