import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer, DeleteCustomerMessage } from 'src/app/models/customer';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {
  name$ = this.route.params.pipe(pluck('name'));
  id = '';
  message: DeleteCustomerMessage;

  disabled = false;

  constructor(
    private route: ActivatedRoute,
    private service: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = (this.route.snapshot.params as {id: string, name: string }).id;
  }

  goback() {
    this.router.navigate(['/customer']);
  }

  delete() {

    this.service.deleteCustomer({_id: this.id} as Customer ).subscribe(
      r => {
        this.message = r;
        if (r.success) {
          this.disabled = true;
        }
      }
    );
  }

}
