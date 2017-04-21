'use strict';

var mongoose = require('mongoose');
var JobsCategories = mongoose.model('JobsCategories');
var location = mongoose.model('location');
var location2 = mongoose.model('location2');
var skills = mongoose.model('Skills');


exports.getAllJobLocation = function getAllJobLocation(next) {
    location.find(next).sort("town_cities_name");
};

exports.getAllJobLocation2 = function getAllJobLocation2(next) {
    location2.find(next).sort("region");
};

exports.getAllJobCategories = function getAllJobCategories(next) {
    JobsCategories.find(next).sort("value");
};

exports.getAllSkills = function getAllSkills(next) {
    skills.find(next).sort("value");
};

/*exports.findSkills = function findSkills(value,next){
    skills.textSearch(value,next);
}*/

exports.findSkills = function findSkills(value,next){
    skills.find({$text:{$search:value}},next);
}
