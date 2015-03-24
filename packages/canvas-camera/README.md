# Meteor Canvas Camera Package
## Warning, this package is not yet usable.

Add it to your [Meteor](http://meteor.com) app with `meteor add num3a:canvas-camera`.


### MeteorCanvasCamera.initialize(canvasId)
Before using it, you must initialize the camera.

### MeteorCanvasCamera.start(options)
Initialize the camera with the canvas id.

### MeteorCanvasCamera.getPicture([options], callback)

Prompt the user to take a photo with their device and get the picture as a Data URI in JPEG format.

#### options

`options` is an optional argument that is an Object with the following possible keys:

- `width` An integer that specifies the minimum width of the returned photo.
- `height` An integer that specifies the minimum height of the returned photo.
- `quality` A number from 0 to 100 specifying the desired quality of JPEG encoding.
- `correctOrientation` Rotate the image to correct for the orientation of the device during capture.
...


### MeteorCanvasCamera.takePicture(onSuccess)
...

For more information, please go to : https://github.com/nicholasareed/CanvasCameraPlugin