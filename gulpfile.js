const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const gcmq = require('gulp-group-css-media-queries');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const blade = require('gulp-blade');
const smartgrid = require('smart-grid');
const php  = require('gulp-connect-php');

/* It's principal settings in smart grid project */



gulp.task('buildCSS', function(){
    return gulp.src('resources/assets/sass/style.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename({suffix: '.min'}))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'public/'
        }
    });
});
// gulp.task('pug', function() {
//     return gulp.src(['resources/views/**/*.pug'])
//         .pipe(pug({
//             basedir: 'public/'
//         }))
//         .pipe(gulp.dest('public/'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });
gulp.task('php', function() {
    php.server({ base: 'build', port: 9999, keepalive: true});
});

gulp.task('browserSync',['php'], function() {
    browserSync.init({
        proxy: '127.0.0.1:9998',
        port: 8081,
        open: true,
        notify: false
    });
});

gulp.task('watch', [ 'buildCSS', 'browserSync'], function() {
    gulp.watch('resources/assets/sass/*.sass', ['buildCSS']); // Наблюдение за sass файлами
    //gulp.watch('public/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['public/*.php'], browserSync.reload);
    //gulp.watch('resources/views/**/*.pug',['pug']);
    // gulp.watch('resources/assets/js/**/*.js', ['minifyJS']); // Наблюдение за JS файлами в папке js
});