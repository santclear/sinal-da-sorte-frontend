import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApostaPage } from './aposta';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';

@NgModule({
	declarations: [
		ApostaPage,
	],
	imports: [
		NavBarSsModule,
		RodapeSsModule,
		IonicPageModule.forChild(ApostaPage),
	],
})
export class ApostaPageModule { }
