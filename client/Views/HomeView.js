var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var HeaderFooter = famous.views.HeaderFooterLayout;
var ImageSurface = famous.surfaces.ImageSurface;
var EventHandler = famous.core.EventHandler;


HomeView = function(){
    View.apply(this, arguments);

    _createButtons.call(this);
    _setListeners.call(this);
}

HomeView.DEFAULT_OPTIONS = {

};

/* Prototype */
HomeView.prototype = Object.create(View.prototype);
HomeView.prototype.constructor = HomeView;

function _createButtons(){
    this.takePictureSurface = new Surface({
        size : [130,130],
        content: Blaze.toHTML(Template.takePictureButton),
        properties: {
            background : '#002B56'
        }
    });

    this.openPictureSurface = new Surface({
        size: [130,130],
        content : Blaze.toHTML(Template.openPictureButton),
        properties: {
            background: '#3D74AC'
        }
    });

    var takePictureModifier = new StateModifier({
        origin: [0.5, 1],
        align : [0.5, 0.4]
    });

    var openPictureModifier = new StateModifier({
        origin: [0.5, 0.5],
        align : [0.5, 0.7]
    });

    this.add(takePictureModifier).add(this.takePictureSurface);
    this.add(openPictureModifier).add(this.openPictureSurface);
}

function _setListeners() {

    this.takePictureSurface.on('click',function(){
        this._eventOutput.emit('loadEditor');
    }.bind(this));

    this.openPictureSurface.on('click',function(){});
}
