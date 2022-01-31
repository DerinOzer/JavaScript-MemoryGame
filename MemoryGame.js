var tileImages = [];
var startButton = document.getElementById('start');
var tileArray = [];
var gameStarted = false;
var gameBoard = document.getElementById('gameboard');
var cardFlipped = -1;
var tileFlippedOver = [];
var timer='';
var playLockout = false;
var message = document.getElementById('message');

startButton.addEventListener('click', startNewGame);

function buildArray(){
    for(var i = 1; i<7 ; i++){
        tileImages.push(i+'.jpg');
    }
}
        

function startNewGame(){
    startButton.style.display = 'none'; //Start button should disappear when a new game begins.
    if(!gameStarted){
        gameStarted = true;
        buildArray();
        tileArray = tileImages.concat(tileImages);
        createRandomArray(tileArray);
        buildBoard();
    }
}

function createRandomArray(array){
    for (var i = array.length-1;i>0;i--){
        var temp = Math.floor(Math.random()*(i+1));
        var currentValue = array[i];
        array[i] = array[temp];
        array[temp] = currentValue;
    }
    return array;
}

function buildBoard() {
    var html = "";
    for (var i = 0; i <= (tileArray.length - 1); i++) {
        html += '<div class="gameTile">';
        html += '<img id="cards' + i + '" src="Images/background.jpg" onclick="chooseCard(' + i + ',this)" class="flipImage"></div>';
    }
    gameBoard.innerHTML = html;
}

function inArray(value,array){
    if(array.indexOf(value)!=-1){
        return true;
    }

}

function hideCard(){
    for(var i=0;i<2;i++){
        var valueID = tileFlippedOver.pop();
        document.getElementById(valueID).src = "Images/background.jpg"
    }    
    clearInterval(timer);
    playLockout = false;
    cardFlipped = -1;
}

function sourceOfImage(value){
    var value = document.getElementById(value).src;
    return value;
}

function endOfGame(){ // Should be able to restart everything.
    startButton.style.display = 'block';
    gameStarted = false;
    tileImages = [];
    tileFlippedOver = [];
    cardFlipped = -1;
    playLockout = false;
}

function chooseCard(tileIndex,thisObject){
    if(!inArray(thisObject.id, tileFlippedOver) && !playLockout){
        if(cardFlipped >= 0){ //For the second card.
            thisObject.src = "Images/"+tileArray[tileIndex];
            tileFlippedOver.push(thisObject.id);
            playLockout = true;
            if(sourceOfImage(tileFlippedOver[tileFlippedOver.length-1])== sourceOfImage(tileFlippedOver[tileFlippedOver.length-2])){
                playLockout = false;
                cardFlipped = -1;
                if(tileFlippedOver.length == tileArray.length){
                    endOfGame();
                }

            }else{
                timer = setInterval(hideCard, 1000);

            }
        }else{ //For the first card.
            cardFlipped = tileIndex;
            thisObject.src = "Images/"+tileArray[tileIndex];
            tileFlippedOver.push(thisObject.id);
        }
    }
}
