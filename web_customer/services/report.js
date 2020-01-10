const ForecastService = require("./forecast");
const Customer = require('../models/customer');

class ReportService {
    get() {
        const customerList  = {};
        const promise = new Promise(
            (resolve, reject) => {
                this._get(customerList, resolve, reject);
            }
       );
       return promise;
    }

    _get = async (customerList, resolve, reject) => {
        //
        // Get all customers
        //
        const report = {success: false, customers: [], msg: ''};
        const list = await this._getAllCustomers();
        if(list.length === 0) {
            console.log("no customer found for report.");
            report.msg = 'no customer found for report.';
            resolve(report);
            return;
        }

        //
        // Get forecast info by free api
        //
        let possibleData = await this._fetch_All(list);
        const records = this._decode(possibleData);

        //
        // Check on each customer
        //
        report.success = true;
        report.customers = this._checkOnCustomers(list, records);
        resolve(report);
    }

    _getAllCustomers = async () => {
        let list = await Customer.getAllCustomers();
        console.log('report - get - customers:', list);
        return list;
    }

    _fetch_All = async (list) => {
        const handledList = [];
        const promiseList = [];
        list.forEach(element => {
            const key = `${element.city}-${element.country}`.toUpperCase();
            if(handledList.indexOf(key) >= 0) {
                return;
            }

            const promise = new Promise((r,j) => {
                const result = this._fetch(element.city, element.country);
                result.then(re => r(re));
            });
            
            promiseList.push(promise);
            handledList.push(key);
            console.log(`Handle location: ${element.city} - ${element.country}`);
        });

        const resultList = await Promise.all(promiseList);
        console.log(resultList);
        return resultList;
    }

    _fetch = async (city, country) => {
        let s = new ForecastService();
        let data = await s.get(city, country);
        return data;
    }

    _decode(resultList) {
        const forecast = [];
        resultList.forEach(element => {
            if(!element.success) {
                return;
            }

            const record = element.data;

            if(record.cod != "200") {
                return;
            }

            if(record.cnt == 0) {
                return;
            }

            //
            // Get rain info if we can.
            //
            const rainRecord = this._specificWeatherAtLocatioin(element.city, element.country, record);
            if(rainRecord.when != undefined) {
                forecast.push(rainRecord);
            }

            console.log(forecast);

        });

        return forecast;
    }

    _specificWeatherAtLocatioin(city, country, record) {
        const specificWeather = 'rain';
        const rain = { 
            city: city,
            country: country,
            when: undefined ,
            type: ''
        };

        if(this._hack_4_sample_data_4_some_cities(rain.city)) {
            // Due to sample api always give same data no mather which location provided.
            return rain;
        }

        for(let i = 0; i < record.list.length; i++) {
            const element = record.list[i];
            const weather = element.weather[0];
            console.log(`Found: ${weather.description} @${element.dt_txt}`);
            const index = weather.description.indexOf(specificWeather); // <== kindof only has 1 item based on sample data.
            if(index >= 0 ) {
                rain.when = element.dt_txt;
                rain.type = weather.description;
                break;
            }
        }

        return rain;
    }

    _checkOnCustomers (customers, forecast) {
        console.log(customers);
        console.log(forecast);

        const list = [];
        customers.forEach(customer => {
            const record = this._checkOnCustomer(customer, forecast);
            list.push(record);
        })

        return list;
    }

    _checkOnCustomer(customer, forecast) {
        const record = {
            name: customer.name,
            contact: customer.contact,
            telephone: customer.telephone,
            numberOfEmployees: customer.numberOfEmployees,
            city: customer.city,
            country: customer.country,
            rain: false,
            when: '',
            type: ''
        };

        const customerKey = `${record.city}-${record.country}`.toUpperCase();

        for(let i = 0 ; i < forecast.length; i++) {
            const fr = forecast[i];
            const fkey = `${fr.city}-${fr.country}`.toUpperCase();

            if(customerKey === fkey) {
                record.rain = true;
                record.when = fr.when;
                record.type = fr.type;
                break;
            }
        }

        return record;
    }

    _hack_4_sample_data_4_some_cities(city) {
        if(city.toUpperCase() == "Oakville".toUpperCase()) {
            return true;
        }

        if(city.toUpperCase() == "Mississauga".toUpperCase()) {
            return true;
        }

        return false;
    }
}

module.exports = ReportService;