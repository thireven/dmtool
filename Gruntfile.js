module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			options: {
				sourceMap: true,
				sourceMapContents: true,
				// outputStyle: 'compressed',
				// outFile: './public/stylesheets/main.css'
			},
			dist: {
				files: [{
					expand: true,
					cwd: './scss',
					src: ['*.scss'],
					dest: './public/stylesheets',
					ext: '.css'
				}]
			}
		},
		watch: {
			scripts: {
				files: ['./scss/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: true
				}
			}
		}
	});

	// grunt.registerTask('sass', ['sass']);
	grunt.registerTask('default', ['sass', 'watch']);
};