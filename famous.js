if (Meteor.isServer) {


}

var detectFace = function(){


    var img = $('#takenPicture');

    var tracker = new tracking.ObjectTracker(['face','eye','mouth']);

    tracker.setStepSize(1.7);

    tracking.track('#takenPicture',tracker);

    var plot = function(x,y,w,h){
        var rect = document.createElement('div');
        document.querySelector('.image-container').appendChild(rect);

        rect.classList.add('rect');

        rect.style.width = w +'px';
        rect.style.height = h +'px';
        rect.style.left = (img.offsetLeft + x) + 'px';
        rect.style.top = (img.offsetTop + y) + 'px';
    };

    tracker.on('track',function(event){
        event.data.forEach(function(rect){

            plot(rect.x, rect.y, rect.width, rect.height);
            console.log('face found');
        });
    });


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
                quality: 100,
                correctOrientation: true
            };

            var cameraCallback = function(error, data){
                if(error){
                    console.log('An error occured when using camera.',error);
                }
                else
                {
                    Session.set('photo', data);

                    detectFace();
                }
            };

            MeteorCamera.getPicture(cameraOptions,cameraCallback);
            console.log('clicked',this);
        }
    });

}
