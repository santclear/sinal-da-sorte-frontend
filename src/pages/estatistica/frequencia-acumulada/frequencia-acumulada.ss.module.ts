import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DataTableModule } from 'angular2-datatable';
import { FrequenciaAcumuladaSs } from './frequencia-acumulada.ss';
import { EstatisticaSsModule } from '../base/estatistica.ss.module';

@NgModule({
	declarations: [ FrequenciaAcumuladaSs ],
	// Os módulos devem ser importados na ordem correta
	imports: [ 
		IonicModule,
		DataTableModule,
		EstatisticaSsModule
	],
	exports: [ FrequenciaAcumuladaSs ]
})
export class FrequenciaAcumuladaSsModule { }
