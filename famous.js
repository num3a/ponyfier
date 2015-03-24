if (Meteor.isServer) {

    Meteor.methods({
        findFaces : function(){
            var img = document.getElementById('takenPicture');
            var results = [];
            var tracker = new tracking.ObjectTracker(['face']);

            tracker.setStepSize(1.7);
            tracking.track(img,tracker);

            tracker.on('track',function(event){
                event.data.forEach(function(rect){
                    results.push(rect);
                    console.log('face found');
                });
            });

            return results;
        }
    });
}

var detectFace = function(){


    var img = document.getElementById('takenPicture');

    var tracker = new tracking.ObjectTracker(['face']);

    tracker.setStepSize(1.7);

    tracking.track('#takenPicture',tracker);

    var plot = function(x,y,w,h){
        var rect = document.createElement('div');
        document.querySelector('.image-container').appendChild(rect);
        rect.classList.add('rect');
        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
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
            return  Session.get('photo');
        }
    });

    Template.launchCamera.gestures({
        'tap img': function(event,template){
            console.log('touched', event);
        }
    });
    Template.launchCamera.events({

        'click button': function(event, template){
            event.preventDefault();

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
                    var img = document.getElementById('takenPicture');
                    detectFace();
                   // Meteor.call('findFaces');
                }
            };

            //MeteorCamera.getPicture(cameraOptions,cameraCallback);
            console.log('clicked',this);

            launchCamera();
        }
    });
}

var launchCamera = function () {
    MeteorCanvasCamera.initialize('cvsPhoto');

    var options =
    {
        quality: 75,
        destinationType: 0,
        sourceType: 1,
        allowEdit: true,
        encodingType: 1,
        correctOrientation: true,
        saveToPhotoAlbum: false,
        width: 640,
        height: 480
    };
    MeteorCanvasCamera.start(options);
};
if(Meteor.isCordova){


    Meteor.startup(function(){
        launchCamera();
    });
}
