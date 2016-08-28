/**
 * Slot Game Demo in HTML5 and JavaScript using PureMVC and Pixi.js
 * by Murali Saripalli.
 * File: gulpfile.js
 */

var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint');
    sourcemaps = require('gulp-sourcemaps');
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');
    order = require('gulp-order');
    streamqueue = require('streamqueue');
    header = require('gulp-header');

var packageJSON  = require('./package');
var jshintConfig = packageJSON.jshintConfig;
jshintConfig.lookup = false;

var d = new Date();
headerComment = '/*Generated on:' + d + '*/';

// jshint task
gulp.task('jshint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter('jshint-stylish'));
});

// build task
gulp.task('build', function() {
    return streamqueue({ objectMode: true },
            gulp.src('src/AppConstants.js'),
            gulp.src('src/view/component/abstract/EventListener.js'),
            gulp.src('src/model/**/*.js'),
            gulp.src('src/controller/**/*.js'),
            gulp.src('src/view/**/*.js'),
            gulp.src('src/App.js')
        )
        .pipe(sourcemaps.init())
        .pipe(concat('slotgame.js'))
        .pipe(header(headerComment))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js/'));
});

// watch for changes and run jshint
gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['jshint','build']);
    //gulp.watch('src/**/*.js', ['jshint']);
});

// assign watch by default
gulp.task('default', ['watch']);