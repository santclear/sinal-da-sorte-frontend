import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarConversaoLandscapeSs } from './navbar-conversao-landscape.ss';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ NavbarConversaoLandscapeSs ],
	imports: [ IonicModule ],
	exports: [ NavbarConversaoLandscapeSs ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NavbarConversaoLandscapeSsModule { }