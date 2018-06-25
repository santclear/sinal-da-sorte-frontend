import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BolaoPage } from './bolao';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';

@NgModule({
	declarations: [
		BolaoPage,
	],
	imports: [
		NavBarSsModule,
		RodapeSsModule,
		IonicPageModule.forChild(BolaoPage),
	],
})
export class BolaoPageModule { }
