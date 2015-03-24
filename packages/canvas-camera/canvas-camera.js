// Write your package code here!
MeteorCanvasCamera = {
    initialize : function(canvasId){
        check(canvasId, String);

        var canvasObj = $('#' + canvasId);
        window.plugin.CanvasCamera.initialize(canvasObj);
    },

    start: function(options){
        window.CanvasCamera.start(options);
    },
    takePicture: function(callback){
        window.plugin.takePicture(callback);
    }
};

