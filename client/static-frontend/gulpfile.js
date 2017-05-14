let gulp = require('gulp'),
    scss = require('gulp-sass');

gulp.task('scss', () => {
  gulp.src('scss/*.scss')
  .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
  .pipe(gulp.dest('css'));
});

gulp.task('watch', () => {
  gulp.watch('scss/**/*.scss', ['scss']);
});

gulp.task('default', ['scss', 'watch']);
