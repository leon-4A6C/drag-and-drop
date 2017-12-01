const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');

gulp.task('js', () => {
  gulp.src('src/js/drag-and-drop.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('sass', () => {
  gulp.src('src/css/drag-and-drop.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('watch', ["sass", "js"], () => {
  gulp.watch("src/css/drag-and-drop.sass", ["sass"])
  gulp.watch("src/js/drag-and-drop.js", ["js"])
});