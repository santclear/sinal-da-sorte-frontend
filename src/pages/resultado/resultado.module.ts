import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadoPage } from './resultado';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		ResultadoPage,
	],
	imports: [
		NavBarSsModule,
		TableModule,
		DataViewModule,
		DropdownModule,
		RodapeSsModule,
		IonicPageModule.forChild(ResultadoPage),
	],
})
export class ResultadoPageModule { }
