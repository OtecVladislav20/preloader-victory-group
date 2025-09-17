import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import webp from 'imagemin-webp';;
import svgo from 'imagemin-svgo';
import extReplace from 'gulp-ext-replace'

const optimizeSvg = () =>
  gulp
      .src('src/assets/img/**/*.svg', {
        encoding: false,
      })
      .pipe(
          imagemin([
            svgo({
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
                {
                  name: 'removeRasterImages',
                  active: true,
                },
                {
                  name: 'removeUselessStrokeAndFill',
                  active: false,
                }],
            })]))
      .pipe(gulp.dest('build/assets/img'));

const createWebp = () => {
  const root = '';
  return gulp
      .src(`src/assets/img/${root}**/*.{png,jpg}`, {
        encoding: false,
      })
      .pipe(imagemin([
        webp({
          quality: 80,
        })
      ]))
      .pipe(extReplace('.webp'))
      .pipe(gulp.dest(`build/assets/img/${root}`));
};

export { createWebp, optimizeSvg};