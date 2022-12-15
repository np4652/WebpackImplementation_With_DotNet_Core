const gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    webpack = require("webpack-stream");

const webroot = "./wwwroot/";

const paths = {
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/publishjs/*.js",
    concatCssDest: webroot + "css/site.min.css"
};


function styles() {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
}

function scripts() {
    return gulp
        .src(".")
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest("wwwroot/js/"))
}

exports.build = gulp.parallel(styles, scripts);