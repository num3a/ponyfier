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
function _createButtons(){
    var takePictureSurface = new Surface({
        size : [130,130],
        content: Blaze.toHTML(Template.takePictureButton),
        properties: {
            background : 'pink'
        }
    });

    var openPictureSurface = new Surface({
        size: [130,130],
        content : Blaze.toHTML(Template.openPictureButton),
        properties: {
            background: 'violet'
        }
    });

    takePictureSurface.on('click',function(){
        var options = {
            width: 300,
            heigth: 300,
            quality: 100,
            correctOrientation: true
        };

        MeteorCamera.getPicture(options,function(error,data){
            if(error){
                console.log('An error occurs when taking a photo',error);
            }
            else{
                console.log('picture taken');
            }
        });
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
