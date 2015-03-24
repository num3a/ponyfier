Package.describe({
  name: 'num3a:canvas-camera',
  version: '0.5.2',
  // Brief, one-line summary of the package.
  summary: 'Capture video to preview camera into a hmtl canvas to take photos..',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Cordova.depends({
    "com.keith.cordova.plugin.canvascamera":"https://github.com/donaldp24/CanvasCameraPlugin/tarball/310de54f5ed836d213a917cc6fa12186cbfaab35"
});

Package.onUse(function(api) {
    api.export('MeteorCanvasCamera');

    api.versionsFrom('1.0.4.2');
    api.addFiles('canvas-camera.js');
    api.use(['check','jquery']);

});

Package.onTest(function(api) {

    api.export('MeteorCanvasCamera');

    api.use('tinytest');
    api.use('num3a:canvas-camera');
    api.use(['check','jquery']);

    api.addFiles('canvas-camera-tests.js');
});
