import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavBarSs } from './navbar.ss';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ NavBarSs ],
	imports: [ IonicModule ],
	exports: [ NavBarSs ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavBarSsModule { }
