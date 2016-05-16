'use strict';
module.exports = function(grunt) {

    grunt.initConfig({


        watch: {
            options: {
                spawn: false
            },
            js: {
                files: [
                    'js/vendor/**/*.js',
                    'js/source/**/*.js'
                ],
                tasks: ['uglify']
            },
            css: {
                files: [
                    'css/sass/**/*.scss',
                    'css/sass/*.scss'
                ],
                tasks: ['sass', 'autoprefixer', 'cssmin']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : 'css/style.css'
                },
                options: {
                    proxy: "localhost/_s",
                    watchTask: true
                }
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
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/style.css' : 'css/sass/style.scss'
                }
            }
        },

        autoprefixer: {
            single_file: {
                src: 'css/style.css',
                dest: 'css/style.css'
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
                    cwd: 'img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'img/'                  // Destination path prefix
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
                        '.idea',
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
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-sass' );
    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-wp-i18n' );
    grunt.loadNpmTasks( 'grunt-potomo' );
    grunt.loadNpmTasks( 'grunt-newer' );
    grunt.loadNpmTasks( 'grunt-browser-sync' );

    // register tasks
    grunt.registerTask( 'default', ['browserSync', 'watch']);

    grunt.registerTask('build', ['uglify', 'sass', 'autoprefixer', 'cssmin', 'newer:imagemin', 'makepot', 'potomo' ]);
};
