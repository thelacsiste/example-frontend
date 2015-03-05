var gulp   = require('gulp');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
    gulp.src('assets/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/dist/css'));
});
 
gulp.task('copy', function() {
    gulp.src('bower_components/materialize/dist/font/**/*')
        .pipe(gulp.dest('assets/dist/font'));    
});

gulp.task('scripts', function() {
    gulp.src([
        "bower_components/jquery/dist/jquery.js",
        "bower_components/materialize/dist/js/materialize.js",
        "bower_components/angular/angular.js",
        "bower_components/angular-sanitize/angular-sanitize.js",
        "bower_components/angular-modal-service/dst/angular-modal-service.js",
        "controllers/mainCtrl.js",
        "services/commentService.js",
        "app.js",
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('assets/dist/js'));
});

gulp.task('default', ['sass', 'copy','scripts']);