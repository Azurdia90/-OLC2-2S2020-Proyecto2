import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaSimbolosPageRoutingModule } from './tabla-simbolos-routing.module';

import { TablaSimbolosPage } from './tabla-simbolos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablaSimbolosPageRoutingModule
  ],
  declarations: [TablaSimbolosPage]
})
export class TablaSimbolosPageModule {}
