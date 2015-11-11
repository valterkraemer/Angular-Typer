var gulp = require('gulp');
var stylus = require('gulp-stylus');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var bowerFiles = require('main-bower-files');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

var files = {
  js: ['./src/**/*.js', '!./src/bower_components/**'],
  styl: ['./src/**/*.styl', '!./src/bower_components/**'],
  index: './src/index.html',
  css: ['./src/**/*.css', './src/.build/**/*.css', '!./src/bower_components/**'],
  root: './src/'
};

// Lint Task
gulp.task('lint', function() {
  return gulp.src(files.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Stylus
gulp.task('stylus', function() {
  return gulp.src(files.styl)
    .pipe(stylus())
    .pipe(gulp.dest('./src/.build/css'))
    .pipe(browserSync.stream());
});

// Inject files into index.html
gulp.task('inject', function() {
  return gulp.src(files.index)
    .pipe(inject(gulp.src(bowerFiles()), {
      read: false,
      relative: true,
      name: 'bower'
    }))
    .pipe(inject(gulp.src(files.js).pipe(angularFilesort()), {
      read: false,
      relative: true
    }))
    .pipe(inject(gulp.src(files.css), {
      read: false,
      relative: true
    }))
    .pipe(gulp.dest(files.root));
});

// Static Server + watching scss/html files
gulp.task('serve', ['stylus', 'inject'], function() {

  browserSync.init({
    server: "./src"
  });

  gulp.watch("src/**/*.html").on('change', browserSync.reload);
  gulp.watch(files.js, ['inject']);
  gulp.watch(files.styl, ['stylus']);

});

gulp.task('default', [
  'serve'
]);
