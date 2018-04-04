import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BemVindoPage } from './bem-vindo';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';
import { DataTableModule } from 'angular2-datatable';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		BemVindoPage,
	],
	imports: [
		NavBarSsModule,
		DataTableModule,
		RodapeSsModule,
		IonicPageModule.forChild(BemVindoPage),
	],
})
export class BemVindoPageModule { }
