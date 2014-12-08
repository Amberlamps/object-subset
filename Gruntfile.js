module.exports = function(grunt) {

  var config = {

    uglify: {

      client: {
        files: {
          'dist/objectSubset.min.js': 'dist/objectSubset.js'
        }
      }

    }

  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('bower', [
    'uglify'
  ]);

};