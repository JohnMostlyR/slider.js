module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {  // Compile ES6 to ES5
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      }
    },
    sass: { // Compile SASS files
      dev: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: '*.scss',
          dest: 'dist',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: '*.scss',
          dest: 'dist',
          ext: '.css'
        }]
      }
    },
    postcss: {  // Postprocessing of CSS files
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/' // ...to the specified directory
        },
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')(
            {
              browsers: ['last 2 versions']
            }
          ), // add vendor prefixes
        ]
      },
      dist: {
        src: 'dist/*.css'
      }
    }
  });

  // Load plugins
  [
    'grunt-babel',
    'grunt-sass',
    'grunt-postcss'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });

  // Register tasks

  // this would be run by typing "grunt dev" on the command line
  grunt.registerTask(
    'dev',
    [
      'babel:dist',                 // Compile ES6 to ES5 in the js folder and copy to public/assets/js
      'sass:dev',                   // Compile SASS to CSS in the sass folder and copy to public/assets/css
      'postcss',                    // Perform postcss tasks on css files in public/assets/css
    ]
  );

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask(
    'default',
    [
      'babel:dist',                 // Compile ES6 to ES5 in the js folder and copy to public/assets/js
      'sass:dist',                  // Compile SASS to CSS in the sass folder and copy to public/assets/css
      'postcss',                    // Perform postcss tasks on css files in public/assets/css
    ]
  );
};
