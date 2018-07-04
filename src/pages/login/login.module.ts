import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { NavegadoresSuportadosSsModule } from '../../componentes/navegadores-suportados/navegadores-suportados.ss.module';

@NgModule({
	declarations: [
		LoginPage,
	],
	imports: [
		NavegadoresSuportadosSsModule,
		RodapeSsModule,
		IonicPageModule.forChild(LoginPage),
	]
})
export class LoginPageModule { }
