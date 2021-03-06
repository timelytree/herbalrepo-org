var gulp = require('gulp'),
    scss = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    cleanCSS = require('gulp-clean-css');

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
  videoDestPath: './public/videos/'
}

// var cache = function(name) {
//   return through.obj(function(file, enc, cb) {
//     log(+ new Date());
//     this.push(file); // We'll just pass this file along
//
//     fs.stat(config.manifestPath, function(err) {
//       if (err == null) {
//         var json = JSON.parse(fs.readFileSync(config.manifestPath)),
//             oldFileName = json[name];
//         log(colors.red('DELETING'), oldFileName);
//         fs.unlink(config.publicPath + oldFileName, function(err) {
//           // TODO: emit an error if err
//           cb();
//         });
//       } else {
//         return cb(); // Nothing to remove :)
//       }
//     });
//   });
// };

// Compiles Frontend SCSS in [assets/scss_frontend]
gulp.task('scss_frontend', function() {
  return gulp.src([
    config.scss_libraries + 'variables.scss',
    config.scss_libraries + 'normalize.scss',
    config.scss_libraries + 'shared.scss',
    config.scss_frontend + '1_base.scss',
    config.scss_frontend + '2_structure.scss',
    config.scss_frontend + '3_components.scss',
    config.scss_frontend + '4_custom.scss',
    config.scss_frontend + '5_mq.scss'
    // config.scss_libraries + 'variables.scss',
    // config.scss_libraries + 'normalize.scss',
    // config.scss_libraries + 'shared.scss',
    // config.scss_frontend + 'base.scss',
    // config.scss_frontend + 'structure.scss',
    // config.scss_frontend + 'herbs.scss',
    // config.scss_frontend + 'pages.scss',
    // config.scss_frontend + 'categories.scss',
    // config.scss_frontend + 'mq.scss'
  ])
  .pipe(concat('frontend.css'))
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
  .pipe(scss())
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(replace('app/', ''))
  .pipe(gulp.dest(config.publicPath))
});

// Compiles Backend SCSS in [assets/scss_backend]
gulp.task('scss_backend', function() {
  return gulp.src([
    config.scss_libraries + 'variables.scss',
    config.scss_libraries + 'normalize.scss',
    config.scss_libraries + 'shared.scss',
    config.scss_backend + '1_base.scss',
    config.scss_backend + '2_structure.scss',
    config.scss_backend + '3_components.scss',
    config.scss_backend + '4_custom.scss'
  ])
  .pipe(concat('backend.css'))
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
