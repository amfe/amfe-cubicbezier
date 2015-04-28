'use strict';

module.exports = function (grunt) {
    // Project configuration.
    var path = require('path');

    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        assetsPath: 'assets',
        srcPath: 'src',
        libPath: 'lib',
        distPath: 'build',
        apidocPath: 'api',

        clean: ['<%= distPath%>/*', '<%= apidocPath%>/*'],
        
        copy : {
            package: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['package.json'],
                    dest: '<%= distPath %>'
                }]
            }
        },

        depconcat: {
            main: {
                src: ['<%= srcPath%>/cubicbezier.js'],
                dest: '<%= distPath%>/cubicbezier.debug.js'
            }
        },

        uglify: {
            main:{
                files: [{
                    expand: true,
                    cwd: '<%= distPath%>',
                    src: ['**/*.debug.js'],
                    dest: '<%= distPath %>',
                    ext: '.js'
                }]
            }
        },
        
        depcombo: {
            debug: {
                options: {
                    useDebug: true,
                    useDaily: true,
                    output: 'url'
                },
                dest: '<%= distPath%>/combo.debug.js'
            },
            main: {
                options: {
                  output: 'file'
                },
                dest: '<%= distPath%>/combo.js'
            }
        },

        watch: {
            combo: {
                files: ['package.json'],
                tasks: ['depcombo']
            },

            js: {
                files: ['<%= srcPath %>/*.js'],
                tasks: ['depconcat', 'uglify', 'depcombo']
            },

            jsdoc: {
                files: ['<%= srcPath %>/*.js'],
                tasks: ['jsdoc']
            }
        },

        cmdwrap: {
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: ['cubicbezier.js'],
                    dest: '<%= distPath %>',
                    ext: '.cmd.js'
                }]
            }
        },

        jsdoc: {
            main : {
                src: ['<%= srcPath %>/*.js', 'README.md'],
                options: {
                    destination: '<%= apidocPath %>',
                    template: 'bower_components/docs-template'
                }
            }
        }
    });

    // grunt plugins
    grunt.loadNpmTasks('grunt-depconcat');
    grunt.loadNpmTasks('grunt-depcombo');
    grunt.loadNpmTasks('grunt-cmdwrap');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default grunt
    grunt.registerTask('default', ['clean', 'copy','depconcat','uglify', 'depcombo', 'cmdwrap', 'jsdoc']);
    grunt.registerTask('dev', ['clean', 'depconcat', 'uglify', 'depcombo', 'watch']);
};