import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerEditorComponent } from './customer-editor/customer-editor.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';


@NgModule({
  declarations: [CustomerComponent, CustomersComponent, CustomerEditorComponent, CustomerDeleteComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
