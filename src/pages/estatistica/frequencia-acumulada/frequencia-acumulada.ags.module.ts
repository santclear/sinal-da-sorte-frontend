import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DataTableModule } from 'angular2-datatable';
import { FrequenciaAcumuladaAgs } from './frequencia-acumulada.ags';
import { EstatisticaAgsModule } from '../base/estatistica.ags.module';

@NgModule({
	declarations: [ FrequenciaAcumuladaAgs ],
	// Os módulos devem ser importados na ordem correta
	imports: [ 
		IonicModule,
		DataTableModule,
		EstatisticaAgsModule
	],
	exports: [ FrequenciaAcumuladaAgs ]
})
export class FrequenciaAcumuladaAgsModule { }
