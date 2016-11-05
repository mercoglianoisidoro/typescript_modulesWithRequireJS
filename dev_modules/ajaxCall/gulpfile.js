var gulp = require('gulp');

//to execute exec
var exec = require('child_process').exec;

var ts = require('gulp-typescript');
// var deletefile = require('gulp-delete-file');

var gulp = require("gulp");
var gulpTypings = require("gulp-typings");

gulp.task("installTypings", function() {
    var fs = require('fs');
    var typingsPath = "typings.json";
    if (false === fs.existsSync(typingsPath)) {
        console.error(`typings file (${typingsPath}) doen't exist`);
        return;
    }

    var stream = gulp.src(typingsPath)
        .pipe(gulpTypings()); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});

//get typescript config
function getTSConf() {
    var jsonfile = require('jsonfile');
    var file = 'tsconfig.json';
    var tsconfig;
    try {
        tsconfig = jsonfile.readFileSync(file);
        console.log('read tc conf file ' + file);
    } catch (err) {
        console.log('no tc conf file');
        try {
            tsconfig = jsonfile.readFileSync('../../' + file);
            console.log('readinf MAIN tc conf file ' + file);
        } catch (err) {
            console.log('neithe main tc conf file available');
            throw err;
        }
    }
    return tsconfig;
    //tsconfig.compilerOptions.include = ['src'];

}


gulp.task('build_src', function() {
    var tsconfig = getTSConf();
    return gulp.src(['src/**/*.ts'])
        .pipe(ts(tsconfig.compilerOptions))
        .pipe(gulp.dest('dist'));
});
//
// gulp.task('move_destination_files' ,['tsc_compile_src'], function() {
//     gulp.src(['src/**/*.js'])
//         .pipe(gulp.dest('dist'));
//     gulp.src(['src/**/*.js'])
//         .pipe(deletefile({
//             deleteMatch: true //delete all
//         }));
// });


gulp.task('build_tests', function() {
    var tsconfig = getTSConf();
    tsconfig.compilerOptions.declaration=false;
    return gulp.src(['test/*.ts'])
        .pipe(ts(tsconfig.compilerOptions))
        .pipe(gulp.dest('test'));
});



gulp.task('test', ['build_src', 'build_tests'], function() {

    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');
    gulp.src(['test/**.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec'
                // ,
                // globals: {
                //     //  should: require('should')
                // }
        }))
        .on('error', gutil.log);
});


gulp.task('watch_and_test', ['test'], function() {
    gulp.watch(__dirname + '/**/*.ts', ['test']);
    //  gulp.watch(__dirname+'/www/*', ['build']);
});


gulp.task('watch_and_build', ['build_src'], function() {
    gulp.watch(__dirname + '/**/*.ts', ['build_src']);
});
