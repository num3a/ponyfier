/* Imports */
var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var Easing = famous.transitions.Easing;

AppView = function () {
    View.apply(this, arguments);

    _createPageView.call(this);
    -_setListeners.call(this);
}

AppView.DEFAULT_OPTIONS = {
    openPosition: 276,
    transition: {
        duration: 300,
        curve: Easing.inOutBack
    }
};

/* Prototype */
AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.prototype.slideLeft = function() {
    this.pageModifier.setTransform(Transform.translate(0, 0, 0), this.options.transition);
};

AppView.prototype.slideRight = function() {
    this.pageModifier.setTransform(Transform.translate(this.options.openPosition, 0, 0), this.options.transition);
};

AppView.prototype.toggleMenu = function() {
    if(this.menuToggle) {
        this.slideLeft();
    } else {
        this.slideRight();
    }
    this.menuToggle = !this.menuToggle;
};

/* Functions */

function _createPageView() {
    this.pageView = new PageView();
    this.pageModifier = new StateModifier();

    this.add(this.pageModifier).add(this.pageView);
}

function _setListeners() {
    this.pageView.on('menuToggle', this.toggleMenu.bind(this));
}