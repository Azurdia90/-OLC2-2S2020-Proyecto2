import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {FormularioTraducirComponent} from '../Components/formulario-traducir/formulario-traducir.component';
import {FormularioTablaSimbolosComponent} from '../Components/formulario-tabla-simbolos/formulario-tabla-simbolos.component';
import {FormularioTablaErroresComponent} from '../Components/formulario-tabla-errores/formulario-tabla-errores.component';
import {FormularioGraficarComponent} from '../Components/formulario-graficar/formulario-graficar.component';
import {FormularioOptimizacionComponent} from '../Components/formulario-optimizacion/formulario-optimizacion.component';

@NgModule({
  declarations: 
  [
    FormularioTraducirComponent,
    FormularioTablaSimbolosComponent,
    FormularioTablaErroresComponent,
    FormularioGraficarComponent,
    FormularioOptimizacionComponent,
  ],
  imports:
  [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  exports:
  [
    FormularioTraducirComponent,
    FormularioTablaSimbolosComponent,
    FormularioTablaErroresComponent,
    FormularioGraficarComponent,
    FormularioOptimizacionComponent,
  ]
})
export class ComponentsModule { }
