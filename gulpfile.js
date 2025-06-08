var gulp = require('gulp');
var gzip = require('gulp-gzip');

var gulpBrotli  = require('gulp-brotli');
var zlib        = require('zlib');

var fileFilters = [
    './dist/**/*.*',
    '!./dist/**/*.map', '!./dist/**/*.png',
];

gulp.task('gzip', function ()
{
    return gulp.src(fileFilters)
        .pipe(gzip())
        .pipe(gulp.dest('./dist'));
});

gulp.task('brotli', function ()
{
    return gulp.src(fileFilters)
        .pipe(gulpBrotli({
            // the options are documented at https://nodejs.org/docs/latest-v10.x/api/zlib.html#zlib_class_brotlioptions 
            params: {
                // brotli parameters are documented at https://nodejs.org/docs/latest-v10.x/api/zlib.html#zlib_brotli_constants
                [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
            },
        }))
        .pipe(gulp.dest('./dist'));
});