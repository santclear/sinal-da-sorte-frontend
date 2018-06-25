import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimuladorPage } from './simulador';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';

@NgModule({
	declarations: [
		SimuladorPage,
	],
	imports: [
		NavBarSsModule,
		RodapeSsModule,
		IonicPageModule.forChild(SimuladorPage),
	],
})
export class SimuladorPageModule { }
