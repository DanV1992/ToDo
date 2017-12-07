module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        esversion: 6
      },
      all: ['Grunfile.js', 'config/*.js']
    },



    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: { script: 'index.js' }
    },

    env: {
      dev: {
        NODE_ENV: 'development'
      },
      production: {
        NODE_ENV: 'production'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-nodemon');
  grunt.loadNpmTasks('grunt-env');



  grunt.registerTask('default', [
    'env:dev',
    'nodemon'

  ]);
  grunt.registerTask('production', [
    'env:production',
    'nodemon'

  ]);


};
