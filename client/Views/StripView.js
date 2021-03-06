/* Imports */
var View = famous.core.View;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var ImageSurface = famous.surfaces.ImageSurface;

StripView = function () {
    View.apply(this, arguments);

    _createBackground.call(this);
    _createIcon.call(this);
    _createTitle.call(this);
}

StripView.DEFAULT_OPTIONS = {
    width: 320,
    height: 55,
    angle: -0.2,
    iconSize: 32,
    iconUrl: '/pony.png',
    title: 'Poney',
    fontSize: 26,
    stripData : {}
};

/* Prototype */
StripView.prototype = Object.create(View.prototype);
StripView.prototype.constructor = StripView;

/* Functions */
function _createBackground() {
    var backgroundSurface = new Surface({
        size: [this.options.width, this.options.height],
        properties: {
            backgroundColor: '#633A80',
            // on certain devices, a skewed surface can have jagged edges
            // the 1px box-shadow provides some anti-aliasing to soften this
            boxShadow: '0 0 1px rgba(0,0,0,1)'
        }
    });

    var rotateModifier = new StateModifier({
        transform: Transform.rotateZ(this.options.angle)
    });

    var skewModifier = new StateModifier({
        transform: Transform.skew(0, 0, this.options.angle)
    });

    // we're first skewing our surface then rotating it
    this.add(rotateModifier).add(skewModifier).add(backgroundSurface);
}

function _createIcon() {
    var iconSurface = new ImageSurface({
        size: [this.options.iconSize, this.options.iconSize],
        content : this.options.iconUrl,
        properties: {
            pointerEvents : 'none'
        }
    });

    var iconModifier = new StateModifier({
        // places the icon in the proper location
        transform: Transform.translate(24, 2, 0)
    });

    this.add(iconModifier).add(iconSurface);
}

function _createTitle() {
    var titleSurface = new Surface({
        size: [true, true],
        content: this.options.title,
        properties: {
            color: '#F8B9CE',
            fontSize: this.options.fontSize + 'px',
            textTransform: 'uppercase',
            pointerEvents : 'none'
        }
    });

    var titleModifier = new StateModifier({
        transform: Transform.thenMove(Transform.rotateZ(this.options.angle), [75, -5, 0])
    });

    this.add(titleModifier).add(titleSurface);
}

