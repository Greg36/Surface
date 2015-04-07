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

        imagemin: {
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'images/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'images/'                  // Destination path prefix
                }]
            }
        },

        makepot: {
            theme: {
                options: {
                    domainPath: 'languages',
                    potFilename: '_s.pot',
                    type: 'wp-theme',
                    exclude: [
                        'node_modules',
                        '.sass-cache',
                        'js',
                        'css',
                        'fonts',
                        'images'
                    ]
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
                    src: ['*.pot'],
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
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-wp-i18n' );
    grunt.loadNpmTasks( 'grunt-potomo' );
    grunt.loadNpmTasks( 'grunt-newer' );

    // register tasks
    grunt.registerTask( 'default', ['watch']);
    grunt.registerTask( 'makethepot', ['makepot'] );

    grunt.registerTask('build', ['uglify', 'sass', 'concat', 'cssmin', 'newer:imagemin', 'makepot', 'potomo' ]);
};
