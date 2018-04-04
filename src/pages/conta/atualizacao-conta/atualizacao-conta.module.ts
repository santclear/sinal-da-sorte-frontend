import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtualizacaoContaPage } from './atualizacao-conta';
import { NavBarSsModule } from '../../../componentes/nav-bar/navbar.ss.module';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { RodapeSsModule } from '../../../componentes/rodape/rodape.ss.module';

@NgModule({
	declarations: [
		AtualizacaoContaPage,
	],
	imports: [
		NavBarSsModule,
		CalendarModule,
		InputTextModule,
		InputMaskModule,
		DropdownModule,
		PasswordModule,
		TabViewModule,
		CardModule,
		RodapeSsModule,
		IonicPageModule.forChild(AtualizacaoContaPage),
	],
})
export class AtualizacaoContaPageModule { }
