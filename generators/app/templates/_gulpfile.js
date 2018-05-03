var gulp = require('gulp');

gulp.task('default', function () {
    return gulp.src(['src/public/**/*', 'src/views/**/*'], { base: 'src' })
        .pipe(gulp.dest('dist'));
});
