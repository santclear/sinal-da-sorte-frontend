import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AtualizarResultadosSs } from './atualizar-resultados.ss';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ AtualizarResultadosSs ],
	imports: [ IonicModule ],
	exports: [ AtualizarResultadosSs ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtualizarResultadosSsModule { }
