const { parallel, src, dest } = require('gulp');
const rimraf = require('rimraf');
const scss = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const { getBabelConfig, getTSConfig } = require('./gulpHelper');

const esDir = '../es';
const libDir = '../lib';
const scssSource = '../components/**/*.scss';
const imageSource = '../components/**/*.@(png|jpg|jpeg|svg|gif)';
const styleSource = ['../components/**/style/index.js', '../components/styles/index.js'];
const tsSource = ['../components/*/*.@(jsx|js)', '../components/*/style/*.js', '../components/*.js'];

function clean(path) {
  rimraf.sync(path);
}

function copyScss(isESM) {
  return new Promise((resolve, reject) => {
    src(scssSource)
      .on('error', reject)
      .pipe(dest(isESM ? esDir : libDir))
      .on('end', resolve);
  });
}

function copyImage(isESM) {
  return new Promise((resolve, reject) => {
    src(imageSource)
      .on('error', reject)
      .pipe(dest(isESM ? esDir : libDir))
      .on('end', resolve);
  });
}

function scss2css(isESM) {
  return new Promise((resolve, reject) => {
    src(scssSource)
      .pipe(scss())
      .pipe(postcss([autoprefixer(), cssnano()]))
      .on('error', reject)
      .pipe(dest(isESM ? esDir : libDir))
      .on('end', resolve);
  });
}

function buildCssJS(isESM) {
  return new Promise((resolve, reject) => {
    src(styleSource)
      .pipe(replace(/\/style/g, '/style/css'))
      .pipe(replace(/\.scss/g, '.css'))
      .pipe(babel(getBabelConfig(isESM)))
      .pipe(
        rename({
          basename: 'css',
          extname: '.js'
        })
      )
      .on('error', reject)
      .pipe(dest(isESM ? esDir : libDir))
      .on('end', resolve);
  });
}

function jsx2js(isESM) {
  return new Promise((resolve, reject) => {
    src(tsSource)
      .pipe(babel(getBabelConfig(isESM)))
      .on('error', reject)
      .pipe(dest(isESM ? esDir : libDir))
      .on('end', resolve);
  });
}

function buildTs(isESM) {
  return new Promise((resolve, reject) => {
    src('../components/index.ts')
      .pipe(
        replace(/\/\*\s*@remove[\s\S]+@remove.+\*\//g, (match) =>
          isESM ? '' : match
        )
      )
      .pipe(src(tsSource))
      .pipe(ts(getTSConfig(isESM)))
      .on('error', reject)
      .pipe(dest(isESM ? esDir : libDir))
      .on('end', resolve);
  });
}

function compile(isESM) {
  clean(isESM ? esDir : libDir);
  return Promise.all([
    copyScss(isESM),
    copyImage(isESM),
    scss2css(isESM),
    buildCssJS(isESM),
    jsx2js(isESM),
    // buildTs(isESM)
  ]).catch((err) => {
    console.log(err);
  });
}

function compileESM() {
  console.log('[Parallel] Compile to esm...');
  return compile(true);
}

function compileCJS() {
  console.log('[Parallel] Compile to commonjs...');
  return compile();
}

const build = parallel(compileESM, compileCJS);

exports.build = build;
exports.default = build;