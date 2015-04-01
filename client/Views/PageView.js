/* Imports */
var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var HeaderFooter = famous.views.HeaderFooterLayout;
var ImageSurface = famous.surfaces.ImageSurface;
var FastClick = famous.inputs.FastClick;

PageView = function () {
    View.apply(this, arguments);

    _createBacking.call(this);
    _createLayout.call(this);
    _createHeader.call(this);
    _createBody.call(this);
    _setListeners.call(this);
}

PageView.DEFAULT_OPTIONS = {
    headerSize: 44
};

/* Prototype */
PageView.prototype = Object.create(View.prototype);
PageView.prototype.constructor = PageView;

/* Functions */
function _createLayout() {
    this.layout = new HeaderFooter({
        headerSize: this.options.headerSize
    });

    var layoutModifier = new StateModifier({
        transform: Transform.translate(0, 0, 0.1)
    });

    this.add(layoutModifier).add(this.layout);
}

function _createHeader() {
    var backgroundSurface = new Surface({
        properties: {
            backgroundColor: '#633A80'
        }
    });

    var backgroundModifier = new StateModifier({
        transform: Transform.behind
    });

    this.hamburgerSurface = new ImageSurface({
        size: [44, 44],
        content: '/hamburger-purple-44.png'
    });

    var iconSurface = new ImageSurface({
        size: [44, 44],
        content: '/pony-purple-44.png'
    });

    var titleSurface = new Surface({
        size: [true, true],
        content: 'PONYFIER',
        properties: {
            color: '#F8B9CE',
            fontSize: 28 + 'px',
            textTransform: 'uppercase',
            pointerEvents : 'none'
        }
    });

    var hamburgerModifier = new StateModifier({
        origin: [0, 0.5],
        align : [0, 0.5]
    });

    var iconModifier = new StateModifier({
        origin: [1, 0.5],
        align : [1, 0.5]
    });

    var titleModifier = new StateModifier({
        origin: [0.5, 0.5],
        align : [0.5, 0.5]
    });

    this.layout.header.add(backgroundModifier).add(backgroundSurface);
    this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
    this.layout.header.add(titleModifier).add(titleSurface);
    this.layout.header.add(iconModifier).add(iconSurface);

}

function _createBody() {
    this.bodySurface = new ImageSurface({
        size : [undefined, undefined],
        content : '/body.png'
    });

   // this.layout.content.add(this.bodySurface);
    var homeView = new HomeView();
    this.layout.content.add(homeView);
}

function _setListeners() {
    this.hamburgerSurface.on('click', function() {
        this._eventOutput.emit('menuToggle');
    }.bind(this));

    this.bodySurface.pipe(this._eventOutput);
}

function _createBacking() {
    var backing = new Surface({
        properties: {
            backgroundColor: '#5F58A5',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        }
    });

    this.add(backing);
}