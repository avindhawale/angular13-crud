import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [DashboardComponent, UserFormComponent, AlertComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
