/**
 * Moves HTML assets (maintaining folder structure) to
 * the global `destPath` directory.
 *
 * Example Usage:
 * gulp html
 */

import gulp from 'gulp';
import chalk from 'chalk';
import nunjucksRender from 'gulp-nunjucks-render';

import globalSettings from '../../config';

//gulp.task('html', () => {
//    return gulp.src(globalSettings.taskConfiguration.html.sourcePaths)
//        .pipe(gulp.dest(globalSettings.destPath))
//        .on('finish', () => {
//            console.log(chalk.bgGreen.white(' FE Skeleton: HTML assets moved.'));
//        });
//});


gulp.task('html', function() {

    // Gets .html and .nunjucks files in pages
  return gulp.src('html/pages/**/*.+(html|nunjucks)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: 'html/templates'
    }))
    // output files in app folder
    .pipe(gulp.dest(globalSettings.destPath))
    .on('finish', () => {
            console.log(chalk.bgGreen.white(' FE Skeleton: HTML assets moved.'));
    });
});
