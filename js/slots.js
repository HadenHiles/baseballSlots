/**
 * Created with IntelliJ IDEA.
 * User: HandsHiles
 * Date: 2014-10-31
 * Time: 11:46 AM
 * File Name: slots.js
 * Author: Haden Hiles
 * Last Modified by: Haden Hiles
 * Description: This program is a slot machine with baseball themed design
 * and objectives.
 * Revision History: https://github.com/HadenHiles/baseballSlots/commits/master
 */
//Global variables
var canvas = document.getElementById("slotStage");
var stage;
var queue;
var progress;
var playerMoney = 1000;
var winnings = 0;
var jackpot = 1000;
var pitches = 0;
var playerBet = "Bet";
var winNumber = 0;
var lossNumber = 0;
var betLine;
var winRatio = 0;
var strikes = 0;
var popFlies = 0;
var singles = 0;
var doubles = 0;
var triples = 0;
var homeRuns = 0;
var groundRollDoubles = 0;
var runs = 0;
var outs = 0;
var inning = 1;

//Initialize the stage and retrieve the assets to be used in the game
function init(){
    stage = new createjs.Stage(canvas);

    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", handleComplete);

    queue.setMaxConnections(20);
    queue.loadManifest([
        //images
        {src:  "assets/images/bg.jpg", id: "bg"},
        {src:  "assets/images/slotBg.png", id: "slotBg"},
        {src: "assets/images/largeTextBox.png", id: "moneyTextBox"},
        {src: "assets/images/smallTextBox.png", id: "runsBox"},
        {src: "assets/images/smallTextBox.png", id: "outsBox"},
        {src: "assets/images/pitchButton.png", id: "pitchButton"},
        {src: "assets/images/resetButton.png", id: "resetGame"},
        {src: "assets/images/bet-up.png", id: "betUp"},
        {src: "assets/images/bet-down.png", id: "betDown"},
        {src: "assets/images/smallTextBox.png", id: "betBox"},
        {src: "assets/images/close.png", id: "close"},
        {src: "assets/images/blank-m.png", id: "blank"},
        {src: "assets/images/strike.png", id: "strike"},
        {src: "assets/images/homerun.png", id: "homerun"},
        {src: "assets/images/single.png", id: "single"},
        {src: "assets/images/double.png", id: "double"},
        {src: "assets/images/triple.png", id: "triple"},
        {src: "assets/images/popfly.png", id: "popfly"},
        {src: "assets/images/groundrolldouble.png", id: "groundrolldouble"},
        //sounds
        {src: "assets/sounds/organ.mp3", id: "organ"},
        {src: "assets/sounds/playball.mp3", id: "playball"},
        {src: "assets/sounds/pitch.mp3", id: "pitch"},
        {src: "assets/sounds/hit.mp3", id: "hit"},
        {src: "assets/sounds/out.mp3", id: "out"},
        {src: "assets/sounds/strike3.mp3", id: "strike3"},
        {src: "assets/sounds/cheer.mp3", id: "cheer"},
        {src: "assets/sounds/crowd.mp3", id: "crowd"},
        {src: "assets/sounds/boo.mp3", id: "boo"}
    ]);
}

//Main function to execute the game functions
function handleComplete(event){
    //play introduction sounds
    createjs.Sound.play('organ');
    setTimeout( function(){createjs.Sound.play('playball')}, 11600 );

    //create text objects
    var moneyLabel = new createjs.Text("Money", "bold 18px Arial", "#fff");
    var runsLabel = new createjs.Text("Runs", "bold 18px Arial", "#fff");
    var runsNumber = new createjs.Text(runs, "bold 34px Arial", "#fff");
    var outsLabel = new createjs.Text("Outs", "bold 18px Arial", "#fff");
    var outsNumber = new createjs.Text(outs, "bold 34px Arial", "#fff");
    var playerBetAmount = new createjs.Text("Bet", "bold 34px Arial", "#fff");
    var playerStats = new createjs.Text("Jackpot: $" + jackpot
        + "\nPitches: " + pitches
        + "\nWins: " + winNumber
        + "\nLosses: " + lossNumber
        + "\nWinnings: $" + winnings
        + "\nWin Ratio: " + winRatio + "%"
        + "\nInning: " + inning + "/3"
        , "bold 18px Arial", "#fff");

    //create image objects
    var bg = new createjs.Bitmap(queue.getResult("bg"));
    var slotBg = new createjs.Bitmap(queue.getResult("slotBg"));
    var reel1 = new createjs.Bitmap(queue.getResult("blank"));
    var reel2 = new createjs.Bitmap(queue.getResult("blank"));
    var reel3 = new createjs.Bitmap(queue.getResult("blank"));
    var moneyTextBox = new createjs.Bitmap(queue.getResult("moneyTextBox"));
    var money = new createjs.Text(playerMoney, "bold 34px Arial", "#fff");
    var runsBox = new createjs.Bitmap(queue.getResult("runsBox"));
    var outsBox = new createjs.Bitmap(queue.getResult("outsBox"));
    var pitchButton = new createjs.Bitmap(queue.getResult("pitchButton"));
    var resetGame = new createjs.Bitmap(queue.getResult('resetGame'));
    var betUp = new createjs.Bitmap(queue.getResult("betUp"));
    var betDown = new createjs.Bitmap(queue.getResult("betDown"));
    var betBox = new createjs.Bitmap(queue.getResult("betBox"));
    var close = new createjs.Bitmap(queue.getResult("close"));

    //position objects
    slotBg.x += 80;
    slotBg.y += 85;
    reel3.x += 292;
    reel3.y += 152;
    reel2.x += 190;
    reel2.y += 152;
    reel1.x += 95;
    reel1.y += 152;
    moneyTextBox.x += 182;
    moneyTextBox.y += 45;
    moneyLabel.x += 209;
    moneyLabel.y += 22;
    money.x += 188;
    money.y += 46;
    runsBox.x += 85;
    runsBox.y += 45;
    runsLabel.x += 96;
    runsLabel.y += 22;
    runsNumber.x += 91;
    runsNumber.y += 46;
    outsBox.x += 320;
    outsBox.y += 45;
    outsLabel.x += 335;
    outsLabel.y += 22;
    outsNumber.x += 326;
    outsNumber.y += 45;
    pitchButton.x += 325;
    pitchButton.y += 305;
    resetGame.x += 280;
    resetGame.y += 305;
    betUp.x += 82;
    betUp.y += 305;
    betDown.x += 122;
    betDown.y += 305;
    betBox.x += 165;
    betBox.y += 305;
    playerBetAmount.x += 171;
    playerBetAmount.y += 306;
    playerStats.x += 410;
    playerStats.y += 85;
    close.x += 590;
    close.y += 10;

    //Display objects
    stage.addChild(bg);
    stage.addChild(reel3);
    stage.addChild(reel2);
    stage.addChild(reel1);
    stage.addChild(slotBg);
    stage.addChild(moneyTextBox);
    stage.addChild(moneyLabel);
    stage.addChild(money);
    stage.addChild(runsBox);
    stage.addChild(runsLabel);
    stage.addChild(runsNumber);
    stage.addChild(outsBox);
    stage.addChild(outsLabel);
    stage.addChild(outsNumber);
    stage.addChild(pitchButton);
    stage.addChild(resetGame);
    stage.addChild(betUp);
    stage.addChild(betDown);
    stage.addChild(betBox);
    stage.addChild(playerBetAmount);
    stage.addChild(playerStats);
    stage.addChild(close);

    //Assign click handlers to the various buttons
    betUp.on("click", increaseBet, false);
    betDown.on("click", decreaseBet, false);
    pitchButton.on("click", pitch, false);
    resetGame.on("click", resetAll, false);
    close.on("click", closeGame, false);

    //Close the game
    function closeGame(){
        window.location.href = "http://haden.moonrockfamily.ca";
    }

    /* When the player clicks the pitch button, and all requirements are met, the game starts */
    function pitch() {
        winnings = 0;
        if (playerMoney == 0) {
            if (confirm("Game over! \nDo you want to play again?")) {
                resetAll();
                updatePlayerStats();
            }
        }
        else if (outs == 3 && inning < 3) {
            alert("Nice inning! Keep it up!");
            outs = 0;
            inning++;
            updatePlayerStats();
        }
        else if(outs == 3 && inning >= 3){
            createjs.Sound.play("crowd");
            if (confirm("Good Game! \nDo you want to play again?")) {
                resetAll();
            } else{
                window.location.href = "http://haden.moonrockfamily.ca";
            }
            createjs.Sound.stop("crowd");
        }
        else if (playerBet > playerMoney) {
            alert("You don't have enough Money to place that bet.");
        }
        else if (playerBet == 'Bet') {
            alert("Please select a bet amount!.");
        }
        else if (playerBet <= playerMoney) {
            createjs.Sound.play("pitch");
            betLine = getBetLine();
            //UPDATE THE REEL IMAGES
            stage.removeChild(reel3);
            stage.removeChild(reel2);
            stage.removeChild(reel1);
            stage.removeChild(slotBg);
            reel1 = new createjs.Bitmap(queue.getResult(betLine[0]));
            reel2 = new createjs.Bitmap(queue.getResult(betLine[1]));
            reel3 = new createjs.Bitmap(queue.getResult(betLine[2]));
            slotBg = new createjs.Bitmap(queue.getResult("slotBg"));
            //position bitmaps
            slotBg.x += 80;
            slotBg.y += 85;
            reel3.src = queue.getResult(betLine[2]);
            reel3.x += 292;
            reel3.y += 152;
            reel2.x += 190;
            reel2.y += 152;
            reel1.x += 95;
            reel1.y += 152;
            //Display bitmaps
            stage.addChild(reel3);
            stage.addChild(reel2);
            stage.addChild(reel1);
            stage.addChild(slotBg);

            determineWinnings();
            pitches++;
            updatePlayerStats();
        }
        else {
            alert("Please enter a valid bet amount");
        }
    }

    function increaseBet(){
        stage.removeChild(playerBetAmount);
        if(playerBet == "Bet"){
            playerBet = 1;
        } else if(playerBet < 10){
            playerBet = playerBet + 1;
        }
        playerBetAmount = new createjs.Text(playerBet, "bold 34px Arial", "#fff");
        playerBetAmount.x += 171;
        playerBetAmount.y += 306;
        stage.addChild(playerBetAmount);
    }
    function decreaseBet(){
        stage.removeChild(playerBetAmount);
        if(playerBet == "Bet"){
            playerBet = 1;
        } else if(playerBet > 1 && playerBet != "Bet"){
            playerBet = playerBet - 1;
        }
        playerBetAmount = new createjs.Text(playerBet, "bold 34px Arial", "#fff");
        playerBetAmount.x += 171;
        playerBetAmount.y += 306;
        stage.addChild(playerBetAmount);
    }

    /* Utility function to show Player Stats */
    function updatePlayerStats()
    {
        var winRatio = (winNumber/pitches * 100).toFixed(0);

        //update the player stats
        stage.removeChild(playerStats);
        playerStats = new createjs.Text("Jackpot: $" + jackpot
            + "\nPitches: " + pitches
            + "\nWins: " + winNumber
            + "\nLosses: " + lossNumber
            + "\nWinnings: $" + winnings
            + "\nWin Ratio: " + winRatio + "%"
            + "\nInning: " + inning + "/3"
            , "bold 18px Arial", "#fff");
        playerStats.x += 410;
        playerStats.y += 85;
        stage.addChild(playerStats);

        //update the player money text
        stage.removeChild(money);
        money = new createjs.Text(playerMoney, "bold 34px Arial", "#fff");
        money.x += 188;
        money.y += 46;
        stage.addChild(money);

        //update the number of runs
        stage.removeChild(runsNumber);
        runsNumber = new createjs.Text(runs, "bold 34px Arial", "#fff");
        runsNumber.x += 91;
        runsNumber.y += 45;
        stage.addChild(runsNumber);

        //update the number of outs
        stage.removeChild(outsNumber);
        outsNumber = new createjs.Text(outs, "bold 34px Arial", "#fff");
        outsNumber.x += 326;
        outsNumber.y += 45;
        stage.addChild(outsNumber);
    }

    /* Utility function to reset all fruit tallies */
    function resetTally() {
        strikes = 0;
        singles = 0;
        doubles = 0;
        triples = 0;
        popFlies = 0;
        groundRollDoubles = 0;
        homeRuns = 0;
    }

    /* Utility function to reset the player stats */
    function resetAll() {
        //play introduction sounds
        createjs.Sound.play("playball");

        playerMoney = 1000;
        winnings = 0;
        jackpot = 1000;
        pitches = 0;
        playerBet = "Bet";
        winNumber = 0;
        lossNumber = 0;
        winRatio = 0;
        runs = 0;
        outs = 0;
        inning = 1;

        stage.removeChild(playerBetAmount);
        playerBetAmount = new createjs.Text(playerBet, "bold 34px Arial", "#fff");
        playerBetAmount.x += 171;
        playerBetAmount.y += 306;
        stage.addChild(playerBetAmount);

        playerMoney += winnings;
        stage.removeChild(playerStats);
        playerStats = new createjs.Text("Jackpot: $" + jackpot
            + "\nPitches: " + pitches
            + "\nWins: " + winNumber
            + "\nLosses: " + lossNumber
            + "\nWinnings: $" + winnings
            + "\nWin Ratio: " + winRatio + "%"
            + "\nInning: " + inning + "/3"
            , "bold 18px Arial", "#fff");
        playerStats.x += 410;
        playerStats.y += 85;
        stage.addChild(playerStats);

        stage.removeChild(money);
        money = new createjs.Text(playerMoney, "bold 34px Arial", "#fff");
        money.x += 188;
        money.y += 46;
        stage.addChild(money);

        //update the number of runs
        stage.removeChild(runsNumber);
        runsNumber = new createjs.Text("0", "bold 34px Arial", "#fff");
        runsNumber.x += 91;
        runsNumber.y += 45;
        stage.addChild(runsNumber);

        //update the number of outs
        stage.removeChild(outsNumber);
        outsNumber = new createjs.Text("0", "bold 34px Arial", "#fff");
        outsNumber.x += 326;
        outsNumber.y += 45;
        stage.addChild(outsNumber);

        //UPDATE THE REEL IMAGES
        stage.removeChild(reel3);
        stage.removeChild(reel2);
        stage.removeChild(reel1);
        stage.removeChild(slotBg);
        reel1 = new createjs.Bitmap(queue.getResult("blank"));
        reel2 = new createjs.Bitmap(queue.getResult("blank"));
        reel3 = new createjs.Bitmap(queue.getResult("blank"));
        slotBg = new createjs.Bitmap(queue.getResult("slotBg"));
        //position bitmaps
        slotBg.x += 80;
        slotBg.y += 85;
        reel3.x += 292;
        reel3.y += 152;
        reel2.x += 190;
        reel2.y += 152;
        reel1.x += 95;
        reel1.y += 152;
        //Display bitmaps
        stage.addChild(reel3);
        stage.addChild(reel2);
        stage.addChild(reel1);
        stage.addChild(slotBg);
    }


    /* Check to see if the player won the jackpot */
    function checkJackPot() {
        /* compare two random values */
        var jackPotTry = Math.floor(Math.random() * 51 + 1);
        var jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            alert("You Won the $" + jackpot + " Jackpot!!");
            playerMoney += jackpot;
            jackpot = 1000;
        }
    }

    /* Utility function to show a win message and increase player money */
    function showWinMessage() {
        playerMoney += winnings;
        stage.removeChild(playerStats);
        playerStats = new createjs.Text("Jackpot: " + jackpot
            + "\nPitches: " + pitches
            + "\nWins: " + winNumber
            + "\nLosses: " + lossNumber
            + "\nWinnings: " + winnings
            + "\nWin Ratio: " + winRatio + "%"
            + "\nInning: " + inning + "/3"
            , "bold 18px Arial", "#fff");
        playerStats.x += 410;
        playerStats.y += 85;
        stage.addChild(playerStats);
        resetTally();
        checkJackPot();
    }

    /* Show a loss message and reduce player money */
    function showLossMessage() {
        playerMoney -= playerBet;
        resetTally();
    }

    /* Check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else {
            return !value;
        }
    }

    /* When this function is called it determines the betLine results. */
    function getBetLine() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];

        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 22):  // 41.5% probability
                    betLine[spin] = "strike";
                    strikes++;
                    break;
                case checkRange(outCome[spin], 23, 37): // 15.4% probability
                    betLine[spin] = "single";
                    singles++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "double";
                    doubles++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "popfly";
                    popFlies++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "triple";
                    triples++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "popfly";
                    popFlies++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "groundrolldouble";
                    groundRollDoubles++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "homerun";
                    homeRuns++;
                    break;
            }
        }
        return betLine;
    }

    /* This function calculates the player's winnings, if any,
     * and determines what runs were scored or if any outs occurred
     */
    function determineWinnings()
    {
        if(strikes == 3) {
            outs++;
            lossNumber++;
            createjs.Sound.play("strike3");
            showLossMessage();
        }
        else if(popFlies == 3) {
            outs++;
            lossNumber++;
            createjs.Sound.play("out");
            showLossMessage();
        }
        else if (singles == 3) {
            runs++;
            winnings = playerBet * 10;
            winNumber++;
            createjs.Sound.play("hit");
            showWinMessage();
        }
        else if(doubles == 3) {
            runs = runs + 2;
            winnings = playerBet * 20;
            winNumber++;
            createjs.Sound.play("hit");
            showWinMessage();
        }
        else if (triples == 3) {
            runs = runs + 3;
            winnings = playerBet * 30;
            winNumber++;
            createjs.Sound.play("hit");
            showWinMessage();
        }
        else if (homeRuns == 3) {
            runs = runs + 4;
            winnings = playerBet * 100;
            winNumber++;
            createjs.Sound.play("cheer");
            showWinMessage();
        }
        else if(groundRollDoubles == 3){
            runs = runs + 2;
            winnings = playerBet * 20;
            winNumber++;
            createjs.Sound.play("hit");
            showWinMessage();
        }
        else if (homeRuns == 1) {
            runs++;
            winnings = playerBet * 10;
            winNumber++;
            createjs.Sound.play("cheer");
            showWinMessage();
        }
        else if (homeRuns == 2) {
            runs = runs + 3;
            winnings = playerBet * 10;
            winNumber++;
            createjs.Sound.play("cheer");
            showWinMessage();
        }
        else {
            lossNumber++;
            jackpot = jackpot + playerBet;
            showLossMessage();
        }
    }

    //set a listener for the stage update
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(40);
}

//update the stage
function tick(event){
    stage.update();
}