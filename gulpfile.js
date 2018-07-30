var gulp = require('gulp');
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var webserver = require('gulp-webserver');

//sassコンパイル
gulp.task("default",['sass','watch','server']);

(autoprefixer({
    // ☆IEは9以上、Androidは4以上、iOS Safariは8以上
    // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
    browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
    cascade: false
}))

gulp.task("sass", function() {
    gulp.src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/assets/css"))
    .pipe(browser.reload({stream:true}))
});

// watch
gulp.task('watch', function(){
    gulp.watch(['./**/*.html', './**/*.htm'], ['browser-reload']); //タスクを追加
    gulp.watch("src/css/**/*.scss",["sass"]);
});


gulp.task("webserver",function(){
    gulp.src('./dist/')
    .pipe(webserver({
        livereload: true,
        port: 8001,
        fallback: 'index.html',
        open: true
    }));
});

gulp.task('start',['webserver','watch']);
