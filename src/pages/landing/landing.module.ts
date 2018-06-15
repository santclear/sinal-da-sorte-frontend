import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandingPage } from './landing';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		LandingPage,
	],
	imports: [
		RodapeSsModule,
		IonicPageModule.forChild(LandingPage),
	],
})
export class LandingPageModule { }
