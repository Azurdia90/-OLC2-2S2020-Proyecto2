import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GraficaPageRoutingModule } from './grafica-routing.module';
import { ComponentsModule } from '../../Components/components.module';

import { GraficaPage } from './grafica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GraficaPageRoutingModule
  ],
  declarations: [GraficaPage]
})
export class GraficaPageModule {}
