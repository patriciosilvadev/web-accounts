import { NgModule } from '@angular/core';
import { LotPermissionDialogComponent } from './lot-permission-dialog.component';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatChipsModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SinglePermissionDialogComponent } from './single-permission/single-permission-dialog.component';

@NgModule({
  declarations: [LotPermissionDialogComponent, SinglePermissionDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  exports: [LotPermissionDialogComponent, SinglePermissionDialogComponent]
})
export class LotPermissionDialogModule {}