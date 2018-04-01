import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstatisticaPage } from './estatistica';
import { NavBarAgSModule } from '../../componentes/navbar.ags.module';
import { FrequenciaAcumuladaAgsModule } from './frequencia-acumulada/frequencia-acumulada.ags.module';
import { FrequenciaSomaDezenasAgsModule } from './frequencia-soma-dezenas/frequencia-soma-dezenas.ags.module';

@NgModule({
	declarations: [
		EstatisticaPage,
	],
	// Os módulos devem ser importados na ordem correta
	imports: [
		NavBarAgSModule,
		FrequenciaAcumuladaAgsModule,
		FrequenciaSomaDezenasAgsModule,
		IonicPageModule.forChild(EstatisticaPage),
	]
})
export class EstatisticaPageModule { }
