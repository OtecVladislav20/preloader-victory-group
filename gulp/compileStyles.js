import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';

var paths = {
    styles: {
      src: 'src/assets/styles/**/*.scss',
      dest: 'build/assets/css/'
    },
}

const sass = gulpSass(dartSass);

function compileStyles() {
    return gulp.src(paths.styles.src, {sourcemaps: true, encoding: false})
        .pipe(sass.sync({
            silenceDeprecations: ['mixed-decls'],
        }).on('error', sass.logError))
        .pipe(
        postcss([
            autoprefixer({
                grid: true,
            })]))
        .pipe(csso({
        }))  
        .pipe(gulp.dest(paths.styles.dest, {sourcemaps: '.'}));
}

function compileStylesProd() {
    return gulp.src(paths.styles.src, {sourcemaps: false, encoding: false})
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(
        postcss([
            autoprefixer({
                grid: true,
            })]))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(csso({
            sourceMap: false,
        }
        ))
        .pipe(gulp.dest(paths.styles.dest));
}

export {compileStyles, compileStylesProd};