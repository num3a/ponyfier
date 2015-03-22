Package.describe({
  name: 'num3a:camera',
  version: '1.0.2',
  // Brief, one-line summary of the package.
  summary: 'Photos with one function call on desktop and mobile.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/num3a/meteor-camera',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
    api.export('MeteorCamera');
    api.use(["templating", "session", "ui", "blaze", "less", "reactive-var"]);
    api.versionsFrom('1.0.4.2');

    api.addFiles('photo.html');
    api.addFiles('photo.js');
    api.addFiles("camera.less", ["web.browser"]);
    api.addFiles('photo-browser.js', ['web.browser']);
    api.addFiles('photo-cordova.js', ['web.cordova']);
});
