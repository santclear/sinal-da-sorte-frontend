import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RodapeSs } from './rodape.ss';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ RodapeSs ],
	imports: [ IonicModule ],
	exports: [ RodapeSs ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RodapeSsModule { }
