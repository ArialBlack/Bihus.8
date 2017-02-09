module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        less: {
            development: {
                options: {
                    paths: ['less'],
                    compress: false,
                    cleancss: true,
                    dumpLineNumbers: 'comments'
                },
                files: {
                    '../themes/bihus/css/style.css': '../themes/bihus/less/style.less',
                    //'../themes/dostupno_uicontrast/css/style.css': '../themes/dostupno_uicontrast/less/style.less'
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },

            less: {
                files: [
                    '../themes/bihus/less/**/*.less',
                   // '../themes/dostupno_uicontrast/less/**/*.less'
                ],
                tasks: ['less', 'postcss']
            }
        },
        
        postcss: {
            options: {
              processors: [
                require('autoprefixer')({browsers: ['last 2 versions', 'ie 10']})
              ]
            },
            dist: {
              src: '../themes/bihus/css/style.css',
             // src: '../themes/dostupno_uicontrast/css/style.css'
            }
        }
    });

    // load npm modules
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    // register tasks
    grunt.registerTask('default', ['less', 'postcss', 'watch']);
    grunt.registerTask('jenkins', ['less', 'postcss']);
   
    //grunt.registerTask('default', ['less', 'postcss', 'copy:main', 'watch']);
   // grunt.registerTask('jenkins', ['less', 'postcss', 'copy:main']);
};
