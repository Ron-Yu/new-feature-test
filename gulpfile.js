var gulp = require('gulp'),
    gulpFilter = require('gulp-filter'),
    uglifly = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    prefix = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files');

var js_dest_path = 'build/assets/lib/js';
var css_dest_path = 'build/assets/lib/css';
var img_for_fancybox = 'assets/lib/css';
var themes_for_semantic_ui = 'bower_components/semantic-ui/dist/themes/**/*';

var jsFilter = gulpFilter('*.js');
var cssFilter = gulpFilter('*.css');
var imgFilter = gulpFilter(['*.gif', '*.png']);


//test task
gulp.task('test', function(){
  console.log("this is a test sentence.");
});

// export bower files to where we want
gulp.task('exportBowerFiles', function() {
    return gulp.src(mainBowerFiles())

    .pipe(jsFilter)
        .pipe(gulp.dest(js_dest_path))
        .pipe(jsFilter.restore())
        
    .pipe(cssFilter)
        .pipe(gulp.dest(css_dest_path))
        .pipe(cssFilter.restore());
});


// export semantic-ui themes to where we want
gulp.task('semanticUiThemes', function() {
  return gulp.src(themes_for_semantic_ui, { base: 'bower_components/semantic-ui/dist' })
        .pipe(gulp.dest('build/assets/lib/css'));

});


// Sctipt Task
// Uglifies
gulp.task('scripts', function(){
  gulp.src('native/js/*.js')
    .pipe(plumber())
    .pipe(uglifly())
    .pipe(gulp.dest('build/js'))
    .pipe(notify("Scripts uglify are done!"));
});

//Styles Task
//compile 
gulp.task('styles', function () {
  gulp.src('native/stylus/**/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(prefix())
    .pipe(gulp.dest('build/css'))
    .pipe(notify("Styles complie complete!"));
});

//responsive *.css concat task
//concat
// gulp.task('responsiveCssConcat', function () {
//   gulp.src('build/css/responsive/*.css')
//     .pipe(concat('responsive.css'))
//     .pipe(gulp.dest('build/css'))
//     .pipe(notify("responsive css concat complete!"));
// });

//Template task
//compile jade
gulp.task('templates', function () {
  gulp.src('native/jade/index.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(notify("Template complie complete!"));
});



//Watch Task
//Watches JS
gulp.task('watch', function(){
  gulp.watch('native/js/*.js', ['scripts']);
  gulp.watch('native/stylus/**/*.styl', ['styles']);
  gulp.watch('native/**/*.jade', ['templates']);
});


gulp.task('default', ['scripts', 'styles', 'templates', 'watch']);