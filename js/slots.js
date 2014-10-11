/**
 * Created with IntelliJ IDEA.
 * User: HandsHiles
 * Date: 2014-10-11
 * Time: 11:46 AM
 * To change this template use File | Settings | File Templates.
 */
//Global variables
var canvas = document.getElementById("slotStage");
var stage;
var queue;

function init(){
    stage = new createjs.Stage(canvas);

    queue = new createjs.LoadQueue(false);
    queue.addEventListener("complete", handleComplete);
    queue.loadManifest([
        {src:  "assets/images/bg.png", id: "bg"}
    ]);
}

function handleComplete(event){
    var bg = new createjs.Bitmap(queue.getResult("bg"));
    bg.x += 55;
    bg.y += 140;

    createjs.Tween.get(bg, {loop: true});

    createjs.Ticker.addEventListener("tick", tick);

    stage.addChild(bg);
}

function tick(event){
    stage.update();
}