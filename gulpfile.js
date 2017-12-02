const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "dist/"
      }
  });
});

gulp.task('js', () => {
  gulp.src('src/js/drag-and-drop.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
})

gulp.task('sass', () => {
  gulp.src('src/css/drag-and-drop.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(browserSync.stream())
})

gulp.task('html', () => {
  gulp.src("src/index.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
})

gulp.task('watch', ["sass", "js", "html", "browser-sync"], () => {
  gulp.watch("src/css/drag-and-drop.sass", ["sass"])
  gulp.watch("src/js/drag-and-drop.js", ["js"])
  gulp.watch("src/index.html", ["html"])
});