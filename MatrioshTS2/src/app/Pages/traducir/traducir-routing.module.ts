import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraducirPage } from './traducir.page';

const routes: Routes = [
  {
    path: '',
    component: TraducirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraducirPageRoutingModule {}
