import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FechamentoPage } from './fechamento';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		FechamentoPage,
	],
	imports: [
		RodapeSsModule,
		IonicPageModule.forChild(FechamentoPage),
	],
})
export class FechamentoPageModule { }
