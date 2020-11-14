import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaSimbolosPageRoutingModule } from './tabla-simbolos-routing.module';
import { ComponentsModule } from '../../Components/components.module';
import { TablaSimbolosPage } from './tabla-simbolos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TablaSimbolosPageRoutingModule
  ],
  declarations: [TablaSimbolosPage]
})
export class TablaSimbolosPageModule {}
