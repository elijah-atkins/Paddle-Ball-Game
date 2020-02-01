var ballX = 400;
var ballSpeedX = 0;
var ballY = 500;
var ballSpeedY = 5;
const BG_COLOR = 'black';
const BALL_COLOR = 'green';
const BRICK_COLOR = 'green';

const BRICK_W = 80;
const BRICK_H = 40;
const BRICK_COL = 10;
const BRICK_ROWS = 9;
const BRICK_GAP = 2;

var brickGrid = new Array(BRICK_COL * BRICK_ROWS);
var bricksLeft = 0;




var canvas, canvasContext;

var mouseX = 0;
var mouseY = 0;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;


  /* mouse cheat
  ballX = mouseX;
  ballY = mouseY;
  ballSpeedX = 4;
  ballSpeedY = -4;
  */
}
function brickReset() {
  bricksLeft = 0;
  var i;
  for(i=0;i<3 * BRICK_COL;i++){
    brickGrid[i] = false;
  }
  for (; i < BRICK_COL * BRICK_ROWS; i++) {
    brickGrid[i] = true;
    bricksLeft++;
  } // end of for each brick
} //end of brickReset
window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  canvasContext.font="bold 36px 'Zilla Slab";

  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", updateMousePos);

  brickReset();
};
function updateAll() {
  moveAll();

  drawAll();
}
function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height *.75;
}

function ballMove(){
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX > canvas.width && ballSpeedX > 0.0) {
    // right
    ballSpeedX *= -1;

  }
  if (ballX < 0 && ballSpeedX < 0.0) {
    //left
    ballSpeedX *= -1;

  }
  if (ballY < 0 && ballSpeedY < 0.0) {
    // top
    ballSpeedY *= -1;

  }
  if (ballY > canvas.height) {
    //bottom
    ballSpeedX = 0;
    ballReset();
    brickReset();
  
}
function isBrickAtColRow(col,row){
  if (
    col >= 0 && col < BRICK_COL &&
    row >= 0 && row < BRICK_ROWS) {
      var brickIndexUnderCoord = rowColToArrayIndex(col,row);
      return brickGrid[brickIndexUnderCoord];
    } else {
      return false;
    }
}
function ballBrickHandling(){
  var ballBrickCol = Math.floor(ballX / BRICK_W);
  var ballBrickRow = Math.floor(ballY / BRICK_H);
  var brickIndexUnderBall = rowColToArrayIndex(
    ballBrickCol,
    ballBrickRow
  );
  if (
    ballBrickCol >= 0 &&
    ballBrickCol < BRICK_COL &&
    ballBrickRow >= 0 &&
    ballBrickRow < BRICK_ROWS
  ) {
    if (isBrickAtColRow( ballBrickCol, ballBrickRow )) {
      brickGrid[brickIndexUnderBall] = false;
      bricksLeft--;
      //console.log(bricksLeft);

      var prevBallX = ballX - ballSpeedX;
      var prevBallY = ballY - ballSpeedY;
      var prevBrickCol = Math.floor(prevBallX / BRICK_W);
      var prevBrickRow = Math.floor(prevBallY / BRICK_H);
      
      var bothTestsFailed = true;

      if(prevBrickCol != ballBrickCol){
        if(isBrickAtColRow( prevBrickCol, ballBrickRow ) == false) {
          ballSpeedX *= -1;
          bothTestFailed = false;
        }
      }
      if(prevBrickRow != ballBrickRow){
        if(isBrickAtColRow( ballBrickCol, prevBrickRow )){
          ballSpeedY *= -1;
          bothTestFailed = false;
        }
        if(bothTestsFailed){//armpitcase prevents ball from going through diagnol
          ballSpeedY *= -1;
          ballSpeedX *= -1;
        }
      }
    } // end of brickfound
  }// end of valid col and row
}//end of function ballBrickHandling



function moveAll() {
  ballMove();

  ballBrickHandling();


}

function rowColToArrayIndex(col, row) {
  return col + BRICK_COL * row;
}

function drawBricks() {
  for (let eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < BRICK_COL; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (brickGrid[arrayIndex]) {
        colorRect(
          BRICK_W * eachCol,
          BRICK_H * eachRow,
          BRICK_W - BRICK_GAP,
          BRICK_H - BRICK_GAP,
          BRICK_COLOR
        );
      } // end of if
    } // end of for
  } //end of for each row
} // end of function
function drawAll() {
  //clear screen
  colorRect(0, 0, canvas.width, canvas.height, BG_COLOR);

  
  drawBricks();
  //draw ball
  colorCircle(ballX, ballY, 10, BALL_COLOR);
  //draw mouse cordinates
  /*
  var mouseBrickCol = Math.floor(mouseX / BRICK_W);
  var mouseBrickRow = Math.floor(mouseY / BRICK_H);
  var brickIndexUnderMouse = rowColToArrayIndex(mouseBrickCol, mouseBrickRow);
  colorText(mouseBrickCol + "," + mouseBrickRow+':'+brickIndexUnderMouse, mouseX, mouseY, "yellow"); 
  */
  }


function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}
function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();

  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
function colorText(showWords, textX, textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}