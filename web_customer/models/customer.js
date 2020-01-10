  
const mongoose = require('mongoose');

// Customer Schema
const CustomerSchema = mongoose.Schema ({
  name: {
    type: String,
    require: true
  },
  contact: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  numberOfEmployees: {
      type: Number,
      require: true
  },
  country: {
      type: String,
      require: true
  },
  city: {
      type: String,
      require: true
  }
});

const Customer = module.exports = mongoose.model('Customer', CustomerSchema);

module.exports.addCustomer = function(newCustomer, callback) {
    newCustomer.save(callback);
}

module.exports.updateCustomer = function(newCustomer, callback) {
    newCustomer.save(callback);
}

module.exports.deleteCustomer =  (customerId) => {
    return Customer.deleteOne( { _id: customerId }).exec()
        .then( r => {
            console.log(r);
            return true;
        } )
        .catch(error => {
            console.log('error in delete: ',  error);
            return false;
        });
}

module.exports.getAllCustomers = () => {
    return Customer.find({}).exec()
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => console.log(err))
}