var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var HeaderFooter = famous.views.HeaderFooterLayout;
var ImageSurface = famous.surfaces.ImageSurface;
var CanvasSurface = famous.surfaces.CanvasSurface;

EditorView = function(){
    View.apply(this,arguments);

    _takePicture.call(this);

}

EditorView.DEFAULT_OPTIONS = {
};

EditorView.prototype = Object.create(View.prototype);
EditorView.prototype.constructor = EditorView;

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
            Session.set('lastImage',data);

            _createCanvas();
            _loadImage();
        }
    });
}

function _createCanvas(){
    var canvasSurface = Surface({
        size: [undefined,undefined],
        content : Blaze.toHTML(Template.editPicture)
    });

    this.add(canvasSurface);
}

function _loadImage (){
    var data = Session.get('lastImage');
    if(data == null) return;

    var image = new Image();
    image.src = "data:image/jpeg;base64," + data;
    var canvas = document.getElementById("canvasEditor");
    var context = canvas.getContext('2d');

    context.drawImage(image,0,0);
}