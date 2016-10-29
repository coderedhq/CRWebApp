var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var less = require('gulp-less');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var watch = require('gulp-watch')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var cleancss = new LessPluginCleanCSS({ advanced: true });
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

var BUILD_DIR = './assets';
var LESS_GLOB = './src/less/**/*.less';
var LESS_ROOT = './src/less/main.less';
var LESS_BUNDLE_NAME = 'bundle.css';
var LESS_DEV_BUNDLE_NAME = 'bundle.dev.css';
var JS_ROOT = './src/js/app.js';
var JS_BUNDLE_NAME = 'bundle.js';
var JS_DEV_BUNDLE_NAME = 'bundle.dev.js';

gulp.task('default', ['dev-js', 'dev-css']);
gulp.task('build', ['prod-js', 'prod-css']);

gulp.task('dev-css', function(){
    watch(LESS_GLOB, function() {
        gutil.log('Recompiling LESS')
        return compileLess(false);
    });
    return compileLess(false);
});

gulp.task('prod-css', function(){
    return compileLess(true);
});

gulp.task('dev-js', function() {
    var b = getBrowserifyInstance(false);
    var w = watchify(b);

    w.transform('babelify', { presets: ['es2015', 'react', 'stage-0'] });
    w.on('update', function() {
        gutil.log('Updating JS bundle');
        bundleBrowserify(w);
    });
    bundleBrowserify(w, false);
});


gulp.task('prod-js', function() {
    var b = getBrowserifyInstance(true);
    var w = watchify(b);

    w.transform('babelify', { presets: ['es2015', 'react', 'stage-0'] });
    w.on('update', function() {
        gutil.log('Updating JS bundle');
        bundleBrowserify(w);
    });
    bundleBrowserify(w, true);
});

var compileLess = function(forProduction) {
    var plugins = [autoprefix];
    if (forProduction) {
        plugins.push(cleancss);
    }
    return gulp.src([LESS_ROOT])
    .pipe(!forProduction ? sourcemaps.init() : gutil.noop())
    .pipe(less({ plugins: plugins }))
    .pipe(!forProduction ? sourcemaps.write() : gutil.noop())
    .pipe(!forProduction ? rename(LESS_DEV_BUNDLE_NAME) : rename(LESS_BUNDLE_NAME))
    .pipe(gulp.dest(BUILD_DIR))
    .on('end', function(){ gutil.log('LESS compiled') });
}

var getBrowserifyInstance = function(forProduction) {
    return browserify(JS_ROOT, {
        debug: !forProduction,
        extensions: ['.jsx', '.js'],

        // watchify args
        cache: {},
        packageCache: {}
    });
}

var bundleBrowserify = function(browserifyInstance, forProduction) {
    return browserifyInstance.bundle(function(err){
        if(err){
            console.error(err.message);
        }
    })
    .pipe(!forProduction ? source(JS_DEV_BUNDLE_NAME) : source(JS_BUNDLE_NAME))
    .pipe(buffer())
    .pipe(forProduction ? uglify() : gutil.noop())
    .pipe(gulp.dest(BUILD_DIR))
    .on('end', function(){ gutil.log('JS bundling complete') });
};
