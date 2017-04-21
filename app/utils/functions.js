'use strict';

var env = process.env.NODE_ENV;
var config = require('../../config/environment/' + env);

var _ = require('lodash-node');
var fse = require('fs-extra');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var existsSync = function(filePath) {
    if (!filePath) return false
    try {
        return fs.statSync(filePath).isFile()
    } catch (e) {
        return false
    }
};

var IntToBoolean = function(intValue) {
    return intValue == 1 ? true : false;
};

var BooleanToInt = function(boolean) {
    return boolean === true ? 1 : 0;
};

// var generateString = function(length) {
//     var text = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return text;
// };

// var generateNumberString = function(length) {
//     var text = '';
//     var possible = '0123456789';

//     for (var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return text;
// };

// var generateDates = function(startDate, stopDate) {

//     Date.prototype.addDays = function(days) {
//         var dat = new Date(this.valueOf())
//         dat.setDate(dat.getDate() + days);
//         return dat;
//     }

//     var dateArray = [];
//     var currentDate = new Date(startDate);
//     var endDate = new Date(stopDate)
//     while (currentDate <= endDate) {
//         dateArray.push(new Date(currentDate));
//         currentDate = currentDate.addDays(1);
//     }
//     return dateArray;
// };

// var exportToCSV = function(titleBar, dateRange, fileName, columnData, rowData, next) {
//     var directory = './public/tmp/exports/csv';
//     var HEADERS = [];
//     var COLUMNS_HEADERS = [];
//     var COLUMNS;

//     if (!existsSync(directory)) { // execute if tmp folder does not exist.
//         // fs.mkdirSync(directory);
//         console.log('create directory');
//         mkdirp.sync(directory);
//     }

//     HEADERS = _.map(columnData, function(col) {
//         console.log('col: ', col);
//         return col.name;
//     });

//     console.log('HEADERS: ', HEADERS);
//     var filePath = path.join(directory, fileName + '.csv');
//     console.log('filePath: ', filePath);
//     var outerarray = [];
//     var writer = csvWriter({
//         headers: HEADERS
//     });
//     writer.pipe(fs.createWriteStream(filePath));
//     /*writer.write('# ----------------------------------------');
//     writer.write('# ' + titleBar);
//     writer.write('# ' + dateRange);
//     writer.write('# ----------------------------------------');*/
//     for (var i = 0; i < rowData.length; i++) {
//         var row = rowData[i];
//         outerarray = [];
//         console.log('row: ', row);

//         outerarray[0] = row.DayIndex;
//         outerarray[1] = row.TotalEvents;

//         writer.write(outerarray);
//     }
//     console.log('------------------------------------->');
//     writer.on('finish', function(count) {
//         var data = {
//             file_name: fileName + '.csv',
//             url: config.api_host_url + '/' + filePath,
//             success: true
//         };
//         next(null, data);
//     });
//     writer.end();
// };


// var readJsonFileSync = function (filepath, encoding){

//     if (typeof (encoding) == 'undefined'){
//         encoding = 'utf8';
//     }
//     var file = fs.readFileSync(filepath, encoding);
//     return JSON.parse(file);
// };


exports.IntToBoolean = IntToBoolean;
exports.BooleanToInt = BooleanToInt;
// exports.generateString = generateString;
// exports.generateNumberString = generateNumberString;
// exports.exportToCSV = exportToCSV;
exports.existsSync = existsSync;
// exports.generateDates = generateDates;
// exports.readJsonFileSync = readJsonFileSync;
