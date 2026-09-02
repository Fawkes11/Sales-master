const {src, dest, watch, parallel, series} = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache')
const webp = require('gulp-webp');

function versionWebp(done){
    const opciones = {
        quality: 60 // NOTE This number goes between 0 to 100, based on this will be optimization and size for the images
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3 //NOTE This number goes between 0 to 5, based on this will be optimization and size for the images
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function watchFiles(){
    watch('src/img/**/*.{png,jpg}', versionWebp);
    watch('src/img/**/*.{png,jpg}', imagenes);
}

exports.versionWebp = versionWebp;
exports.imagenes = imagenes;

// NOTE Estas funciones que se exportaron se generaron en la seccion de scripts del archivo package.json en caso de que al correr el comando gulp genere error. Para ello en la consola puedes correr dependiendo lo que quieras "npm run ..."
exports.img = parallel(imagenes, versionWebp);
exports.watch = parallel(imagenes, versionWebp, watchFiles);