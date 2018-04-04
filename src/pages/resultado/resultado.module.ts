import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadoPage } from './resultado';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';
import { DataTableModule } from 'angular2-datatable';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		ResultadoPage,
	],
	imports: [
		NavBarSsModule,
		DataTableModule,
		RodapeSsModule,
		IonicPageModule.forChild(ResultadoPage),
	],
})
export class ResultadoPageModule { }
