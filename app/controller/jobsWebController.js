'use strict';

var jobService = require('../services/jobServices').Jobs;
var Job = new jobService();

exports.getAllJob = function(req, res) {
    Job.getAllJob(setupResponseCallback(res));
};

exports.getjobEmpBase = function (req,res) {
    Job.getjobEmpBase(req.params._id, setupResponseCallback(res));
}

exports.getCompanyProfWithJob = function(req, res){
    Job.getCompanyProfWithJob(req.params._id, setupResponseCallback(res));
}

exports.showJobDetails = function(req, res){
    Job.showJobDetails(req.params._jobid, setupResponseCallback(res));
}

exports.saveJobs = function(req, res) {
    Job.saveJobs(req.body, setupResponseCallback(res));
};

exports.updateJob = function(req, res) {
    Job.updateJob(req.params._id, req.body, setupResponseCallback(res));
};

exports.findJobById = function(req, res) {
    Job.findJobById(req.params.id, setupResponseCallback(res));
};

exports.findOneJob = function(req, res) {
    Job.findOneJob(req.body, setupResponseCallback(res));
}

exports.deleteJob = function(req, res) {
    Job.deleteJob(req.params.id, setupResponseCallback(res));
}


function setupResponseCallback(res) {
    return function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            res.status(200).send(returnValue);
        }
    }
}

function setupArrayResponseCallback(res) {
    return function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            res.status(200).send([returnValue]);
        }
    }
}

function setupCountResponseCallback(res) {
    return function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            res.status(200).send({
                length: returnValue
            });
        }
    }
}
