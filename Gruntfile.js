module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jade: {
            compile: {
                files: [ {
                    cwd: "src/html",
                    src: "**/*.jade",
                    dest: "dist",
                    expand: true,
                    ext: ".html"
                } ]
            }
        },
        stylus: {
            compile: {
                options: {
                    paths: [ 'src/css' ],
                    use: [ require('nib') ],
                    import: [ 'nib' ]
                },
                files: {
                    'dist/facelift.css': [ 'src/css/*.styl' ]
                }
            }
        },
        coffee: {
            compile: {
                options: {
                    join: true,
                    bare: true
                },
                files: {
                    'src/facelift-src.js': [ 'src/js/*.coffee' ]
                }
            }
        },
        concat: {
            vendor: {
                src: [
                    'lib/jquery/dist/jquery.min.js',
                    'lib/*.js'
                ],
                dest: 'src/facelift-vendor.js'
            },
            dist: {
                src: [ 'src/facelift-vendor.js', 'src/facelift-src.js' ],
                dest: 'dist/facelift.js'
            }
        },
        watch: {
            coffee: {
                files: 'src/js/*.coffee',
                tasks: [ 'coffee' ],
                options: {
                    interrupt: true,
                    interval: 100
                }
            },
            stylus: {
                files: 'src/css/*.styl',
                tasks: [ 'stylus' ],
                options: {
                    interrupt: true,
                    interval: 100
                }
            },
            jade: {
                files: 'src/html/*.jade',
                tasks: [ 'jade' ],
                options: {
                    interrupt: true,
                    interval: 100
                }
            },
            concatVendor: {
                files: 'lib/**/*.js',
                tasks: [ 'concat:vendor' ],
                options: {
                    interval: 100
                }
            },
            concatDist: {
                files: 'src/*.js',
                tasks: [ 'concat:dist' ],
                options: {
                    interval: 100
                }
            }
        }
    });

    // Log when files are changed
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    // Load the plugins that provide the tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', [ 'jade', 'stylus', 'coffee', 'concat:vendor', 'concat:dist' ]);
    grunt.registerTask('w', [ 'default', 'watch' ]);

};