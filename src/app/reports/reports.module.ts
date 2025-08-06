import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ReportsComponent,
    DeleteConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    SharedModule
  ]
})
export class ReportsModule { }
