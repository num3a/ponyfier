var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;


AppView = function () {
    View.apply(this, arguments);

    _createPageView.call(this);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {};

function _createPageView() {
    this.pageView = new PageView();
    this.pageModifier = new StateModifier();

    this.add(this.pageModifier).add(this.pageView);
}