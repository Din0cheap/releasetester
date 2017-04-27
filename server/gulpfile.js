let gulp = require('gulp');
let mocha = require('gulp-mocha');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let browserSync = require('browser-sync').create();
let runSequence = require('run-sequence');
let gutil = require('gulp-util');

gulp.task('default', function (callback) {
    runSequence('watch', 'test', callback);
});


gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('test/*.js', ['test']);
    gulp.watch('mochawesome-reports/assets/*', ['copyAssets']);
    gulp.watch('mochawesome-reports/mochawesome.html', ['copyTestResults']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/assets/*', browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});



gulp.task('test', function () {
    //Code for default task
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'mochawesome',  reporterOptions: { reportDir: 'tests' } }))
        .on('error', gutil.log);

});

gulp.task('copyAssets', function () {
    return gulp.src('mochawesome-reports/assets/*')
        .pipe(gulp.dest('app/assets/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('copyTestResults', function () {
    return gulp.src('mochawesome-reports/*.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

