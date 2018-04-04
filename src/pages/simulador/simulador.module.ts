import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimuladorPage } from './simulador';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		SimuladorPage,
	],
	imports: [
		RodapeSsModule,
		IonicPageModule.forChild(SimuladorPage),
	],
})
export class SimuladorPageModule { }
