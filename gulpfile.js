var gulp        = require('gulp');
var pug         = require('gulp-pug');
var sass        = require('gulp-sass');
var babel       = require('gulp-babel');
var browserSync = require('browser-sync').create();

//watch all files for changes
gulp.task('watch', ['sass'], ['babel'], ['pug'], function(){

  //reload the browser after file changes
  gulp.task('browserSync', function(){
    browserSync.init({
      server: {
        baseDir: './'
      },
    })
  })


  gulp.watch('./app/scss/*.scss', gulp.series('sass'));
  gulp.watch('./app/es6/*.js', gulp.series('babel'));
  gulp.watch('./app/pug/*.pug', gulp.series('pug'));
  gulp.watch("./app/*.html").on('change', browserSync.reload);
  // gulp.watch('./index.html', browserSync.reload);
});

//compile pug into HTML
gulp.task('pug', function(cb){
  return gulp.src('./app/pug/*.pug')
  .pipe(pug({
   doctype: 'html',
   pretty: true
 }))
  .pipe(gulp.dest('./app'))
  .pipe(browserSync.reload({
  stream: true
 }))
 cb();
});

//compile SCSS into CSS
gulp.task('sass', function(cb){
  return gulp.src('./app/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./app/css'))
  .pipe(browserSync.reload({
  stream: true
 }))
 cb();
});

//compile ES6 into ES5
gulp.task('babel', function(cb){
  return gulp.src('./app/es6/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest('./app/js'))
  cb();
});
