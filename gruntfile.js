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
				dest: 'js/dist/libraries.js'
			}, 
			angular:{
				src:[
					'js/app.js',
					'js/directives/truncate.js',
					'js/directives/angular-chart.js',
					],
				dest: 'js/build/main.js'
			}, 
		},
		uglify:{
			libraries:{
				src: 'js/dist/libraries.js',
				dest: 'js/build/libraries.min.js'
			}, 
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint','concat','uglify']);
};