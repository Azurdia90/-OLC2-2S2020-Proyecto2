import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptimizacionPage } from './optimizacion.page';

const routes: Routes = [
  {
    path: '',
    component: OptimizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptimizacionPageRoutingModule {}
