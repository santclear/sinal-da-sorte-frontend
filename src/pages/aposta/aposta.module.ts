import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApostaPage } from './aposta';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		ApostaPage,
	],
	imports: [
		RodapeSsModule,
		IonicPageModule.forChild(ApostaPage),
	],
})
export class ApostaPageModule { }
