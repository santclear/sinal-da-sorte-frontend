import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstatisticaPage } from './estatistica';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';
import { FrequenciaAcumuladaSsModule } from './frequencia-acumulada/frequencia-acumulada.ss.module';
import { FrequenciaSomaDezenasSsModule } from './frequencia-soma-dezenas/frequencia-soma-dezenas.ss.module';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { DoacaoSsModule } from '../../componentes/doacao/doacao.ss.module';
import { AvisoSsModule } from '../../componentes/aviso/aviso.ss.module';

@NgModule({
	declarations: [
		EstatisticaPage,
	],
	// Os módulos devem ser importados na ordem correta
	imports: [
		NavBarSsModule,
		AvisoSsModule,
		FrequenciaAcumuladaSsModule,
		FrequenciaSomaDezenasSsModule,
		DoacaoSsModule,
		RodapeSsModule,
		IonicPageModule.forChild(EstatisticaPage),
	]
})
export class EstatisticaPageModule { }
