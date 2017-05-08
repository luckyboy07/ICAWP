Thanks to Shimon Doodkin for writing the original version of this module

Original repo can be found at: https://github.com/shimondoodkin/node_spreadsheet

#What Is This?
Node spreadsheet is a module to read and write Excel and CSV files using PHPExcel from phpexcel.codeplex.com.

#Installation
npm install node_spreadsheet

#Requirements
As this runs PHPExcel, you will need php5-cli installed. You'll also need Node.js

#Usage
To read in an excel file:

	var spreadsheet=require('node_spreadsheet');
    var basePath = __dirname;
	var inputFile = basePath + "YourFile.xls";
	
	spreadsheet.read(inputFile, function(err, data) {
		if(!err) console.log(data);
	});

To read in an excel file and convert it to an object:

	var spreadsheet=require('node_spreadsheet');
    var basePath = __dirname;
	var inputFile = basePath + "YourFile.xls";
	
	spreadsheet.readAndConvertToObject(inputFile, function(err, data) {
		/*
		  A CSV containing the following data:
			'Address', 'City', 'State', 'Zip'
			'1515 S Main St', 'Los Angeles', 'CA', '90021'
			'124 N Penrose Ave', 'Someplace', 'CA', '92022'
			
		  Will become:
		  
		  [
			{
				address: '1515 S Main St',
				city: 'Los Angeles',
				state: 'CA',
				zip: '90021'
			},
			{
				address: '124 N Penrose Ave',
				city: 'Someplace',
				state: 'CA',
				zip: '92022'
			}
		  ]
		*/
		 
		if(!err) console.log(data);
	});

To write an excel file:

	var spreadsheet=require('node_spreadsheet');
	var basePath = __dirname;
	var outFile = basePath + "YourFile.xls";
	
	var data = [
		['Address', 'City', 'State', 'Zip'],
		['1515 S Main St', 'Los Angeles', 'CA', '90021'],
		['124 N Penrose Ave', 'Someplace', 'CA', '92022']
	];
	
	spreadsheet.write(data, outFile,function(err, fileName) {
		if(!err) console.log(fileName);
	});

To convert an excel file:

	var spreadsheet=require('node_spreadsheet');
	var basePath = __dirname;

	var inFile = basePath + "YourFile.csv";
	var outFile = basePath + "YourFile.xlsx";

	spreadsheet.convert(inFile, outFile,function(err, fileName) {
		if(!err) console.log(fileName);
	});
