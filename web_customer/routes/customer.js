const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const ForecastInfo = require('../models/forecast');
const ReportService = require('../services/report');

//
// Add a new customer
//
router.post('/add', (req, res, next) => {
    let newCustomer = new Customer({
        name: req.body.name,
        contact: req.body.contact,
        telephone: req.body.telephone,
        numberOfEmployees: req.body.numberOfEmployees,
        country: req.body.country,
        city: req.body.city
    });

    Customer.addCustomer(newCustomer, (err, customer) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add customer' });
        } else {
            res.json({ success: true, msg: 'customer has been added successfully.', _id: customer._id });
        }
    });
});

//
// Update a existing customer info.
//
router.post('/update', async (req, res, next) => {
    try {
        // Todo: Validation on all inputs fields.
        const customerId = req.body._id;
        const name = req.body.name;
        const contact = req.body.contact;
        const telephone = req.body.telephone;
        const numberOfEmployees = req.body.numberOfEmployees;
        const country = req.body.country;
        const city = req.body.city;

        let customer = null;
        try {
            customer = await Customer.findById(customerId);
            if (customer == null) {
                res.json({ success: false, msg: 'customer not found when updating.' });
                return;
            }
        } catch (err) {
            console.log("Error when find by id: ", customerId);
            res.json({ success: false, msg: 'System is out of service now, please contact system admin. (1E)' });
            return;
        }

        customer.name = name;
        customer.contact = contact;
        customer.telephone = telephone;
        customer.numberOfEmployees = numberOfEmployees;
        customer.country = country;
        customer.city = city;

        Customer.updateCustomer(customer, (err, customer) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to update customer' });
            } else {
                res.json({ success: true, msg: 'customer has been updated successfully.' });
            }
        });
    } catch (error) {
        res.json({ success: false, msg: "System is out of service now, please contact system admin. (2E)" });
    }
});

//
// Delete by id
//
router.post('/delete', async (req, res, next) => {
    const customerId = req.body._id;

    // Todo: validation on customer Id

    let customer = null;
    try {
        customer = await Customer.findById(customerId);
        if (customer == null) {
            res.json({ success: false, msg: 'customer not found when deleting.' });
            return;
        }
    } catch (err) {
        console.log("Error when find by id: ", customerId);
        res.json({ success: false, msg: 'System is out of service now, please contact system admin. (1E)' });
        return;
    }

    let result = await Customer.deleteCustomer(customerId);
    if (!result) {
        res.json({ success: false, msg: 'Failed to delete this customer.' });
    } else {
        res.json({ success: true, msg: 'customer has been deleted successfully.', customerId });
    }
});


//
// Report
//
router.get('/report', async (req, res, next) => {
    let reportService = new ReportService();
    let report = await reportService.get();
    console.log('report: ', report);
    res.json({success: true, report: report});
});

//
// Get all
//
router.get('/', async (req, res, next) => {
    try {
        let list = await Customer.getAllCustomers();
        res.json(list);
    } catch (err) {
        res.json([]);
    }
});

//
// Health checking
//  
router.get('/health', async (req, res, next) => {
    let now = new Date();
    let show = now.toLocaleTimeString();
    let f = new ForecastInfo(now);
    console.log('******** health check ******');
    res.json({ hello: f.getHealth() });
});

module.exports = router;