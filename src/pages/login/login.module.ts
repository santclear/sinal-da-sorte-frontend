import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		LoginPage,
	],
	imports: [
		RodapeSsModule,
		IonicPageModule.forChild(LoginPage),
	]
})
export class LoginPageModule { }
