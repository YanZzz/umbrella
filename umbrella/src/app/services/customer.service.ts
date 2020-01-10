import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, Record, ResMessage, DeleteCustomerMessage, ReportData } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'http://127.0.0.1';
  port = 8061;

  constructor(private http: HttpClient) {}

  healthCheck() {
    const health = `${this.url}:${this.port}/customers/health`;
    return this.http.get(health);
  }

  createCustomer(customer: Customer): Observable<ResMessage> {
    const create = `${this.url}:${this.port}/customers/add`;
    return this.http.post<ResMessage>(create, customer);
  }

  updateCustomer(customer: Customer): Observable<ResMessage> {
    const update = `${this.url}:${this.port}/customers/update`;
    return this.http.post<ResMessage>(update, customer);
  }

  deleteCustomer(customer: Customer): Observable<DeleteCustomerMessage> {
    const update = `${this.url}:${this.port}/customers/delete`;
    return this.http.post<DeleteCustomerMessage>(update, customer);
  }

  get(): Observable<Array<Record>> {
    const get = `${this.url}:${this.port}/customers`;
    return this.http.get<Array<Record>>(get);
  }

  report(): Observable<ReportData>{
    const report = `${this.url}:${this.port}/customers/report`;
    return this.http.get<ReportData>(report);
  }
}
