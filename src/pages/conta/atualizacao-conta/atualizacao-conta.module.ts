import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtualizacaoContaPage } from './atualizacao-conta';
import { NavBarAgSModule } from '../../../componentes/navbar.ags.module';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';

@NgModule({
	declarations: [
		AtualizacaoContaPage,
	],
	imports: [
		NavBarAgSModule,
		CalendarModule,
		InputTextModule,
		InputMaskModule,
		DropdownModule,
		PasswordModule,
		TabViewModule,
		CardModule,
		IonicPageModule.forChild(AtualizacaoContaPage),
	],
})
export class AtualizacaoContaPageModule { }
