module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			js: {
				files: ['fingaFingaz.js'],
				tasks: ['uglify:js', 'jshint']
			}
		},
		jshint: {
			options: {
				curly: false,
				eqeqeq: false,
				eqnull: false,
				browser: true,
				force: true,
				globals: {
				},
			},
			beforeconcat: ['fingaFingaz.js']
		},
		uglify: {
			options: {
				mangle: false
			},
			js: {
				files: {
					'fingaFingaz.min.js': ['fingaFingaz.js']
				}
			}
		}
	});


	grunt.registerTask('default', ['uglify', 'jshint']);
	grunt.registerTask('watch', ['watch']);


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');


};
