import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GruposEspeciaisPage } from './grupos-especiais';
import { RodapeSsModule } from '../../componentes/rodape/rodape.ss.module';
import { NavBarSsModule } from '../../componentes/nav-bar/navbar.ss.module';

@NgModule({
  declarations: [
    GruposEspeciaisPage,
  ],
  imports: [
    NavBarSsModule,
    RodapeSsModule,
    IonicPageModule.forChild(GruposEspeciaisPage),
  ],
})
export class GruposEspeciaisPageModule {}
