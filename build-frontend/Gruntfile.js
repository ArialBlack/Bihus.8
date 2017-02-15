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
                    '../themes/bihus8/css/style.css': '../themes/bihus8/less/style.less',
                    '../themes/thunder_admin/css/backend.css': '../themes/thunder_admin/less/backend.less'
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },

            less: {
                files: [
                    '../themes/bihus8/less/**/*.less',
                    '../themes/thunder_admin/less/**/*.less'
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
              src: '../themes/bihus8/css/style.css',
              src: '../themes/thunder_admin/css/style.css'
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
