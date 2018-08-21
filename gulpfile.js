var gulp = require('gulp');
var sass = require("gulp-sass");
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');

//sassコンパイル
gulp.task("sass", function() {
    gulp.src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/css/'))
});

// watch
gulp.task('watch', function(){
    gulp.watch(['./**/*.html', './**/*.htm']); //タスクを追加
    gulp.watch('src/scss/**/*.scss',['sass']);
});

gulp.task('webserver', function() {
    gulp.src('./dist/')
    .pipe(webserver({
        livereload: true,
        port: 8001,
        fallback: 'index.html',
        open: true
    }));
});

var changed = require('gulp-changed')
var imagemin = require("gulp-imagemin");
var imageminPngquant = require('imagemin-pngquant');
var imageminMozjpeg = require('imagemin-mozjpeg');
gulp.task('img', function() {
 return gulp.src('src/images/**/*.{jpg,jpeg,png,gif,svg}')
 .pipe(changed('./dist/assets/images/'))
 .pipe(imagemin([
 imageminMozjpeg({
 quality:75,
 progressive: true
 }),
 imagemin.gifsicle(),
 imageminPngquant({quality: '65-80'}),
 imagemin.optipng(),
 imagemin.svgo(),
 ]))
 .pipe(gulp.dest('./dist/assets/images/'))
});

gulp.task('start',['webserver','watch','img']);
