import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BgsNotifPageRoutingModule } from './bgs-notif-routing.module';

import { BgsNotifPage } from './bgs-notif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BgsNotifPageRoutingModule
  ],
  declarations: [BgsNotifPage]
})
export class BgsNotifPageModule {}
