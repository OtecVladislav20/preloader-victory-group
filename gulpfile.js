import gulp from 'gulp';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import fileinclude from 'gulp-file-include';
import compression from 'compression';
import { compileStyles, compileStylesProd } from './gulp/compileStyles.js';
import { copy, copyImages, copySvg, copyVarious } from './gulp/copyAssets.js';
import { compileScripts, compileScriptsProd } from './gulp/compileScripts.js';
import { optimizeSvg, createWebp } from './gulp/optimizeImages.js';

const server = browserSync.create();
const streamStyles = () => compileStyles().pipe(server.stream());

function includeFiles() {
  return gulp.src('src/pages/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build'));
}

const initServer = () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    middleware: [compression()]
  });

  gulp.watch('src/**/*.html', gulp.series(includeFiles, refresh));
  gulp.watch('src/assets/styles/**/*.{scss,sass}', streamStyles);
  gulp.watch('src/assets/js/**/*.{js,json}', gulp.series(compileScripts, refresh));
  gulp.watch('src/data/**/*.{js,json}', gulp.series(copy, refresh));
  gulp.watch('src/assets/img/**/*.svg', gulp.series(copySvg, refresh));
  gulp.watch('src/assets/img/**/*.{png,jpg,webp}', gulp.series(copyImages, createWebp, refresh));


  gulp.watch('src/assets/json/**/*.json', gulp.series(copy, refresh));


  gulp.watch('src/assets/favicon/**', gulp.series(copy, refresh));
  gulp.watch('src/assets/media/**', gulp.series(copy, refresh));
  gulp.watch('src/downloads/**', gulp.series(copy, refresh));
  gulp.watch('src/*.php', gulp.series(copy, refresh));
}

const clean = () => deleteAsync('build');

const refresh = (done) => {
  server.reload();
  done();
};
const build = gulp.series(clean, copyVarious, gulp.parallel(includeFiles, compileStylesProd, compileScriptsProd, optimizeSvg), createWebp);
const dev = gulp.series(clean, copy, gulp.parallel(includeFiles, compileStylesProd, compileScriptsProd, optimizeSvg), createWebp, initServer);
const start = gulp.series(clean, copy, gulp.parallel(includeFiles, compileStyles, compileScripts), createWebp, initServer);
const styles = gulp.series(clean, copyVarious, gulp.parallel(includeFiles, compileStylesProd, compileScriptsProd));

export { createWebp as webp, build, start, dev, styles };
