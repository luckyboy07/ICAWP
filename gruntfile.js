'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			all: [	'gruntfile.js',
					'public/js/*.js',
					'app/**/*.js',
			],
			options: {
				jshintrc: '.jshintrc',
			}
		},
		watch: {
	      js: {
	        files: ['*.js', 'app/**/*.js', 'public/js/*.js', 'test/**/*.js'],
	        tasks: ['jshint'],
	        options: {
	          livereload: true,
	        },
	      }
	    },
		nodemon: {
			dev: {
				script: 'index.js',
				options: {
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js', 'html', 'css'],
					watchedFolders: [
						'app/routes',
						'app/view',
						'app/model',
						'public/css',
						'public/js',
						'public/template',
						'public/template/tpl',
					],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},
		mochaTest: {
			test: {
				options: {
		  			reporter: 'spec',
		  			colors: true,
		  			clearRequireCache: true
				},
			src: ['test/**/*.js']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('default', ['jshint', 'concurrent']);
};

