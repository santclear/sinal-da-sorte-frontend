import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavegadoresSuportadosSs } from './navegadores-suportados.ss';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ NavegadoresSuportadosSs ],
	imports: [ IonicModule ],
	exports: [ NavegadoresSuportadosSs ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NavegadoresSuportadosSsModule { }
