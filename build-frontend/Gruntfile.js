module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        svgstore: {
            logos: {
                files: {
                    '../themes/bihus8/images/svg-images-sprite.svg': 'images-svg/*.svg'
                    //use like <span class="svg-image logo"><svg preserveAspectRatio="xMidYMid" focusable="false"><use xlink:href="{{ static("images/svg-images-sprite.svg#bihus-logo") }}"></use></svg></span>
                }
            }
        },
    
        less: {
            development: {
                options: {
                    paths: ['less'],
                    compress: false,
                    cleancss: true,
                   // dumpLineNumbers: 'comments'
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

            svgstore: {
                files: [
                    'images-svg/*.svg'
                ],
                tasks: [ 'svgstore']
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
              //src: '../themes/thunder_admin/css/style.css'
            }
        }
    });

    // load npm modules
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-svgstore');

    // register tasks
    grunt.registerTask('default', ['svgstore', 'less', 'postcss', 'watch']);
    grunt.registerTask('jenkins', ['svgstore', 'less', 'postcss']);
   
    //grunt.registerTask('default', ['less', 'postcss', 'copy:main', 'watch']);
   // grunt.registerTask('jenkins', ['less', 'postcss', 'copy:main']);
};
