import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DoacaoSs } from './doacao.ss';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ DoacaoSs ],
	imports: [ IonicModule ],
	exports: [ DoacaoSs ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoacaoSsModule { }
