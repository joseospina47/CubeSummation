var gulp          = require('gulp'),
    gulpUtil      = require('gulp-util'),
    jshint        = require('gulp-jshint'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    jade          = require('gulp-jade'),
    uglify        = require('gulp-uglify'),
    connect       = require('gulp-connect'),
    rename        = require('gulp-rename'),
    minifyCss     = require('gulp-minify-css');

//Server task
gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: 8000,
    base: 'http://localhost',
    livereload: true
  });
});

//Bower Components - JS Files
gulp.task('vendorJS', function(){
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/requirejs/require.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('dist/vendor/js'));
});

//Bower Components - JS Files
gulp.task('vendorCSS', function(){
  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
  ])
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('dist/vendor/css'));
});

//Images
gulp.task('images', function(){
  gulp.src([
    'app/images/*.*'
  ])
  .pipe(gulp.dest('dist/images/'));
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(connect.reload());
});

// Styles task
gulp.task('styles', function() {
  return gulp.src('app/styles/*.scss')
  .pipe(sass({onError: function(e) { console.log(e); } }))
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  .pipe(rename('bundle.css'))
  .pipe(gulp.dest('dist/css/'))
  .pipe(rename('bundle.min.css'))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('dist/css/'))
  .pipe(connect.reload());
});

//Jade task
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
  gulp.src('app/index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('*.min.js'))
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

// Dev task
gulp.task('dev', ['connect', 'vendorJS', 'vendorCSS', 'images',
  'lint', 'styles', 'templates', 'scripts'], function() { });


gulp.task('watch', ['lint'], function() {
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint'
  ]);

  gulp.watch(['app/styles/**/*.scss'], [
    'styles'
  ]);

  gulp.watch(['app/index.jade'], [
    'templates'
  ]);

  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], [
    'scripts'
  ]);
});

gulp.task('default', ['dev', 'watch']);
