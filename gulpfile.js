var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();


//compile scss into css
function sassCompile() {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream())
}

//compile pug into HTML
function pugCompile() {
  return gulp.src('./app/pug/**/*.pug')
    .pipe(pug({
     doctype: 'html',
     pretty: true
   }))
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.reload({
    stream: true
   }))
}

//compile ES6 into ES5
function es6Compile() {
  return gulp.src('./app/es6/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./app/js'))
}


function watch() {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  });

  gulp.watch('./app/scss/**/*.scss', sassCompile)
  gulp.watch('./app/pug/**/*.pug', pugCompile)
  gulp.watch('./app/es6/**/*.js', es6Compile)
  // gulp.watch('./app/js/**/*.js').on('change', browserSync.reload)
  gulp.watch('./app/*.html').on('change', browserSync.reload)
}

exports.sassCompile = sassCompile;
exports.pugCompile = pugCompile;
exports.es6Compile = es6Compile;
exports.watch = watch;
