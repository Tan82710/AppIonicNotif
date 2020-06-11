import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BgsNotifPage } from './bgs-notif.page';

const routes: Routes = [
  {
    path: '',
    component: BgsNotifPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BgsNotifPageRoutingModule {}
