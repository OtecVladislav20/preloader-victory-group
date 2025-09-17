import gulp from 'gulp';
import gulpEsbuild, {createGulpEsbuild} from 'gulp-esbuild';

const paths = {
    scripts: {
      src: 'src/assets/js/bundles/*.js',
      dest: 'build/assets/js'
    }
  };

  const incrementalGulpEsbuild = createGulpEsbuild({
    incremental: true, // enables the esbuild's incremental build
  })

function compileScripts() {
    return gulp.src(paths.scripts.src, { encoding: false })
      .pipe(incrementalGulpEsbuild({
          outdir: './bundles',
          sourcemap: 'linked',
          logLevel: 'info',
          bundle: true,
          target: 'es2022',
          format: 'esm',
          legalComments: 'eof'
      }))
      .pipe(gulp.dest(paths.scripts.dest));
}

function compileScriptsProd() {
    return gulp.src(paths.scripts.src, {
      encoding: false,
    })
      .pipe(gulpEsbuild({
        outdir: './bundles',
        bundle: true,
        target: 'es2022',
        minify: true,
        format: 'esm',
        logLevel: 'info',
        legalComments: 'eof'
      }))
      .pipe(gulp.dest(paths.scripts.dest));
}

export {compileScripts, compileScriptsProd};