Package.describe({
  name: 'num3a:canvas-camera',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Capture video to preview camera on web page(canvas tag) and to take photos with user defined quality / dimension.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

/*
Cordova.depends({
    "com.keith.cordova.plugin.canvascamera":"1.0.1"
}); */

Package.onUse(function(api) {
  api.versionsFrom('1.0.4.2');
  api.addFiles('canvas-camera.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('num3a:canvas-camera');
  api.addFiles('canvas-camera-tests.js');
});
