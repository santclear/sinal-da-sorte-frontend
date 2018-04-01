import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DataTableModule } from 'angular2-datatable';
import { FrequenciaSomaDezenasAgs } from './frequencia-soma-dezenas.ags';
import { EstatisticaAgsModule } from '../base/estatistica.ags.module';

@NgModule({
	declarations: [ FrequenciaSomaDezenasAgs ],
	// Os módulos devem ser importados na ordem correta
	imports: [
		IonicModule, 
		DataTableModule,
		EstatisticaAgsModule
	],
	exports: [ FrequenciaSomaDezenasAgs ]
})
export class FrequenciaSomaDezenasAgsModule { }
