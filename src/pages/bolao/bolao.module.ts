import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BolaoPage } from './bolao';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		BolaoPage,
	],
	imports: [
		RodapeSsModule,
		IonicPageModule.forChild(BolaoPage),
	],
})
export class BolaoPageModule { }
