/* Imports */
var Surface = famous.core.Surface;
var View = famous.core.View;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var Easing = famous.transitions.Easing;
var Transitionable  = famous.transitions.Transitionable;
var Modifier = famous.core.Modifier;

var GenericSync = famous.inputs.GenericSync;
var MouseSync = famous.inputs.MouseSync;
var TouchSync = famous.inputs.TouchSync;
GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});

AppView = function () {
    View.apply(this, arguments);

    this.menuToggle = false;
    // create transitionable with initial value of 0
    this.pageViewPos = new Transitionable(0);

    _createPageView.call(this);
    _createMenuView.call(this);

    _setListeners.call(this);
    _handleSwipe.call(this);
}

AppView.DEFAULT_OPTIONS = {
    openPosition: 276,
    transition: {
        duration: 300,
        curve: Easing.easeOut
    },
    posThreshold : 100,
    velThreshold : 0.7
};

AppView.StripData = [
    {title: 'Home', iconUrl: '/pony.png'},
    {title: 'Last Ponyfied', iconUrl: '/pony.png'},
    {title: 'Remove Ads', iconUrl: '/pony.png'},
    {title: 'About', iconUrl: '/pony.png'}
];

/* Prototype */
AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.prototype.slideLeft = function() {
    this.pageViewPos.set(0, this.options.transition, function() {
        this.menuToggle = false;
    }.bind(this));
};

AppView.prototype.slideRight = function() {
    this.pageViewPos.set(this.options.openPosition, this.options.transition, function() {
        this.menuToggle = true;
    }.bind(this));
};

AppView.prototype.toggleMenu = function() {
    if(this.menuToggle) {
        this.slideLeft();
    } else {
        this.slideRight();
        this.menuView.animateStrips();
    }
    this.menuToggle = !this.menuToggle;
};

/* Functions */
function _createPageView() {
    this.pageView = new PageView();
    this.pageModifier = new Modifier({
        transform: function() {
            return Transform.translate(this.pageViewPos.get(), 0, 0);
        }.bind(this)
    });

    this.add(this.pageModifier).add(this.pageView);
}

function _setListeners() {
    this.pageView.on('menuToggle', this.toggleMenu.bind(this));
}

function _createMenuView() {
    this.menuView = new MenuView({ stripData: AppView.StripData });

    var menuModifier = new StateModifier({
        transform: Transform.behind
    });

    this
        .add(menuModifier)
        .add(this.menuView);
}

function _handleSwipe() {
    var sync = new GenericSync(
        ['mouse', 'touch'],
        {direction : GenericSync.DIRECTION_X}
    );

    sync.on('update', function(data) {
        var currentPosition = this.pageViewPos.get();
        if(currentPosition === 0 && data.velocity > 0) {
            this.menuView.animateStrips();
        }

        this.pageViewPos.set(Math.max(0, currentPosition + data.delta));
    }.bind(this));

    sync.on('end', (function(data) {
        var velocity = data.velocity;
        var position = this.pageViewPos.get();

        if(position > this.options.posThreshold) {
            if(velocity < -this.options.velThreshold) {
                this.slideLeft();
            } else {
                this.slideRight();
            }
        } else {
            if(velocity > this.options.velThreshold) {
                this.slideRight();
            } else {
                this.slideLeft();
            }
        }
    }).bind(this));

    this.pageView.pipe(sync);

}