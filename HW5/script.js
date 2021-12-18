/* 
  Nicholas Simon
  Last updated: 12/17/2021 @ 9:15 pm
  Javascript file for scrabble, I learned a lot of stuff as I implemented this assignment so if I could do it over again I definitely could do it more efficiently (theres a lot of repeats / vestigial code)
  Known issues:
  You can stack tiles ontop of eachother, they won't be counted multiple times but they are reshuffled
  Moving a tile in and out of a spot will count it multiple times, theres a function i commented out at the bottom that attempted to solve this issue but it didn't work.
*/


var score = 0;
var total = 0;
var userWord = "";
var debugOn = false;
var remainingTiles = 93;
var ScrabbleTiles = [
  { "letter": 'A', "value": 1, "remaining": 9, "image": "images/Scrabble_Tile_A.jpg" }, //A
  { "letter": 'B', "value": 3, "remaining": 2, "image": "images/Scrabble_Tile_B.jpg" }, //B
  { "letter": 'C', "value": 3, "remaining": 2, "image": "images/Scrabble_Tile_C.jpg" }, //C
  { "letter": 'D', "value": 2, "remaining": 4, "image": "images/Scrabble_Tile_D.jpg" }, //D
  { "letter": 'E', "value": 1, "remaining": 12, "image": "images/Scrabble_Tile_E.jpg" }, //E
  { "letter": 'F', "value": 4, "remaining": 2, "image": "images/Scrabble_Tile_F.jpg" }, //F
  { "letter": 'G', "value": 2, "remaining": 3, "image": "images/Scrabble_Tile_G.jpg" }, //G
  { "letter": 'H', "value": 4, "remaining": 2, "image": "images/Scrabble_Tile_H.jpg" }, //H
  { "letter": 'I', "value": 1, "remaining": 9, "image": "images/Scrabble_Tile_I.jpg" }, //I
  { "letter": 'J', "value": 8, "remaining": 1, "image": "images/Scrabble_Tile_J.jpg" }, //J
  { "letter": 'K', "value": 5, "remaining": 1, "image": "images/Scrabble_Tile_K.jpg" }, //K
  { "letter": 'L', "value": 1, "remaining": 4, "image": "images/Scrabble_Tile_L.jpg" }, //L
  { "letter": 'M', "value": 3, "remaining": 2, "image": "images/Scrabble_Tile_M.jpg" }, //M
  { "letter": 'N', "value": 1, "remaining": 6, "image": "images/Scrabble_Tile_N.jpg" }, //N
  { "letter": 'O', "value": 1, "remaining": 8, "image": "images/Scrabble_Tile_O.jpg" }, //O
  { "letter": 'P', "value": 3, "remaining": 2, "image": "images/Scrabble_Tile_P.jpg" }, //P
  { "letter": 'Q', "value": 10, "remaining": 1, "image": "images/Scrabble_Tile_Q.jpg" }, //Q
  { "letter": 'R', "value": 1, "remaining": 6, "image": "images/Scrabble_Tile_R.jpg" }, //R
  { "letter": 'S', "value": 1, "remaining": 4, "image": "images/Scrabble_Tile_S.jpg" }, //S
  { "letter": 'T', "value": 1, "remaining": 6, "image": "images/Scrabble_Tile_T.jpg" }, //T
  { "letter": 'U', "value": 1, "remaining": 4, "image": "images/Scrabble_Tile_U.jpg" }, //U
  { "letter": 'V', "value": 4, "remaining": 2, "image": "images/Scrabble_Tile_V.jpg" }, //V
  { "letter": 'W', "value": 4, "remaining": 2, "image": "images/Scrabble_Tile_W.jpg" }, //W
  { "letter": 'X', "value": 8, "remaining": 1, "image": "images/Scrabble_Tile_X.jpg" }, //X
  { "letter": 'Y', "value": 4, "remaining": 2, "image": "images/Scrabble_Tile_Y.jpg" }, //Y
  { "letter": 'Z', "value": 10, "remaining": 1, "image": "images/Scrabble_Tile_Z.jpg" }, //Z
  { "letter": '_', "value": 0, "remaining": 2, "image": "images/Scrabble_Tile_Blank.jpg" }]; //Blank

let currentLetters = [' ', ' ', ' ', ' ', ' ', ' ', ' '];
let boardState = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let boardValue = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
window.onload = function () {
  newTiles();
}

$(function () {
  $("#tile1").draggable({
    revert: 'invalid'
  });
  $("#tile2").draggable({
    revert: 'invalid'
  });
  $("#tile3").draggable({
    revert: 'invalid'
  });
  $("#tile4").draggable({
    revert: 'invalid'
  });
  $("#tile5").draggable({
    revert: 'invalid'
  });
  $("#tile6").draggable({
    revert: 'invalid'
  });
  $("#tile7").draggable({
    revert: 'invalid'
  });
  $("#board1").droppable({
    drop: function (event, ui) {
      boardState[0] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[0] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 1;
      
      //updateStates();
      updateWord();
      //Found out how to snap to center from this stack exchange post:
      //https://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center


      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board2").droppable({
    drop: function (event, ui) {
      boardState[1] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[1] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 2;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board3").droppable({
    drop: function (event, ui) {
      boardState[2] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[2] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 3;
      updateWord();

      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board4").droppable({
    drop: function (event, ui) {
      boardState[3] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[3] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 4;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board5").droppable({
    drop: function (event, ui) {
      boardState[4] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[4] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 5;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board6").droppable({
    drop: function (event, ui) {
      boardState[5] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[5] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 6;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board7").droppable({
    drop: function (event, ui) {
      boardState[6] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[6] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 7;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board8").droppable({
    drop: function (event, ui) {
      boardState[7] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[7] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 8;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board9").droppable({
    drop: function (event, ui) {
      boardState[8] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[8] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 9;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board10").droppable({
    drop: function (event, ui) {
      boardState[9] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[9] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 10;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board11").droppable({
    drop: function (event, ui) {
      boardState[10] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[10] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 11;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board12").droppable({
    drop: function (event, ui) {
      boardState[11] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[11] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 12;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board13").droppable({
    drop: function (event, ui) {
      boardState[12] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[12] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 13;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board14").droppable({
    drop: function (event, ui) {
      boardState[13] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[13] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 14;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#board15").droppable({
    drop: function (event, ui) {
      boardState[14] = document.getElementById(ui.draggable[0].id).dataset.letter;
      boardValue[14] = parseInt(document.getElementById(ui.draggable[0].id).dataset.value);
      document.getElementById(ui.draggable[0].id).dataset.board = 15;
      updateWord();
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#rack1").droppable({
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#rack2").droppable({
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#rack3").droppable({
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#rack4").droppable({
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#rack5").droppable({
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#rack6").droppable({
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });
  $("#rack7").droppable({
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        }
      });
    }
  });

});

function reset() {
  ScrabbleTiles[0].remaining = 9;
  ScrabbleTiles[1].remaining = 2;
  ScrabbleTiles[2].remaining = 2;
  ScrabbleTiles[3].remaining = 4;
  ScrabbleTiles[4].remaining = 12;
  ScrabbleTiles[5].remaining = 2;
  ScrabbleTiles[6].remaining = 3;
  ScrabbleTiles[7].remaining = 2;
  ScrabbleTiles[8].remaining = 9;
  ScrabbleTiles[9].remaining = 1;
  ScrabbleTiles[10].remaining = 1;
  ScrabbleTiles[11].remaining = 4;
  ScrabbleTiles[12].remaining = 2;
  ScrabbleTiles[13].remaining = 6;
  ScrabbleTiles[14].remaining = 8;
  ScrabbleTiles[15].remaining = 2;
  ScrabbleTiles[16].remaining = 1;
  ScrabbleTiles[17].remaining = 6;
  ScrabbleTiles[18].remaining = 4;
  ScrabbleTiles[19].remaining = 6;
  ScrabbleTiles[20].remaining = 4;
  ScrabbleTiles[21].remaining = 2;
  ScrabbleTiles[22].remaining = 2;
  ScrabbleTiles[23].remaining = 1;
  ScrabbleTiles[24].remaining = 2;
  ScrabbleTiles[25].remaining = 1;
  ScrabbleTiles[26].remaining = 2;
  newTiles();
  score = 0;
  total = 0;
  userWord = "";
  document.getElementById('score').innerHTML = "Score : 0";
  return;
}

function newLetters() {

  let i = 0;
  for (i; i < 7; i++) {                                         //Need to return letters
    ScrabbleTiles[currentLetters[i]].remaining += 1;
  }
  newTiles();
  return;
}

function newTiles() {
  boardValue = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  boardState = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  userWord = "";
  updateWord();
  let randomNum = Math.floor(Math.random() * 26);
  ScrabbleTiles[randomNum].remaining--;
  let tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
  document.getElementById('tile1').style.backgroundImage = tempurl;
  document.getElementById('tile1').style.left = "0px";
  document.getElementById('tile1').style.top = "0px";
  document.getElementById('tile1').dataset.letter = ScrabbleTiles[randomNum].letter;
  document.getElementById('tile1').dataset.value = ScrabbleTiles[randomNum].value;
  currentLetters[0] = randomNum;


  randomNum = Math.floor(Math.random() * 26);
  while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
    randomNum = Math.floor(Math.random() * 26);
  }
  ScrabbleTiles[randomNum].remaining -= 1;
  tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
  document.getElementById('tile2').style.backgroundImage = tempurl;
  document.getElementById('tile2').style.left = "0px";
  document.getElementById('tile2').style.top = "0px";
  document.getElementById('tile2').dataset.letter = ScrabbleTiles[randomNum].letter;
  document.getElementById('tile2').dataset.value = ScrabbleTiles[randomNum].value;
  currentLetters[1] = randomNum;

  randomNum = Math.floor(Math.random() * 26);
  while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
    randomNum = Math.floor(Math.random() * 26);
  }
  ScrabbleTiles[randomNum].remaining -= 1;
  tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
  document.getElementById('tile3').style.backgroundImage = tempurl;
  document.getElementById('tile3').style.left = "0px";
  document.getElementById('tile3').style.top = "0px";
  document.getElementById('tile3').dataset.letter = ScrabbleTiles[randomNum].letter;
  document.getElementById('tile3').dataset.value = ScrabbleTiles[randomNum].value;
  currentLetters[2] = randomNum;

  randomNum = Math.floor(Math.random() * 26);
  while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
    randomNum = Math.floor(Math.random() * 26);
  }
  ScrabbleTiles[randomNum].remaining -= 1;
  tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
  document.getElementById('tile4').style.backgroundImage = tempurl;
  document.getElementById('tile4').style.left = "0px";
  document.getElementById('tile4').style.top = "0px";
  document.getElementById('tile4').dataset.letter = ScrabbleTiles[randomNum].letter;
  document.getElementById('tile4').dataset.value = ScrabbleTiles[randomNum].value;
  currentLetters[3] = randomNum;

  randomNum = Math.floor(Math.random() * 26);
  while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
    randomNum = Math.floor(Math.random() * 26);
  }
  ScrabbleTiles[randomNum].remaining -= 1;
  tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
  document.getElementById('tile5').style.backgroundImage = tempurl;
  document.getElementById('tile5').style.left = "0px";
  document.getElementById('tile5').style.top = "0px";
  document.getElementById('tile5').dataset.letter = ScrabbleTiles[randomNum].letter;
  document.getElementById('tile5').dataset.value = ScrabbleTiles[randomNum].value;
  currentLetters[4] = randomNum;

  randomNum = Math.floor(Math.random() * 26);
  while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
    randomNum = Math.floor(Math.random() * 26);
  }
  ScrabbleTiles[randomNum].remaining -= 1;
  tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
  document.getElementById('tile6').style.backgroundImage = tempurl;
  document.getElementById('tile6').style.left = "0px";
  document.getElementById('tile6').style.top = "0px";
  document.getElementById('tile6').dataset.letter = ScrabbleTiles[randomNum].letter;
  document.getElementById('tile6').dataset.value = ScrabbleTiles[randomNum].value;
  currentLetters[5] = randomNum;

  randomNum = Math.floor(Math.random() * 26);
  while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
    randomNum = Math.floor(Math.random() * 26);
  }
  ScrabbleTiles[randomNum].remaining -= 1;
  tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
  document.getElementById('tile7').style.backgroundImage = tempurl;
  document.getElementById('tile7').style.left = "0px";
  document.getElementById('tile7').style.top = "0px";
  document.getElementById('tile7').dataset.letter = ScrabbleTiles[randomNum].letter;
  document.getElementById('tile7').dataset.value = ScrabbleTiles[randomNum].value;
  currentLetters[6] = randomNum;
  return;
}

function updateWord() {
  userWord = "";
  let i = 0;
  for (i; i < 15 && userWord == ""; i++) {
    while (boardState[i] != ' ') {
      userWord += boardState[i];
      i++;
    }
  }
  document.getElementById('word').innerHTML = userWord;
  if (debugOn == true) {
    document.getElementById('currentBoardState').innerHTML = boardState;
    document.getElementById('remainingTiles').innerHTML = remainingTiles;
    document.getElementById('currentBoardValue').innerHTML = boardValue;
  }
}

function debug() {
  debugOn = true;
  document.getElementById('currentBoardState').innerHTML = "Letters on board: " + boardState;
  document.getElementById('currentBoardValue').innerHTML = "Value of letters on board: " + boardValue;
  //document.getElementById('remainingTiles').innerHTML = remainingTiles;
}

function submitWord() {
  let i = 0;
  let double = 0;
  score = 0;
  for (i; i < 15; i++) {
    if(boardValue[i] != 0 && (i == 2 || i == 12)){
        score += boardValue[i];
        double = 1;
    }
    else if(i == 6 || i == 8){
      score += (boardValue[i] * 2);
    }
    else{
      score += boardValue[i];
    }
  }
  if(double == 1){
    score *= 2;
  }
  total += score;
  document.getElementById('score').innerHTML = "Score: " + total;
  remainingTiles = 0;
  for(i = 0; i < 26; i++){
    remainingTiles += ScrabbleTiles[i].remaining;
  }

  if(document.getElementById('tile1').dataset.board > 0){
    if(remainingTiles > 0){
      remainingTiles --;
      randomNum = Math.floor(Math.random() * 26);
      while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
        randomNum = Math.floor(Math.random() * 26);
      }
      ScrabbleTiles[randomNum].remaining -= 1;
      tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
      document.getElementById('tile1').style.backgroundImage = tempurl;
      document.getElementById('tile1').style.left = "0px";
      document.getElementById('tile1').style.top = "0px";
      document.getElementById('tile1').dataset.letter = ScrabbleTiles[randomNum].letter;
      document.getElementById('tile1').dataset.value = ScrabbleTiles[randomNum].value;
    }
  }
  document.getElementById('tile1').dataset.board = 0;
  if(document.getElementById('tile2').dataset.board > 0){
    if(remainingTiles > 0){
      remainingTiles --;
      randomNum = Math.floor(Math.random() * 26);
      while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
        randomNum = Math.floor(Math.random() * 26);
      }
      ScrabbleTiles[randomNum].remaining -= 1;
      tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
      document.getElementById('tile2').style.backgroundImage = tempurl;
      document.getElementById('tile2').style.left = "0px";
      document.getElementById('tile2').style.top = "0px";
      document.getElementById('tile2').dataset.letter = ScrabbleTiles[randomNum].letter;
      document.getElementById('tile2').dataset.value = ScrabbleTiles[randomNum].value;
    }
  }
  document.getElementById('tile2').dataset.board = 0;
  if(document.getElementById('tile3').dataset.board > 0){
    if(remainingTiles > 0){
      remainingTiles --;
      randomNum = Math.floor(Math.random() * 26);
      while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
        randomNum = Math.floor(Math.random() * 26);
      }
      ScrabbleTiles[randomNum].remaining -= 1;
      tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
      document.getElementById('tile3').style.backgroundImage = tempurl;
      document.getElementById('tile3').style.left = "0px";
      document.getElementById('tile3').style.top = "0px";
      document.getElementById('tile3').dataset.letter = ScrabbleTiles[randomNum].letter;
      document.getElementById('tile3').dataset.value = ScrabbleTiles[randomNum].value;
    }
  }
  document.getElementById('tile3').dataset.board = 0;
  if(document.getElementById('tile4').dataset.board > 0){
    if(remainingTiles > 0){
      remainingTiles --;
      randomNum = Math.floor(Math.random() * 26);
      while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
        randomNum = Math.floor(Math.random() * 26);
      }
      ScrabbleTiles[randomNum].remaining -= 1;
      tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
      document.getElementById('tile4').style.backgroundImage = tempurl;
      document.getElementById('tile4').style.left = "0px";
      document.getElementById('tile4').style.top = "0px";
      document.getElementById('tile4').dataset.letter = ScrabbleTiles[randomNum].letter;
      document.getElementById('tile4').dataset.value = ScrabbleTiles[randomNum].value;
    }
  }
  document.getElementById('tile4').dataset.board = 0;
  if(document.getElementById('tile5').dataset.board > 0){
    if(remainingTiles > 0){
      remainingTiles--;
      randomNum = Math.floor(Math.random() * 26);
      while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
        randomNum = Math.floor(Math.random() * 26);
      }
      ScrabbleTiles[randomNum].remaining -= 1;
      tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
      document.getElementById('tile5').style.backgroundImage = tempurl;
      document.getElementById('tile5').style.left = "0px";
      document.getElementById('tile5').style.top = "0px";
      document.getElementById('tile5').dataset.letter = ScrabbleTiles[randomNum].letter;
      document.getElementById('tile5').dataset.value = ScrabbleTiles[randomNum].value;
    }
  }
  document.getElementById('tile5').dataset.board = 0;
  if(document.getElementById('tile6').dataset.board > 0){
    if(remainingTiles > 0){
      remainingTiles --;
      randomNum = Math.floor(Math.random() * 26);
      while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
        randomNum = Math.floor(Math.random() * 26);
      }
      ScrabbleTiles[randomNum].remaining -= 1;
      tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
      document.getElementById('tile6').style.backgroundImage = tempurl;
      document.getElementById('tile6').style.left = "0px";
      document.getElementById('tile6').style.top = "0px";
      document.getElementById('tile6').dataset.letter = ScrabbleTiles[randomNum].letter;
      document.getElementById('tile6').dataset.value = ScrabbleTiles[randomNum].value;
    }
  }
  document.getElementById('tile6').dataset.board = 0;
  if(document.getElementById('tile7').dataset.board > 0){
    if(remainingTiles > 0){
      remainingTiles --;
      randomNum = Math.floor(Math.random() * 26);
      while (ScrabbleTiles[randomNum].remaining - 1 < 0) {
        randomNum = Math.floor(Math.random() * 26);
      }
      ScrabbleTiles[randomNum].remaining -= 1;
      tempurl = "url(" + ScrabbleTiles[randomNum].image + ")";
      document.getElementById('tile7').style.backgroundImage = tempurl;
      document.getElementById('tile7').style.left = "0px";
      document.getElementById('tile7').style.top = "0px";
      document.getElementById('tile7').dataset.letter = ScrabbleTiles[randomNum].letter;
      document.getElementById('tile7').dataset.value = ScrabbleTiles[randomNum].value;
    }
  }
  document.getElementById('tile7').dataset.board = 0;
  boardValue = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  boardState = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
}
/*
function updateStates(){
  if(document.getElementById('tile1').dataset.board > 0){
    boardState[document.getElementById('tile1').dataset.board - 1] = document.getElementById('tile1').dataset.letter;
    boardValue[document.getElementById('tile1').dataset.board - 1] = document.getElementById('tile1').dataset.value;
  }
  if(document.getElementById('tile2').dataset.board > 0){
    boardState[document.getElementById('tile2').dataset.board - 1] = document.getElementById('tile2').dataset.letter;
    boardValue[document.getElementById('tile2').dataset.board - 1] = document.getElementById('tile2').dataset.value;
  }
  if(document.getElementById('tile3').dataset.board > 0){
    boardState[document.getElementById('tile3').dataset.board - 1] = document.getElementById('tile3').dataset.letter;
    boardValue[document.getElementById('tile3').dataset.board] = document.getElementById('tile3').dataset.value;
  }
  if(document.getElementById('tile4').dataset.board > 0){
    boardState[document.getElementById('tile4').dataset.board - 1] = document.getElementById('tile4').dataset.letter;
    boardValue[document.getElementById('tile4').dataset.board - 1] = document.getElementById('tile4').dataset.value;
  }
  if(document.getElementById('tile5').dataset.board > 0){
    boardState[document.getElementById('tile5').dataset.board - 1] = document.getElementById('tile5').dataset.letter;
    boardValue[document.getElementById('tile5').dataset.board - 1] = document.getElementById('tile5').dataset.value;
  }
  if(document.getElementById('tile6').dataset.board > 0){
    boardState[document.getElementById('tile6').dataset.board - 1] = document.getElementById('tile6').dataset.letter;
    boardValue[document.getElementById('tile6').dataset.board - 1] = document.getElementById('tile6').dataset.value;
  }
  if(document.getElementById('tile7').dataset.board > 0){
    boardState[document.getElementById('tile7').dataset.board - 1] = document.getElementById('tile7').dataset.letter;
    boardValue[document.getElementById('tile7').dataset.board - 1] = document.getElementById('tile7').dataset.value;
  }
  if (debugOn == true) {
    document.getElementById('currentBoardState').innerHTML = boardState;
    document.getElementById('remainingTiles').innerHTML = remainingTiles;
    document.getElementById('currentBoardValue').innerHTML = boardValue;
  }
  return;
}
*/
