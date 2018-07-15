import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { FrequenciaAcumuladaSs } from './frequencia-acumulada.ss';
import { EstatisticaSsModule } from '../base/estatistica.ss.module';

@NgModule({
	declarations: [ FrequenciaAcumuladaSs ],
	// Os módulos devem ser importados na ordem correta
	imports: [ 
		IonicModule,
		TableModule,
		DataViewModule,
		DropdownModule,
		EstatisticaSsModule
	],
	exports: [ FrequenciaAcumuladaSs ]
})
export class FrequenciaAcumuladaSsModule { }
