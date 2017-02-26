var gulp = require('gulp'),
    scss = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    path = require('path'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var config = {
  // publicPath: ''+path.resolve('../','../')+'/public',
  publicPath: './public/',
  scssPath: './app/assets/scss/',
  jsPath: './app/assets/js/',
  imgPath: './app/assets/images/',
  videoPath: './app/assets/videos/',
  cssDestPath: './public/',
  jsDestPath: './public/',
  imgDestPath: './public/images/',
  videoDestPath: './public/videos/'
}

// Compiles SCSS in [assets/scss]
gulp.task('scss', function() {
  return gulp.src(config.scssPath + '*.scss')
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(scss())
    .pipe(gulp.dest(config.cssDestPath))
});

gulp.task('js', function() {
  return gulp.src([
      config.jsPath + 'jquery311.min.js',
      config.jsPath + 'imagesLoaded.js',
      config.jsPath + 'showdown.min.js',
      config.jsPath + 'googleMapINIT.js',
      config.jsPath + '1_scriptFrame.js',
      config.jsPath + '2_scriptCore.js',
      config.jsPath + '3_scriptInit.js',
      config.jsPath + '4_scriptExec.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(config.jsDestPath))
});

gulp.task('images', function() {
  return gulp.src(config.imgPath + '**/*')
    .pipe(gulp.dest(config.imgDestPath))
});

gulp.task('videos', function() {
  return gulp.src(config.videoPath + '**/*')
    .pipe(gulp.dest(config.videoDestPath))
});

// General gulp watch task
gulp.task('watch', function() {
  gulp.watch(config.scssPath + '/*.scss', ['scss']);
  gulp.watch(config.jsPath + '/*.js', ['js']);
  gulp.watch(config.imgPath + '/**/*', ['images']);
  gulp.watch(config.videoPath + '/**/*', ['videos']);
});

gulp.task('default', ['watch', 'scss', 'js', 'images', 'videos']);
