/* Imports */
var View = famous.core.View;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;

MenuView = function () {
    View.apply(this, arguments);

    _createStripViews.call(this);
}

MenuView.DEFAULT_OPTIONS = {
    stripData: {},
    topOffset: 37,
    stripOffset: 58
};

/* Prototype */
MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView;


function _createStripViews() {
    this.stripModifiers = [];
    var yOffset = this.options.topOffset;

    for (var i = 0; i < this.options.stripData.length; i++) {
        var stripView = new StripView({
            iconUrl: this.options.stripData[i].iconUrl,
            title: this.options.stripData[i].title
        });

        var stripModifier = new StateModifier({
            transform: Transform.translate(0, yOffset, 0)
        });

        this.stripModifiers.push(stripModifier);
        this.add(stripModifier).add(stripView);

        yOffset += this.options.stripOffset;
    }
}