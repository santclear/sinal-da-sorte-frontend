import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { FrequenciaSomaDezenasSs } from './frequencia-soma-dezenas.ss';
import { EstatisticaSsModule } from '../base/estatistica.ss.module';

@NgModule({
	declarations: [ FrequenciaSomaDezenasSs ],
	// Os módulos devem ser importados na ordem correta
	imports: [
		IonicModule, 
		TableModule,
		DataViewModule,
		DropdownModule,
		EstatisticaSsModule
	],
	exports: [ FrequenciaSomaDezenasSs ]
})
export class FrequenciaSomaDezenasSsModule { }
