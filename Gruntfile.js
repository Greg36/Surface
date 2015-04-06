'use strict';
module.exports = function(grunt) {

    grunt.initConfig({


        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [
                    'Gruntfile.js',
                    'js/source/**/*.js'
                ],
                tasks: ['uglify']
            },
            css: {
                files: [
                    'css/sass/**/*.scss',
                    'css/sass/*.scss'
                ],
                tasks: ['sass', 'concat', 'cssmin']
            }
        },

        uglify: {
            my_target: {
                options: {
                    sourceMap: true
                },
                files: {
                    'js/app.min.js': [
                        'js/source/**/*.js',
                        'js/vendor/**/*.js'
                    ]
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'css/style.css' : 'css/sass/style.scss'
                }
            }
        },

        concat: {
            dist: {
                files: {
                    'css/style.css': ['css/vendor/*.css', 'css/style.css']
                }
            }
        },

        cssmin: {
            dist: {
                files: {
                    'css/style.min.css': [ 'css/style.css' ]
                }
            }
        },

        makepot: {
            theme: {
                options: {
                    type: 'wp-theme'
                }
            }
        },

        potomo: {
            dist: {
                options: {
                    poDel: false
                },
                files: [{
                    expand: true,
                    cwd: 'languages',
                    src: ['*.po'],
                    dest: 'languages',
                    ext: '.mo',
                    nonull: true
                }]
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-wp-i18n' );
    grunt.loadNpmTasks( 'grunt-potomo' );

    // register tasks
    grunt.registerTask( 'default', ['watch']);
    grunt.registerTask( 'makethepot', ['makepot'] );

    grunt.registerTask('build', ['uglify', 'sass', 'concat', 'cssmin', 'makepot', 'potomo' ]);
};
