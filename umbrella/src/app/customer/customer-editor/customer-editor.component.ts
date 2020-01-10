import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, exhaust, exhaustMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { FormBuilder } from '@angular/forms';
import { ResMessage } from '../../models/customer';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.css']
})
export class CustomerEditorComponent implements OnInit {

  customerForm: FormGroup;
  updating = false;
  message: ResMessage;
  disabled = false;

  constructor(
    private route: ActivatedRoute,
    private service: CustomerService,
    private fb: FormBuilder,
    private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    const customer = this.route.snapshot.params as Customer;
    const object = Object.keys(customer).length > 0;
    if ( !object ||  (customer as any).id === '0') {
      return;
    }

    this.customerForm.setValue({
      name: customer.name,
      contact: customer.contact,
      telephone: customer.telephone,
      numbers: customer.numberOfEmployees,
      city: customer.city,
      country: customer.country,
      _id: customer._id
    });
  }

  goback() {
    this.router.navigate(['/customer']);
  }

  onSubmit() {
    const customer = new Customer();
    customer.name = this.customerForm.get('name').value;
    customer.contact = this.customerForm.get('contact').value;
    customer.telephone = this.customerForm.get('telephone').value;
    customer.numberOfEmployees = this.customerForm.get('numbers').value;
    customer.city = this.customerForm.get('city').value;
    customer.country = this.customerForm.get('country').value;
    customer._id = this.customerForm.get('_id').value;
    console.log(customer);

    if (customer._id !== '') {
      this.updating = true;
      this.service.updateCustomer(customer).subscribe(
        r => {
          this.updating = false;
          this.message = r;
          if(r.success) { this.disabled = true;}
        });
    } else {
      this.updating = true;
      this.service.createCustomer(customer).subscribe(
        r => {
          this.updating = false;
          this.message = r;
          if(r.success) { this.disabled = true;}
        });
    }
  }

  private createForm() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      telephone: ['', Validators.required],
      numbers: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      _id: [''],
    });
  }

}
