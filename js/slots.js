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
        {src:  "assets/images/bg.jpg", id: "bg"},
        {src:  "assets/images/slotBg.png", id: "slotBg"},
        {src: "assets/images/largeTextBox.png", id: "largeTextBox"},
        {src: "assets/images/smallTextBox.png", id: "smallTextBoxScore"},
        {src: "assets/images/smallTextBox.png", id: "smallTextBoxOuts"},
        {src: "assets/images/pitchButton.png", id: "pitchButton"}
    ]);
}

function handleComplete(event){

    //create bitmaps for images
    var bg = new createjs.Bitmap(queue.getResult("bg"));
    var slotBg = new createjs.Bitmap(queue.getResult("slotBg"));
    var largeTextBox = new createjs.Bitmap(queue.getResult("largeTextBox"));
    var smallTextBoxScore = new createjs.Bitmap(queue.getResult("smallTextBoxScore"));
    var smallTextBoxOuts = new createjs.Bitmap(queue.getResult("smallTextBoxOuts"));
    var pitchButton = new createjs.Bitmap(queue.getResult("pitchButton"));
    //position bitmaps
    slotBg.x += 130;
    slotBg.y += 65;
    largeTextBox.x += 232;
    largeTextBox.y += 25;
    smallTextBoxScore.x += 135;
    smallTextBoxScore.y += 25;
    smallTextBoxOuts.x += 370;
    smallTextBoxOuts.y += 25;
    pitchButton.x += 355;
    pitchButton.y += 285;

    //continually update the stage
    createjs.Ticker.addEventListener("tick", tick);

    //Display bitmaps
    stage.addChild(bg);
    stage.addChild(slotBg);
    stage.addChild(largeTextBox);
    stage.addChild(smallTextBoxScore);
    stage.addChild(smallTextBoxOuts);
    stage.addChild(pitchButton);
}

function tick(event){
    stage.update();
}