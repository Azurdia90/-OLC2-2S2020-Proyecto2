import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaErroresPage } from './tabla-errores.page';

const routes: Routes = [
  {
    path: '',
    component: TablaErroresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaErroresPageRoutingModule {}
