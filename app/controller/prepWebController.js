'use strict';

var prepService = require('../services/prepServices').Prep;
var Prep = new prepService();


// Get All User
exports.getAllJobLocation = function(req, res) {
    Prep.getAllJobLocation(setupResponseCallback(res));
};

exports.getAllJobLocation2 = function(req, res) {
    Prep.getAllJobLocation2(setupResponseCallback(res));
};

exports.getAllJobCategories = function(req, res) {
    Prep.getAllJobCategories(setupResponseCallback(res));
};

exports.getAllSkills = function getAllSkills(req, res) {
    Prep.getAllSkills(setupResponseCallback(res));
};

exports.findSkills = function(req, res) {
    var value = req.body.skills_name;
    Prep.findSkills(value, setupResponseCallback(res));
};

/*exports.findSkills = function(req, res) {
    var value = req.body.skills_name;
    Prep.findSkills(req.body, setupArrayResponseCallback(res));
};*/




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
