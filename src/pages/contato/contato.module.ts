import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatoPage } from './contato';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RecaptchaModule } from 'ng-recaptcha';
import { DoacaoSsModule } from '../../componentes/doacao/doacao.ss.module';

@NgModule({
	declarations: [
		ContatoPage,
	],
	imports: [
		RadioButtonModule,
		InputTextModule,
		InputTextareaModule,
		NavBarSsModule,
		DoacaoSsModule,
		RodapeSsModule,
		RecaptchaModule.forRoot(),
		IonicPageModule.forChild(ContatoPage),
	],
})
export class ContatoPageModule { }