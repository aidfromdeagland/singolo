"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
/*var uglify = require('gulp-uglify-es').default;*/

gulp.task("build-css", function () {
  return gulp.src("assets/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("./"))
});

/*gulp.task("build-js", function () {
  return gulp.src("assets/js/script.js")
    .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(sourcemap.write("./"))
    .pipe(gulp.dest("build"))
});*/

gulp.task("build", gulp.series(
  "build-css"
  /*"build-js"*/
));