var gulp = require('gulp'),
    scss = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    cleanCSS = require('gulp-clean-css'),
    fs = require('fs'),
    through = require('through2'),
    gutil   = require('gulp-util'),
    log     = gutil.log,
    colors  = gutil.colors;

var config = {
  publicPath: './public/',
  scss_libraries: './app/assets/scss_libraries/',
  scss_frontend: './app/assets/scss_frontend/',
  scss_backend: './app/assets/scss_backend/',
  js_libraries: './app/assets/js_libraries/',
  js_frontend: './app/assets/js_frontend/',
  js_backend: './app/assets/js_backend/',
  jsPath: './app/assets/js/',
  imgPath: './app/assets/images/',
  videoPath: './app/assets/videos/',
  imgDestPath: './public/images/',
  videoDestPath: './public/videos/',
  frontendManifestPath: './public/'
}

// Check if manifest file exists
// If not, create it
// Populate it with JSON scaffold
// Default path to './public/' (get root path of app)

var cache = function(options) {
  return through.obj(function(file, enc, cb) {
    this.push(file);

    fs.stat(options.path, function(err) {
      var json = JSON.parse(fs.readFileSync(options.path + options.name + 'Manifest.json')),
          oldName = json["name"];
      fs.unlink(options.path + oldName, function(err) { log(colors.red('DELETING'), oldName) });
      fs.writeFile(options.path + options.name + 'Manifest.json', '{"name":"'+options.name+'-'+options.timestamp+'.css"}', cb);
    });
  });
}

// Compiles Frontend SCSS in [assets/scss_frontend]
gulp.task('scss_frontend', function() {
  var timestamp = Date.now();
  return gulp.src([
    config.scss_libraries + 'variables.scss',
    config.scss_libraries + 'normalize.scss',
    config.scss_libraries + 'shared.scss',
    config.scss_frontend + '1_base.scss',
    config.scss_frontend + '2_structure.scss',
    config.scss_frontend + '3_components.scss',
    config.scss_frontend + '4_custom.scss',
    config.scss_frontend + '5_mq.scss'
  ])
  .pipe(concat('frontend-'+timestamp+'.css'))
  .pipe(cache({ path: config.publicPath, timestamp: timestamp, name: 'frontend' }))
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
  .pipe(scss())
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(replace('app/', ''))
  .pipe(gulp.dest(config.publicPath))
});

// Compiles Backend SCSS in [assets/scss_backend]
gulp.task('scss_backend', function() {
  var timestamp = Date.now();
  return gulp.src([
    config.scss_libraries + 'variables.scss',
    config.scss_libraries + 'normalize.scss',
    config.scss_libraries + 'shared.scss',
    config.scss_backend + '1_base.scss',
    config.scss_backend + '2_structure.scss',
    config.scss_backend + '3_components.scss',
    config.scss_backend + '4_custom.scss'
  ])
  .pipe(concat('backend-'+timestamp+'.css'))
  .pipe(cache({ path: config.publicPath, timestamp: timestamp, name: 'backend' }))
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
  .pipe(scss())
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(replace('app/', ''))
  .pipe(gulp.dest(config.publicPath))
});

// Compiles Frontend JS in [assets/js_frontend]
gulp.task('js_frontend', function() {
  return gulp.src([
    config.js_libraries + 'lazyload.min.js',
    config.js_libraries + 'showdown.min.js',
    config.js_libraries + 'list.min.js',
    config.js_libraries + '_scriptFrame.js',
    config.js_frontend + '1_scriptCore.js',
    config.js_frontend + '2_scriptInit.js',
  ])
  .pipe(concat('frontend.js'))
  // .pipe(uglify())
  .pipe(gulp.dest(config.publicPath))
});

// Compiles Backend JS in [assets/js_backend]
gulp.task('js_backend', function() {
  return gulp.src([
    config.js_libraries + 'showdown.min.js',
    config.js_libraries + 'list.min.js',
    config.js_libraries + 'jqueryAjax.min.js',
    config.js_libraries + '_scriptFrame.js',
    config.js_backend + '1_scriptCore.js',
    config.js_backend + '2_scriptInit.js',
  ])
  .pipe(concat('backend.js'))
  // .pipe(uglify())
  .pipe(gulp.dest(config.publicPath))
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
  gulp.watch(config.scss_libraries + '/*.scss', ['scss_frontend', 'scss_backend']);
  gulp.watch(config.scss_frontend + '/*.scss', ['scss_frontend']);
  gulp.watch(config.scss_backend + '/*.scss', ['scss_backend']);
  gulp.watch(config.js_frontend + '/*.js', ['js_frontend']);
  gulp.watch(config.js_backend + '/*.js', ['js_backend']);
  gulp.watch(config.imgPath + '/**/*', ['images']);
  gulp.watch(config.videoPath + '/**/*', ['videos']);
});

gulp.task('default', ['watch', 'scss_frontend', 'scss_backend', 'js_frontend', 'js_backend', 'images', 'videos']);
