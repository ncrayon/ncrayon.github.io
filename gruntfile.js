module.exports = function(grunt){
	grunt.initConfig({
		jshint:{
			all:['js/app.js','js/config.js']
		},
		concat:{
			libraries:{
				src:[
					'js/vendor/fullPage.min.js',
					'js/vendor/slimscroll.min.js',
					'js/vendor/blur.js',
					'js/vendor/Chart.min.js',
					'js/vendor/retina.min.js',
					'js/config.js',
					],
				dest: 'js/dist/vendor.js'
			}, 
			angular:{
				src:[
					'js/app.js',
					'js/directives/truncate.js',
					'js/directives/angular-chart.js',
					],
				dest: 'js/dist/main.js'
			}, 				 
			angularBlogAndProject:{
				src:[
					'js/vendor/angular-locale_es-es.js',
					'apps/scripts/app.js',
					'apps/scripts/controllers/blog.js',
					'apps/scripts/controllers/details.blog.js',
					'apps/scripts/controllers/projects.js',
					'apps/scripts/controllers/details.projects.js',
					'js/directives/truncate.js',
					'js/directives/infinite-scroll.min.js',
					'js/directives/viewhead.js',
					],
				dest: 'js/build/apps.js'
			},
			librariesBlogAndProject:{
				src:[
					'js/vendor/retina.min.js',
					'apps/scripts/config.js',
					],
				dest: 'js/dist/lib.app.js'
			},
		},
		uglify:{
			libraries:{
				src: 'js/dist/vendor.js',
				dest: 'js/build/vendor.min.js'
			}, 
			angularMain:{
				src: 'js/dist/main.js',
				dest: 'js/build/main.min.js'
			}, 
			librariesBlogAndProject:{
				src:[
					'js/vendor/retina.min.js',
					'apps/scripts/config.js',
					],
				dest: 'js/build/lib.app.min.js'
			},
		},
	    watch: {
		   files: ['js/*','apps/scripts/*','apps/scripts/controllers/*'],
		   tasks: ['jshint','concat','uglify'],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint','concat','uglify','watch']);
};