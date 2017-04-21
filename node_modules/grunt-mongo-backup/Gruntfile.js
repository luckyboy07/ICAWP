'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    mongobackup: {
      options: {
        host : 'localhost',
        port: '27017',
        db : 'database-dev', 
        dump:{
          out : './dump',
        },    
        restore:{
          path : './dump/database-dev',          
          drop : true
        }
      }  
    }
  });

  grunt.loadTasks('tasks');
};
