function main() {
    window.images = loadImages([
        ["characterIdle0", "images/character/idle/0.png"],
        ["characterIdle1", "images/character/idle/1.png"],
        ["characterIdle2", "images/character/idle/2.png"],
        ["characterIdle3", "images/character/idle/3.png"]
    ], onAllImagesLoaded = function () {
        var milliseconds = 120;
        var x = 0;
        setInterval(function () {
            Canvas.clear();
            // Character.x += 2;
            Character.renewFrame();
            Character.draw();
        }, milliseconds);
    });
}
function loadImages(names, onAllImagesLoaded) {
    var i = 0, numLoading = names.length;
    var onload = function () { return --numLoading === 0 && onAllImagesLoaded(); };
    var images = {};
    while (i < names.length) {
        var img = images[names[i][0]] = new Image;
        img.src = names[i++][1];
        img.onload = onload;
    }
    return images;
}
var Character = /** @class */ (function () {
    function Character() {
    }
    Character.renewFrame = function () {
        switch (this.sprite) {
            case "characterIdle0":
                this.sprite = "characterIdle1";
                break;
            case "characterIdle1":
                this.sprite = "characterIdle2";
                break;
            case "characterIdle2":
                this.sprite = "characterIdle3";
                break;
            case "characterIdle3":
                this.sprite = "characterIdle0";
                break;
            default:
                alert("Error " + this.sprite);
        }
    };
    Character.draw = function () {
        Canvas.context.drawImage(window.images[this.sprite], this.x, this.y);
    };
    Character.x = 0;
    Character.y = 0;
    Character.sprite = "characterIdle0";
    return Character;
}());
var Canvas = /** @class */ (function () {
    function Canvas() {
    }
    Canvas.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    Canvas.canvas = document.getElementById("canvas");
    Canvas.context = Canvas.canvas.getContext("2d");
    Canvas.width = Canvas.canvas.width;
    Canvas.height = Canvas.canvas.height;
    return Canvas;
}());
