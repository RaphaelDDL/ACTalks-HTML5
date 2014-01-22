//* ========================
//File: Gruntfile.js
//======================== */
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//* =============================================
		//Section: CUSTOM VARS
		//================================================ */
		jsBanner:'//*! ========================\n' +
					'//App: <%= pkg.name %>\n' +
					'//Version: <%= pkg.version %>\n' +
					'//Author: <%= pkg.author %>\n' +
					'//Generated at: <%= grunt.template.today("yyyy-mm-dd") %> @ <%= grunt.template.today("hh:MM:ss") %>\n'+
					'//======================== */\n',

		jsFolder: '<%= pkg.folderConfig.user_assets_folder %>/<%= pkg.folderConfig.user_javascript_folder %>',
		cssFolder: '<%= pkg.folderConfig.user_assets_folder %>/<%= pkg.folderConfig.user_css_folder %>',

		//* =============================================
		//Section: JS UGLIFY
		//================================================ */
		uglify: {
			prod: {
				options: {
					banner: '<%= jsBanner %>'
				},
				files: {
					//jQuery Main
					'<%= jsFolder %>/jquery.min.js': [
						'<%= jsFolder %>/libs/jquery-*.js',
						'!<%= jsFolder %>/**/*.min.js'
					],
					//Modernizr + Tests
					'<%= jsFolder %>/modernizr.min.js': [
						'<%= jsFolder %>/libs/modernizr-*.js',
						'!<%= jsFolder %>/**/*.min.js'
					],
					//Other libs
					'<%= jsFolder %>/reveal.min.js': [
						'<%= jsFolder %>/libs/reveal*.js',
						'!<%= jsFolder %>/**/*.min.js'
					],
					'<%= jsFolder %>/app.min.js': [
						'<%= jsFolder %>/plugins/helpers-*.js',
						'<%= jsFolder %>/plugins/app.js',
						'!<%= jsFolder %>/**/*.min.js'
					]
				}
			}
		},

		//* =============================================
		//Section: SASS/COMPASS
		//================================================ */
		compass: {
			options: {
				config: './config.rb'
			},
			dev: {
				options: {
					environment: 'development'
				}
			},
			prod: {
				options: {
					environment: 'production'
				}
			}
		},

		//* =============================================
		//Section: SERVER
		//================================================ */
		connect: {
			server: {
				options: {
					port: 9090,
					protocol: 'http',
					hostname: 'localhost',
					keepalive: true
				}
			}
		},

		//* =============================================
		//Section: IMAGE OPTIMIZER
		//================================================ */
		imagemin: {
			all: {
				options: {
					optimizationLevel: 3,
					progressive: true,
					interlaced: true
				},
				files: [{
					expand: true, // Enable dynamic expansion
					cwd: '<%= pkg.folderConfig.user_assets_folder %>/<%= pkg.folderConfig.user_image_folder %>/', // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'] // Actual patterns to match
					,dest: '<%= pkg.folderConfig.user_assets_folder %>/<%= pkg.folderConfig.user_image_folder %>/' // Destination path prefix
				}]
			}
		},

		//* =============================================
		//Section: WATCH
		//================================================ */
		watch: {
			imagemin: {
				files: [
					'<%= pkg.folderConfig.user_assets_folder %>/<%= pkg.folderConfig.user_image_folder %>/**/*.{png,jpg,gif}'
				],
				tasks: ['newer:imagemin:all']
			},
			uglify: {
				files: [
					'<%= jsFolder %>/**/*.js', '!<%= jsFolder %>/**/*.min.js'
				],
				tasks: ['any-newer:uglify:prod']
			},
			compassdev: {
					files: [
						'<%= cssFolder %>/<%= pkg.folderConfig.user_sass_folder %>/**/*.scss'
					],
					tasks: ['compass:dev']
			},
			compassprod: {
				files: [
					'<%= cssFolder %>/<%= pkg.folderConfig.user_sass_folder %>/**/*.scss'
				],
				tasks: ['compass:prod']
			}
		},

		//* =============================================
		//Section: CONCURRENT WATCHES
		//================================================ */
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			prod: {
				tasks: ['imagemin:all',"watch:imagemin","watch:uglify", "watch:compassprod", "connect:server"]
			},
			dev: {
				tasks: ['imagemin:all',"watch:imagemin","watch:uglify", "watch:compassdev", "connect:server"]
			}
		}

	}); //grunt.initConfig

	//* =============================================
	//Section: TASK LOADER
	//================================================ */
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	// grunt.loadNpmTasks('grunt-uncss');


	//* =============================================
	//Section: REGISTER TASKS
	//================================================ */
	grunt.registerTask("prod", ["concurrent:prod"]);
	grunt.registerTask("dev", ["concurrent:dev"]);

	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', ['uglify:prod','compass:prod','imagemin:all']);
}//module.exports