import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomerEditorComponent } from './customer-editor/customer-editor.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'del/:id/:name', component: CustomerDeleteComponent},
  { path: 'edit/:id', component: CustomerEditorComponent},
  { path: ':id', component: CustomerEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
