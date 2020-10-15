import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraducirPageRoutingModule } from './traducir-routing.module';

import { TraducirPage } from './traducir.page';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TraducirPageRoutingModule
  ],
  declarations: [TraducirPage]
})
export class TraducirPageModule {}
