var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var HeaderFooter = famous.views.HeaderFooterLayout;
var ImageSurface = famous.surfaces.ImageSurface;

HomeView = function(){
    View.apply(this, arguments);

    _createButtons.call(this);
}

HomeView.DEFAULT_OPTIONS = {

};

/* Prototype */
HomeView.prototype = Object.create(View.prototype);
HomeView.prototype.constructor = HomeView;

/* Functions */
function _takePicture() {
    var cameraOptions = {
        width: 300,
        height: 300,
        quality: 100,
        correctOrientation: true
    };

    MeteorCamera.getPicture(cameraOptions, function (error, data) {
        if (error) {
            console.log('An error occurs when taking a photo', error);
        }
        else {
            console.log('picture taken');
        }
    });
}

function _createButtons(){
    var takePictureSurface = new Surface({
        size : [130,130],
        content: Blaze.toHTML(Template.takePictureButton),
        properties: {
            background : '#002B56'
        }
    });

    var openPictureSurface = new Surface({
        size: [130,130],
        content : Blaze.toHTML(Template.openPictureButton),
        properties: {
            background: '#3D74AC'
        }
    });

    takePictureSurface.on('click',function(){
       // _takePicture();
        var _mockPicture = function () {

        };
        _mockPicture();
    });

    var takePictureModifier = new StateModifier({
        origin: [0.5, 1],
        align : [0.5, 0.4]
    });

    var openPictureModifier = new StateModifier({
        origin: [0.5, 0.5],
        align : [0.5, 0.7]
    });

    this.add(takePictureModifier).add(takePictureSurface);
    this.add(openPictureModifier).add(openPictureSurface);
}
