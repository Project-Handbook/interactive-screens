module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dev: {
        files: [{
           expand: true,
           cwd: '',
           src: ['app/**/*.scss'],
           dest: '',
           ext: '.css'
         }]
			}
		},
    cssmin: {
      dev: {
        files: [{
           expand: true,
           cwd: '',
           src: ['app/**/*.css'],
           dest: '',
           ext: '.min.css'
         }]
      }
    },
		copy: {
			deploy: {
				files: [
					 // move html & js files into dist
					{src: ['*.html', '**/*.html', '*.js', '**/*.js', '*.min.css', '**/*.min.css', '!Gruntfile.js', '!publish.js'],
						dest: 'dist/', flatten: false},
					// move entire node_modules
					{src: ['node_modules/**'], dest: 'dist/', expand: true},
					// exclude files and folders
					{src: ['!dist/', '!bin/']}
				]
			}
		},
		clean: {
			deploy: ['dist']
		},
    shell: {
        startserver: {
            command: 'npm start'
        },
				compile: { // Compiles all typescript source into .js
					command: 'npm run tsc'
				},
				publish: { // Pushes the dist folder to gh-pages branch
					command: 'npm run publish'
				}
    }
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
	// Used for development - compiles all the .ts/.scss and starts the server
	grunt.registerTask('dev', ['sass', 'cssmin', 'shell:startserver']);
	// Used for deployment - removes dist, compiles everything, moves it all to dist and pushes the code to gh-pages
	grunt.registerTask('deploy', ['clean:deploy', 'sass:dev', 'cssmin:dev', 'shell:compile', 'copy:deploy', 'shell:publish']);
}
