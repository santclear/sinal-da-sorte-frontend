import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FechamentoPage } from './fechamento';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';

@NgModule({
	declarations: [
		FechamentoPage,
	],
	imports: [
		NavBarSsModule,
		RodapeSsModule,
		IonicPageModule.forChild(FechamentoPage),
	],
})
export class FechamentoPageModule { }
