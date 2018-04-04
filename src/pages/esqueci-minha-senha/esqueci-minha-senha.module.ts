import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EsqueciMinhaSenhaPage } from './esqueci-minha-senha';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		EsqueciMinhaSenhaPage,
	],
	imports: [
		RodapeSsModule,
		IonicPageModule.forChild(EsqueciMinhaSenhaPage),
	],
})
export class EsqueciMinhaSenhaPageModule { }
