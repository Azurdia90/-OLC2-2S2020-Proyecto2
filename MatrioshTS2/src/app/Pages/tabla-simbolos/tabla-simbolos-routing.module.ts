import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaSimbolosPage } from './tabla-simbolos.page';

const routes: Routes = [
  {
    path: '',
    component: TablaSimbolosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaSimbolosPageRoutingModule {}
