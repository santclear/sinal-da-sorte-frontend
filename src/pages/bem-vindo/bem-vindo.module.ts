import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BemVindoPage } from './bem-vindo';
import { NavBarAgSModule } from '../../componentes/navbar.ags.module';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
	declarations: [
		BemVindoPage,
	],
	imports: [
		NavBarAgSModule,
		DataTableModule,
		IonicPageModule.forChild(BemVindoPage),
	],
})
export class BemVindoPageModule { }
