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
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var pitches = 0;
var playerBet = "Bet";
var winNumber = 0;
var lossNumber = 0;
var betLine;
var winRatio = 0;
var fouls = 0;
var strikes = 0;
var popFlies = 0;
var singles = 0;
var doubles = 0;
var triples = 0;
var walks = 0;
var homeRuns = 0;
var grandSlams = 0;
var runs = 0;
var outs = 0;

function init(){
    stage = new createjs.Stage(canvas);

    queue = new createjs.LoadQueue(false);
    queue.addEventListener("complete", handleComplete);
    queue.loadManifest([
        {src:  "assets/images/bg.jpg", id: "bg"},
        {src:  "assets/images/slotBg.png", id: "slotBg"},
        {src: "assets/images/largeTextBox.png", id: "moneyTextBox"},
        {src: "assets/images/smallTextBox.png", id: "runsBox"},
        {src: "assets/images/smallTextBox.png", id: "smallTextBoxOuts"},
        {src: "assets/images/pitchButton.png", id: "pitchButton"},
        {src: "assets/images/resetButton.png", id: "resetGame"},
        {src: "assets/images/bet-up.png", id: "betUp"},
        {src: "assets/images/bet-down.png", id: "betDown"},
        {src: "assets/images/smallTextBox.png", id: "smallTextBoxBet"},
        {src: "assets/images/blank-m.png", id: "blank"},
        {src: "assets/images/strike.png", id: "strike"},
        {src: "assets/images/homerun.png", id: "homerun"},
        {src: "assets/images/single.png", id: "single"},
        {src: "assets/images/double.png", id: "double"},
        {src: "assets/images/triple.png", id: "triple"}
    ]);
}

//Main function to execute the game methods
function handleComplete(event){

    //create bitmaps for images
    var bg = new createjs.Bitmap(queue.getResult("bg"));
    var slotBg = new createjs.Bitmap(queue.getResult("slotBg"));
    var reel1 = new createjs.Bitmap(queue.getResult("blank"));
    var reel2 = new createjs.Bitmap(queue.getResult("blank"));
    var reel3 = new createjs.Bitmap(queue.getResult("blank"));
    var moneyTextBox = new createjs.Bitmap(queue.getResult("moneyTextBox"));
    var moneyLabel = new createjs.Text("Money", "bold 18px Arial", "#fff");
    var money = new createjs.Text(playerMoney, "bold 34px Arial", "#fff");
    var runsBox = new createjs.Bitmap(queue.getResult("runsBox"));
    var smallTextBoxOuts = new createjs.Bitmap(queue.getResult("smallTextBoxOuts"));
    var outsLabel = new createjs.Text("Outs", "bold 18px Arial", "#fff");
    var pitchButton = new createjs.Bitmap(queue.getResult("pitchButton"));
    var resetGame = new createjs.Bitmap(queue.getResult('resetGame'));
    var betUp = new createjs.Bitmap(queue.getResult("betUp"));
    var betDown = new createjs.Bitmap(queue.getResult("betDown"));
    var smallTextBoxBet = new createjs.Bitmap(queue.getResult("smallTextBoxBet"));
    var playerBetAmount = new createjs.Text("Bet", "bold 34px Arial", "#fff");
    var runsLabel = new createjs.Text("Runs", "bold 18px Arial", "#fff");
    var playerStats = new createjs.Text("Jackpot: " + jackpot
        + "\nPitches: " + pitches
        + "\nWins: " + winNumber
        + "\nLosses: " + lossNumber
        + "\nWin Ratio: " + winRatio + "%"
        , "bold 18px Arial", "#fff");

    //position bitmaps
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
    smallTextBoxOuts.x += 320;
    smallTextBoxOuts.y += 45;
    outsLabel.x += 335;
    outsLabel.y += 22;
    pitchButton.x += 325;
    pitchButton.y += 305;
    resetGame.x += 280;
    resetGame.y += 305;
    betUp.x += 82;
    betUp.y += 305;
    betDown.x += 122;
    betDown.y += 305;
    smallTextBoxBet.x += 165;
    smallTextBoxBet.y += 305;
    playerBetAmount.x += 171;
    playerBetAmount.y += 306;
    playerStats.x += 410;
    playerStats.y += 85;

    //Display bitmaps
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
    stage.addChild(smallTextBoxOuts);
    stage.addChild(outsLabel);
    stage.addChild(pitchButton);
    stage.addChild(resetGame);
    stage.addChild(betUp);
    stage.addChild(betDown);
    stage.addChild(smallTextBoxBet);
    stage.addChild(playerBetAmount);
    stage.addChild(playerStats);

    betUp.on("click", increaseBet, false);
    betDown.on("click", decreaseBet, false);
    pitchButton.on("click", pitch, false);
    resetGame.on("click", resetAll, false);

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
    /* When the player clicks the pitch button the game starts */
    function pitch() {
        if (playerMoney == 0)
        {
            if (confirm("Game over! \nDo you want to play again?")) {
                resetAll();
                showPlayerStats();
            }
        }
        else if (playerBet > playerMoney) {
            alert("You don't have enough Money to place that bet.");
        }
        else if (playerBet == 'Bet') {
            alert("Please select a bet amount!.");
        }
        else if (playerBet <= playerMoney) {
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
            showPlayerStats();
        }
        else {
            alert("Please enter a valid bet amount");
        }
    }

    /* Utility function to show Player Stats */
    function showPlayerStats()
    {
        var winRatio = (winNumber/pitches * 100).toFixed(2);

        stage.removeChild(playerStats);
        playerStats = new createjs.Text("Jackpot: " + jackpot
            + "\nPitches: " + pitches
            + "\nWins: " + winNumber
            + "\nLosses: " + lossNumber
            + "\nWin Ratio: " + winRatio + "%"
            , "bold 18px Arial", "#fff");
        playerStats.x += 410;
        playerStats.y += 85;
        stage.addChild(playerStats);

        stage.removeChild(money);
        money = new createjs.Text(playerMoney, "bold 34px Arial", "#fff");
        money.x += 188;
        money.y += 46;
        stage.addChild(money);
        return playerStats;
    }

    /* Utility function to reset all fruit tallies */
    function resetFruitTally() {
        fouls = 0;
        singles = 0;
        doubles = 0;
        triples = 0;
        popFlies = 0;
        walks = 0;
        homeRuns = 0;
        strikes = 0;
    }

    /* Utility function to reset the player stats */
    function resetAll() {
//        if(confirm("Are you sure you want to restart your game?")){
            playerMoney = 1000;
            winnings = 0;
            jackpot = 5000;
            pitches = 0;
            playerBet = "Bet";
            winNumber = 0;
            lossNumber = 0;
            winRatio = 0;

            stage.removeChild(playerBetAmount);
            playerBetAmount = new createjs.Text(playerBet, "bold 34px Arial", "#fff");
            playerBetAmount.x += 171;
            playerBetAmount.y += 306;
            stage.addChild(playerBetAmount);

            stage.removeChild(playerStats);
            playerStats = new createjs.Text("Jackpot: " + jackpot
                + "\nPitches: " + pitches
                + "\nWins: " + winNumber
                + "\nLosses: " + lossNumber
                + "\nWin Ratio: " + winRatio + "%"
                , "bold 18px Arial", "#fff");
            playerStats.x += 410;
            playerStats.y += 85;
            stage.addChild(playerStats);

            stage.removeChild(money);
            money = new createjs.Text(playerMoney, "bold 34px Arial", "#fff");
            money.x += 188;
            money.y += 46;
            stage.addChild(money);

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
//        }
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
        $("div#winOrLose>p").text("Nice Hit! Here's your pay-cheque: $" + winnings);
        resetFruitTally();
        checkJackPot();
    }

    /* Utility function to show a loss message and reduce player money */
    function showLossMessage() {
        playerMoney -= playerBet;
        $("div#winOrLose>p").text("You Lost!");
        resetFruitTally();
    }

    /* Utility function to check if a value falls within a range of bounds */
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
                case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                    betLine[spin] = "strike";
                    strikes++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "single";
                    singles++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "double";
                    doubles++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "strike";
                    popFlies++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "triple";
                    triples++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "strike";
                    popFlies++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "strike";
                    walks++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "homerun";
                    homeRuns++;
                    break;
            }
        }
        return betLine;
    }

    /* This function calculates the player's winnings, if any */
    function determineWinnings()
    {
        if (strikes == 0)
        {
            if (singles == 3) {
                runs++;
                winnings = playerBet * 10;
            }
            else if(doubles == 3) {
                runs = runs + 2;
                winnings = playerBet * 20;
            }
            else if (triples == 3) {
                runs = runs + 3;
                winnings = playerBet * 30;
            }
            else if (popFlies == 3) {
                winnings = playerBet * 40;
            }
            else if (walks == 3) {
                winnings = playerBet * 75;
            }
            else if (homeRuns == 3) {
                runs = runs + 4;
                winnings = playerBet * 100;
            }
            else if (singles == 2) {
                winnings = playerBet * 2;
            }
            else if (doubles == 2) {
                winnings = playerBet * 2;
            }
            else if (triples == 2) {
                runs = runs + 2;
                winnings = playerBet * 3;
            }
            else if (popFlies == 2) {
                outs++;
                winnings = playerBet * 4;
            }
            else if (homeRuns == 2) {
                runs = runs + 3;
                winnings = playerBet * 20;
            }
            else if (homeRuns == 1) {
                runs = runs + 2;
                winnings = playerBet * 5;
            }
            else {
                winnings = playerBet * 1;
            }
            winNumber++;
            showWinMessage();
        }
        else
        {
            lossNumber++;
            showLossMessage();
        }
    }

    //continually update the stage
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(40);
}

function tick(event){
    stage.update();
}