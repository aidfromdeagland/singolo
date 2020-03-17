"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
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
    .pipe(server.stream());
});

/*gulp.task("build-js", function () {
  return gulp.src("assets/js/script.js")
    .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(sourcemap.write("./"))
    .pipe(gulp.dest("build"))
});*/

gulp.task("server", function () {
  server.init({
    server: "./",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("assets/sass/**/*.scss", gulp.series("build-css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("build-css", "server"));

gulp.task("build", gulp.series(
  "build-css"
  /*"build-js"*/
));