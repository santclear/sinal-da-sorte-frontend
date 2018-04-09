import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TableModule } from 'primeng/table';
import { FrequenciaAcumuladaSs } from './frequencia-acumulada.ss';
import { EstatisticaSsModule } from '../base/estatistica.ss.module';

@NgModule({
	declarations: [ FrequenciaAcumuladaSs ],
	// Os módulos devem ser importados na ordem correta
	imports: [ 
		IonicModule,
		TableModule,
		EstatisticaSsModule
	],
	exports: [ FrequenciaAcumuladaSs ]
})
export class FrequenciaAcumuladaSsModule { }
