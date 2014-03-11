module.exports = function( grunt ){
  'use strict';
  
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.initConfig({
    nodeunit: {
      all: ['test/*_test.js']
    }
  });

  grunt.registerTask( 'default', [ 'nodeunit' ] );

};
