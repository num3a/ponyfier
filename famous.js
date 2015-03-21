if (Meteor.isServer) {


}

var drawFamousOrbital = function () {
    var Engine = famous.core.Engine;
    var Surface = famous.core.Surface;
    var Transform = famous.core.Transform;
    var StateModifier = famous.modifiers.StateModifier;

    var mainContext = Engine.createContext();

    var stateModifier = new StateModifier({
        transform: Transform.translate(50, 50, 0)
    });

    var firstSurface = new Surface({
        content: "<h3>Hi!</h3><p>I'm a surface!<br>I live inside a context.</p><p>You can add <b>HTML</b> content to me and style me with <b>CSS!</b></p>",
        size: [200, 200],
        properties: {
            backgroundColor: 'rgb(240, 238, 233)',
            textAlign: 'center',
            padding: '5px',
            border: '2px solid rgb(210, 208, 203)',
            marginTop: '50px',
            marginLeft: '50px'
        }
    });

    var squareOrbitalSurface = new Surface({
        content: "<span style='color:white'>Interstellar !!</span>",
        size: [40, 40],
        properties: {
            backgroundColor: 'grey'
        }
    });

    var orbitalModifier = new StateModifier();

    for (var i = 0; i < 10; i++) {
        orbitalModifier.setTransform(
            Transform.translate(0, 300, 0),
            {duration: 800}
        );

        orbitalModifier.setTransform(
            Transform.translate(350, 300, 0),
            {duration: 800}
        );

        orbitalModifier.setTransform(
            Transform.translate(350, 40, 0),
            {duration: 800}
        );

        orbitalModifier.setTransform(
            Transform.translate(0, 0, 0),
            {duration: 800}
        );
    }


    mainContext.add(stateModifier).add(firstSurface);
    mainContext.add(orbitalModifier).add(squareOrbitalSurface);
};

if (Meteor.isClient) {
//    drawFamousOrbital();
    Template.launchCamera.helpers({
        photo: function(){
            return Session.get('photo');
        }
    });
    Template.launchCamera.events({
        'click button': function(event, template){

            var cameraOptions = {
                width: 640,
                height: 640,
                quality: 100
            };

            var cameraCallback = function(error, data){
                if(error){
                    console.log('An error occured when using camera.',error);
                }
                else
                {
                    Session.set("photo", data);
                }
            };

            MeteorCamera.getPicture(cameraOptions,cameraCallback);
            console.log('clicked',this);
        }
    });

}
