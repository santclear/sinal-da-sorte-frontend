import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandingPage } from './landing';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { NavbarConversaoLandscapeSsModule } from '../../componentes/navbar-conversao-landscape/navbar-conversao-landscape.ss.module';

@NgModule({
	declarations: [
		LandingPage,
	],
	imports: [
		NavbarConversaoLandscapeSsModule,
		RodapeSsModule,
		IonicPageModule.forChild(LandingPage),
	],
})
export class LandingPageModule { }
