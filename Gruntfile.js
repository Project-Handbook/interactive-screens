module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			prod: {
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
      prod: {
        files: [{
           expand: true,
           cwd: '',
           src: ['app/**/*.css'],
           dest: '',
           ext: '.min.css'
         }]
      }
    },
    shell: {
        startserver: {
            command: 'npm start'
        },
				dependencies: {
						command: 'npm install' 
				}
    }
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
	grunt.registerTask('prod',['shell:dependencies', 'sass', 'cssmin', 'shell:startserver']);
}
