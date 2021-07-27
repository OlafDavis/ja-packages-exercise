const gulp = require('gulp');
const babel = require("gulp-babel");
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');

// one of 'works', 'fails', 'works-with-Promises'
const version = 'works-with-Promises';

gulp.task('build', function() {
    return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task('test', function(){
    return gulp.src('./tests/**/*.js')
        .pipe((mocha({reporter: 'spec'})))
})

gulp.task('dev', gulp.series('build', function() {
    return nodemon({
        script: 'dist/' + version + '.js',
        ext: 'js',
        ignore: ['dist/'],
        env: { 'NODE_ENV': 'development' },
        tasks: ['build']    // we could add 'test' here too if we just wanted the tests to run when the src changes
    });
}));

// this task watches for changes to either the src or the tests, and reruns the tests
gulp.task('test-watch', function() {
     gulp.watch(['./src/**/*.js', './tests/**/*.js'], gulp.series('test'));
});