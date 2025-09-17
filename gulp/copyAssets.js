import gulp from 'gulp';

const copySvg = () =>
  gulp.src('src/assets/img/**/*.svg', {
    base: 'src',
    encoding: false,
  })
    .pipe(gulp.dest('build'));

const copyImages = () =>
  gulp.src('src/assets/img/**/*.{png,jpg,webp}', {
    base: 'src',
    encoding: false,
  })
    .pipe(gulp.dest('build'));

const copy = () =>
  gulp.src([
    'src/**.php',
    'src/assets/fonts/**',
    'src/assets/media/**',
    'src/assets/favicon/**',
    'src/assets/json/**/*.json',
  ], {
    base: 'src',
    encoding: false,
  })
    .pipe(gulp.dest('build'));

const copyVarious = () =>
  gulp.src([
    'src/assets/fonts/**',
    'src/assets/favicon/**',
    'src/assets/media/**',
    'src/assets/json/**/*.json',
  ], {
    base: 'src',
    encoding: false,
  })
    .pipe(gulp.dest('build'));


export { copy, copyImages, copySvg, copyVarious };