import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DataTableModule } from 'angular2-datatable';
import { FrequenciaSomaDezenasSs } from './frequencia-soma-dezenas.ss';
import { EstatisticaSsModule } from '../base/estatistica.ss.module';

@NgModule({
	declarations: [ FrequenciaSomaDezenasSs ],
	// Os módulos devem ser importados na ordem correta
	imports: [
		IonicModule, 
		DataTableModule,
		EstatisticaSsModule
	],
	exports: [ FrequenciaSomaDezenasSs ]
})
export class FrequenciaSomaDezenasSsModule { }
