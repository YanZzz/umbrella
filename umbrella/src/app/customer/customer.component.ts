import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: CustomerService,
    private router: Router) { }

  ngOnInit() {
    this.service.healthCheck().subscribe(info => console.log(info));
  }

  add() {
    this.router.navigate(['customer/edit/0']);
  }

}
