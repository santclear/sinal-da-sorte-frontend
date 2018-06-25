import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoDeApostasPage } from './historico-de-apostas';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';

@NgModule({
	declarations: [
		HistoricoDeApostasPage,
	],
	imports: [
		NavBarSsModule,
		RodapeSsModule,
		IonicPageModule.forChild(HistoricoDeApostasPage),
	],
})
export class HistoricoDeApostasPageModule { }
