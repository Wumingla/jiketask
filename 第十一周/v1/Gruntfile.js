module.exports = function(grunt) {
    grunt.initConfig({

        //清除目录
        clean: {
            all: ['dist/html/**'],
            image: 'dist/html/img',
            css: 'dist/html/css',
            html: 'dist/html/**/*'
        },

        // 文件拷贝
        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.html'],
                    dest: 'dist/html'
                }]
            },
            image: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['img/*/*.{png,jpg,jpeg,gif}'],
                    dest: 'dist/html'
                }]
            }
        },

        // 文件合并
        concat: {
            options: {
                separator: '\n',
                stripBanners: true
            },
            js: {
                src: [
                    "src/js/jquery-1.11.3.min.js",
                    "src/js/swiper.min.js",
                    "src/js/script.js",
                ],
                dest: "dist/html/js/app.js"
            },
            css: {
                src: [
                    "src/css/neat.css",
                    "src/css/swiper.min.css",
                    "src/css/main.css"
                ],
                dest: "dist/html/css/main.css"
            }
        },

        //压缩JS
        uglify: {
            prod: {
                options: {
                    mangle: {
                        except: ['require', 'exports', 'module', 'window']
                    },
                    compress: {
                        global_defs: {
                            PROD: true
                        },
                        dead_code: true,
                        pure_funcs: [
                            "console.log",
                            "console.info"
                        ]
                    }
                },

                files: [{
                    expand: true,
                    cwd: 'dist/html',
                    src: ['js/*.js', '!js/*.min.js'],
                    dest: 'dist/html'
                }]
            }
        },

        //压缩CSS
        cssmin: {
            prod: {
                options: {
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/html',
                    src: ['css/*.css'],
                    dest: 'dist/html'
                }]
            }
        },

        //压缩图片
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    pngquant: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/html',
                    src: ['img/*/*.{png,jpg,jpeg,gif,webp,svg}'],
                    dest: 'dist/html'
                }]
            }
        },

        // 处理html中css、js 引入合并问题
        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'dist/html'
            }
        },
        usemin: {
            html: 'dist/html/index.html',
        },

        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'dist/html',
                    src: ['*.html'],
                    dest: 'dist/html'
                }]
            }
        },

        //编译sass
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/css/main.css': 'src/css/scss/main.scss'
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('publish', ['clean', 'prod']);
    grunt.registerTask('default', [
        'copy', //复制文件
        'useminPrepare',
        'sass', //处理sass
        'concat', //合并文件
        'imagemin',//图片压缩
        'cssmin', //CSS压缩
        'uglify', //JS压缩
        'usemin', //HTML处理
        'htmlmin'//HTML压缩
    ]);
}
