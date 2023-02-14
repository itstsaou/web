function init() {
    canvas = document.getElementById("c");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    console.log("canvas resize completed");
}

(function() {
    document.addEventListener("DOMContentLoaded", function () {
        init();

        var $ = function(id){return document.getElementById(id)};

        var canvas = this.__canvas = new fabric.Canvas('c', {
            isDrawingMode: true
        });
    });
})();