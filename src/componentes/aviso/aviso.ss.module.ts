import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AvisoSs } from './aviso.ss';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ AvisoSs ],
	imports: [ IonicModule ],
	exports: [ AvisoSs ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvisoSsModule { }
