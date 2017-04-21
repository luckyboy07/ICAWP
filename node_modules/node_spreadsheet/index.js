var fs = require('fs');
var exec = require('child_process').exec;

var isoDateReviver_re = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(?:([\+-])(\d{2})\:(\d{2}))?Z?$/;

function isoDateReviver(key, value) {
	if (typeof value === 'string') {
		var a = isoDateReviver_re.exec(value);
		if (a) {
			var utcMilliseconds = Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]);
			return new Date(utcMilliseconds);
		}
	}
	return value;
}

function show_error(error, stdout, stderr) {
	if (stdout) console.log('node_spreadsheet_stdout: ' + stdout);
	if (stderr) console.log('node_spreadsheet_stderr: ' + stderr);
	if (error !== null) {
		console.log('node-spreadsheet last command: ' + lastcommand);
		console.log('node-spreadsheet error: ' + error);
	}
}

var exec_option = {
	timeout: 1500
};

exports.read = function read(inputfile, callback) {
	var tempdir = process.platform === 'win32' ? process.env.TEMP + '\\' : '/tmp/';
	var file = tempdir + Date.now() + '.json';

	var args_str = '';
	var args = [];

	args.push('-f');
	args.push(__dirname + '/convert.php');
	args.push(inputfile);
	args.push(file);

	for (var i = 0; i < args.length; i++) {
		args_str += " " + args[i].replace(/[^\\]'/g, function(m) {
			return m.slice(0, 1) + '\\\'';
		}) + "";
	}

	var cmd = process.platform === 'win32' ? 'SET ' : 'export ';

	cmd += 'LANG=en_US.UTF-8 && php ' + args_str, exec_option;

	lastcommand = cmd;
	var child = exec(cmd, show_error);

	//var child = exec('export LANG=en_US.UTF-8;env ',  show_error );
	child.on('exit', function(code, signal) {
		if (code == 0) {
			fs.readFile(file, 'utf-8', function(err, data) {
				if (err) {
					callback(err);
				}
				else {
					fs.unlink(file, function(err2) {
						if (err2) {
							callback(err2);
						}
						else {
							callback(null, JSON.parse(data, isoDateReviver));
						}
					});
				}
			});
		} 
		else {
			callback(new Error("inputfile not found"));
		}
	});
};

exports.readAndConvertToObject = function readAndConvertToObject(inputfile, callback) {
	var processData = function(data) {
		var headerRow = data.shift();
		var formattedData = [];
		
		// replace blank header fields with actual column names to create valid objects later.
		headerRow.forEach(function(val, index) {
			if (!val && val !== 0) {
				headerRow[index] = 'untitled_' + index;
			};
			headerRow[index] = APP.formatters.trim(headerRow[index]).replace(/ /g, '_').toLowerCase();
		});
		
		data.forEach(function(row) {
			var blankRow = true;
			var formattedRow = {};
			row.forEach(function(cellValue, index) {
				if (cellValue) {
					blankRow = false;
				};
				formattedRow[headerRow[index]] = (cellValue && typeof cellValue == 'string') ? APP.formatters.trim(cellValue) : cellValue;
			});
			
			var pushVal = blankRow ? '' : formattedRow;
			formattedData.push(pushVal);
		});
		
		callback(data);
	};

	exports.read(inputfile, processData);
};

exports.write = function write(inputData, outputfile, callback) {
	var str = '';
	var tempdir = process.platform === 'win32' ? process.env.TEMP + '\\' : '/tmp/';
	var file = tempdir + Date.now() + '.csv';
	
	if(inputData instanceof Array) {
		if(inputData[0] instanceof Array) {
			inputData.forEach(function(val) {
				str += val.join(',') + '\r\n';
			});
			
			inputData = str;
		}
		else {
			inputData.join('\r\n');
		}
	
		fs.writeFile(file, str, function(err) {
			if(err) {
				callback(err);
			}
			else {
				exports.convert(file, outputfile, function(err, fn) {
					fs.unlink(file);
					callback(err, fn);
				});
			}
		});
	}
	else {
		callback(new Error('Invalid inputData'));
	}
};

exports.convert = function convert(inputfile, outputfile, callback) {
	var args_str = '';
	var args = [];

	args.push('-f'); // add text
	args.push(__dirname + '/convert.php'); // add text  
	args.push(inputfile); // add text
	args.push(outputfile); // add text

	for (var i = 0; i < args.length; i++) {
		args_str += " " + args[i].replace(/[^\\]'/g, function(m) {
			return m.slice(0, 1) + '\\\'';
		}) + "";
	}

	var cmd = process.platform === 'win32' ? 'SET ' : 'export ';

	cmd += 'LANG=en_US.UTF-8 && php ' + args_str, exec_option;

	//var cmd='export 
	lastcommand = cmd;
	var child = exec(cmd, show_error);
	
	//var child = exec('export LANG=en_US.UTF-8;env ',  show_error );
	child.on('exit', function(code, signal) {
		if (callback) {
			if (code == 0) {
				callback(null, outputfile);
			} 
			else {
				callback(code, undefined);
			}
		}
	});
};