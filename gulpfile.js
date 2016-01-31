var gulp = require('gulp'),
    crip = require('cripweb');

crip.scripts([
    '/module.js',
    '/**/*.js'
], 'github-api', 'scripts', 'src', 'build');

crip.scripts([
    'angular/angular.min.js',
    'angular-resource/angular-resource.min.js',
    'jquery/dist/jquery.min.js',
    'crip-angular-core/build/crip-core.js'
], 'vendor', 'scripts-vendor', 'bower_components', 'build');

gulp.task('default', function () {
    crip.gulp.start('crip-default');
    crip.watch();
});