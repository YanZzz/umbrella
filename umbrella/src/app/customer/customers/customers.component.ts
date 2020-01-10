import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers$: Observable<Array<Customer>>;

  constructor(private service: CustomerService) {
    this.customers$ = this.service.get();
  }

  ngOnInit() {
  }

}
