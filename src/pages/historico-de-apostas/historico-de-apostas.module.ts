import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoDeApostasPage } from './historico-de-apostas';

@NgModule({
	declarations: [
		HistoricoDeApostasPage,
	],
	imports: [
		IonicPageModule.forChild(HistoricoDeApostasPage),
	],
})
export class HistoricoDeApostasPageModule { }
