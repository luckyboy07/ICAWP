module.exports = function(grunt) {
  grunt.registerTask("mongobackup", "Grunt task for binary export of mongodb database", function(task) {
	  
	if (arguments.length === 0) {
		grunt.log.writeln(this.name + ", no args");
		return;
	} else if(["dump","restore"].indexOf(task) === -1) {
		grunt.log.writeln("Invalid argument passed: available options are 'mongobackup:dump' and 'mongobackup:restore'");
		return;
	};

	var done = this.async();
	var options = this.options(), args = [];

    if (options.username) args.push('--username=' + options.username);
    if (options.password) args.push('--password=' + options.password);
    if (options.host) args.push('--host=' + options.host);
    if (options.port) args.push('--port=' + options.port);    
    if (options.db) args.push('--db=' + options.db);   
    if (options.collection) args.push('--collection=' + options.collection); 

    // Dump
    if (task=="dump" && options.dump && options.dump instanceof Object){
    	if (options.dump.out) args.push('--out=' + options.dump.out); 
	    if (options.dump.dbpath) args.push('--dbpath=' + options.dump.dbpath);  
	    if (options.dump.oplog) args.push('--oplog');
	    if (options.dump.repair) args.push('--repair');
	    if (options.dump.forceTableScan) args.push('--forceTableScan');
	    if (options.dump.repair) args.push('--dumpDbUsersAndRoles');	      	
    }
    // Restore
    if (task=="restore" && options.restore && options.restore instanceof Object){
	    if (options.restore.dbpath) args.push('--dbpath=' + options.restore.dbpath);
	    if (options.restore.drop) args.push('--drop'); 
	    if (options.restore.keepIndexVersion) args.push('--keepIndexVersion');
	    if (options.restore.noIndexRestore) args.push('--keepIndexVersion');
	    if (options.restore.oplogReplay) args.push('--oplogReplay');
	    if (options.restore.path) args.push(options.restore.path);
    }

    grunt.util.spawn({
      cmd: 'mongo'+task,
      args: args,
      opts:
      { stdio:
          [ process.stdin
          , process.stout
          , process.stderr
          ]
      }
    },
    function (error, result) {
      if (error) {
        grunt.log.error(result.stderr);
      }  
      grunt.log.writeln(result.stdout);
      done();
    });
  });
};