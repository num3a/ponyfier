var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var HeaderFooter = famous.views.HeaderFooterLayout;
var ImageSurface = famous.surfaces.ImageSurface;

AboutView = function(){
    View.apply(this,arguments);

    _createCredits.call(this);
}

AboutView.DEFAULT_OPTIONS = {
};

AboutView.prototype = Object.create(View.prototype);
AboutView.prototype.constructor = AboutView;

function _createCredits(){
    var creditsSurface = new Surface({
        size : [undefined,undefined],
        content: Blaze.toHTML(Template.about),
        properties: {
            background : '#002B56'
        }
    });

    this.add(creditsSurface);
}
