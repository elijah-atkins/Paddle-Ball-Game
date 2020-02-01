var ballX = 400;
var ballSpeedX = 0;
var ballY = 500;
var ballSpeedY = 5;
const BG_COLOR = 'black';
const BALL_COLOR = 'green';
const TRACK_COLOR = 'green';

const TRACK_W = 80;
const TRACK_H = 40;
const TRACK_COL = 10;
const TRACK_ROWS = 9;
const TRACK_GAP = 2;

var trackGrid = new Array(TRACK_COL * TRACK_ROWS);
var tracksLeft = 0;




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
function trackReset() {
  tracksLeft = 0;
  var i;
  for(i=0;i<3 * TRACK_COL;i++){
    trackGrid[i] = false;
  }
  for (; i < TRACK_COL * TRACK_ROWS; i++) {
    trackGrid[i] = true;
    tracksLeft++;
  } // end of for each track
} //end of trackReset
window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  canvasContext.font="bold 36px 'Zilla Slab";

  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", updateMousePos);

  trackReset();
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
    trackReset();
  
}
function isTRACKAtColRow(col,row){
  if (
    col >= 0 && col < TRACK_COL &&
    row >= 0 && row < TRACK_ROWS) {
      var trackIndexUnderCoord = rowColToArrayIndex(col,row);
      return trackGrid[trackIndexUnderCoord];
    } else {
      return false;
    }
}
function ballTRACKHandling(){
  var ballTRACKCol = Math.floor(ballX / TRACK_W);
  var ballTRACKRow = Math.floor(ballY / TRACK_H);
  var trackIndexUnderBall = rowColToArrayIndex(
    ballTRACKCol,
    ballTRACKRow
  );
  if (
    ballTRACKCol >= 0 &&
    ballTRACKCol < TRACK_COL &&
    ballTRACKRow >= 0 &&
    ballTRACKRow < TRACK_ROWS
  ) {
    if (isTRACKAtColRow( ballTRACKCol, ballTRACKRow )) {
      trackGrid[trackIndexUnderBall] = false;
      tracksLeft--;
      //console.log(tracksLeft);

      var prevBallX = ballX - ballSpeedX;
      var prevBallY = ballY - ballSpeedY;
      var prevTRACKCol = Math.floor(prevBallX / TRACK_W);
      var prevTRACKRow = Math.floor(prevBallY / TRACK_H);
      
      var bothTestsFailed = true;

      if(prevTRACKCol != ballTRACKCol){
        if(isTRACKAtColRow( prevTRACKCol, ballTRACKRow ) == false) {
          ballSpeedX *= -1;
          bothTestFailed = false;
        }
      }
      if(prevTRACKRow != ballTRACKRow){
        if(isTRACKAtColRow( ballTRACKCol, prevTRACKRow )){
          ballSpeedY *= -1;
          bothTestFailed = false;
        }
        if(bothTestsFailed){//armpitcase prevents ball from going through diagnol
          ballSpeedY *= -1;
          ballSpeedX *= -1;
        }
      }
    } // end of trackfound
  }// end of valid col and row
}//end of function ballTRACKHandling



function moveAll() {
  ballMove();

  ballTRACKHandling();


}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COL * row;
}

function drawTRACKs() {
  for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (let eachCol = 0; eachCol < TRACK_COL; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (trackGrid[arrayIndex]) {
        colorRect(
          TRACK_W * eachCol,
          TRACK_H * eachRow,
          TRACK_W - TRACK_GAP,
          TRACK_H - TRACK_GAP,
          TRACK_COLOR
        );
      } // end of if
    } // end of for
  } //end of for each row
} // end of function
function drawAll() {
  //clear screen
  colorRect(0, 0, canvas.width, canvas.height, BG_COLOR);

  
  drawTRACKs();
  //draw ball
  colorCircle(ballX, ballY, 10, BALL_COLOR);
  //draw mouse cordinates
  /*
  var mouseTRACKCol = Math.floor(mouseX / TRACK_W);
  var mouseTRACKRow = Math.floor(mouseY / TRACK_H);
  var trackIndexUnderMouse = rowColToArrayIndex(mouseTRACKCol, mouseTRACKRow);
  colorText(mouseTRACKCol + "," + mouseTRACKRow+':'+trackIndexUnderMouse, mouseX, mouseY, "yellow"); 
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