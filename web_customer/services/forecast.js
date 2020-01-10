const City = require("../models/forecast");
// const Forecase = require("../models/forecast");
const https = require('https');


class ForecastService {

    get = async(city, country) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=2bffd518832bcc0bb54aec227dd2bfcb`;
        const urlSample = `https://samples.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=b6907d289e10d714a6e88b30761fae22`;
        return new Promise( (resolve, reject ) => {
            this.get_handler(urlSample, resolve, reject, city, country);
        });
    }

    get_handler(url, resolve, reject, city, country) {
        console.log(url);
        https.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', ()=> {
                let result = JSON.parse(data);
                console.log(result);
                resolve({success: true, data: result, city: city, country: country});
            })

            resp.on('error', (err) => {
                console.log(err);
                reject({success: false, error: err})
            })
        });
    }
}

module.exports = ForecastService;
