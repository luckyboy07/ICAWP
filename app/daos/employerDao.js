'use strict';

var mongoose = require('mongoose');
var employer = mongoose.model('Employer');

// Create
exports.CreateEmployer = function createEmployer(data, next) {
    employer.create(data, next);
}

//Read
exports.ReadEmployer = function readEmployer(data, next) {
    employer.find(next);
}

exports.ReadEmployerByid = function readEmployerByid(data, next) {
    employer.findById(data, next);
}

// Update
exports.UpdateEmployer = function updateEmployer(id, data, next) {
    employer.update(id, data, next);
}

//Delete
exports.DeleteEmployer = function deleteEmployer(data, next) {
    employer.remove({
        "_id": data
    }, next);
}
