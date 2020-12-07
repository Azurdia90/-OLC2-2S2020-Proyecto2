import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../Components/components.module';
import { OptimizacionPageRoutingModule } from './optimizacion-routing.module';
import { OptimizacionPage } from './optimizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    OptimizacionPageRoutingModule
  ],
  declarations: [OptimizacionPage]
})
export class OptimizacionPageModule {}
