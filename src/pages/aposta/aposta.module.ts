import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApostaPage } from './aposta';

@NgModule({
	declarations: [
		ApostaPage,
	],
	imports: [
		IonicPageModule.forChild(ApostaPage),
	],
})
export class ApostaPageModule { }
