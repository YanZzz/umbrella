import { Component, OnInit } from '@angular/core';
import { Record, ReportData } from '../models/customer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  records: Array<Record>;
  chart = [];
  constructor(
    private service: CustomerService,
    private router: Router
  ) {
    this.service.report().subscribe(r => {
      this.records = r.report.customers;
      this.createChat(this.records, 4);
    });
  }

  ngOnInit() {
  }

  // https://www.chartjs.org/docs/latest/getting-started/usage.html
  // http://localhost:8061/
  private createChat(records: Array<Record>, topX: number) {
    const labelList = [];
    const dataList = [];
    const backgroundcolors = [];

    if (!records || records.length === 0) {
      return;
    }

    const total = records.length;

    for (let i = 0; i < topX; i++) {
      if (i < total) {
        labelList.push(records[i].name);
        dataList.push(records[i].numberOfEmployees);
        const rain = records[i].rain;
        if (rain) {
          backgroundcolors.push('green');
        } else {
          backgroundcolors.push('red');
        }
      }
    }

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labelList,
        datasets: [{
          label: 'fake umbrella, we keep you dry - report',
          data: dataList,
          backgroundColor: backgroundcolors,
          borderColor: [
          ],
          borderWidth: 0
        }]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
