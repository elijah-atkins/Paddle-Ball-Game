var carPic = document.createElement("img");
var carPicLoaded = false;

var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.96;
const DRIVE_POWER = 0.6;
const REVERSE_POWER = 0.5;
const TURN_RATE = 0.05;
const SPEED_LIMIT = 8;
const BREAK_LIMIT = -0.1;

const TRACK_COLOR = 'blue'
const BG_COLOR = 'black'
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid = 
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
	1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
	1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
	1, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var canvas, canvasContext;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

var mouseX = 0;
var mouseY = 0;

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	// cheat / hack to test car in any position
	/*carX = mouseX;
	carY = mouseY;
	carSpeedX = 4;
	carSpeedY = -4;*/
}
function keyPressed(evt){
	switch(evt.keyCode){
		case KEY_LEFT_ARROW:
			keyHeld_TurnLeft = true;
			break;
		case KEY_RIGHT_ARROW:
			keyHeld_TurnRight = true;
			break;
		case KEY_UP_ARROW:
			keyHeld_Gas = true;
			break;
		case KEY_DOWN_ARROW:
			keyHeld_Reverse = true;
			break;
	}
//	console.log("key pressed: "+evt.keyCode)
}
function keyReleased(evt){
	switch(evt.keyCode){
		case KEY_LEFT_ARROW:
			keyHeld_TurnLeft = false;
			break;
		case KEY_RIGHT_ARROW:
			keyHeld_TurnRight = false;
			break;
		case KEY_UP_ARROW:
			keyHeld_Gas = false;
			break;
		case KEY_DOWN_ARROW:
			keyHeld_Reverse = false;
			break;
	}
//	console.log("key released: "+evt.keyCode)
}
window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(updateAll, 1000 / framesPerSecond);

	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	carPic.onload = function () {
		carPicLoaded = true;
	}
	carPic.src = "img/player1car.png";

	carReset();
}

function updateAll() {
	moveAll();
	drawAll();
}

function carReset() {
	for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			if (trackGrid[arrayIndex] == 2) {
				trackGrid[arrayIndex] = 0;
				carAng = -Math.PI/2;
				carX = eachCol * TRACK_W + TRACK_W / 2;
				carY = eachRow * TRACK_H + TRACK_H / 2;
			}
		}
	}
}

function carMove() {
	carSpeed *= GROUNDSPEED_DECAY_MULT;
	if(keyHeld_Gas && carSpeed < SPEED_LIMIT) {
		carSpeed += DRIVE_POWER;
	}
	if(keyHeld_Reverse && carSpeed > BREAK_LIMIT) {
		carSpeed -= REVERSE_POWER;
	}
	if(keyHeld_TurnLeft) {
		carAng -= TURN_RATE;
	}
	if(keyHeld_TurnRight) {
		carAng += TURN_RATE;
	}
	carX += Math.cos(carAng) * carSpeed;
	carY += Math.sin(carAng) * carSpeed;




}

function isTrackAtColRow(col, row) {
	if (col >= 0 && col < TRACK_COLS &&
		row >= 0 && row < TRACK_ROWS) {
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		return trackGrid[trackIndexUnderCoord];
	} else {
		return false;
	}
}

function carTrackHandling() {
	var carTrackCol = Math.floor(carX / TRACK_W);
	var carTrackRow = Math.floor(carY / TRACK_H);
	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

	if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
		carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {

		if (isTrackAtColRow(carTrackCol, carTrackRow)) {
			carX -= Math.cos(carAng)* carSpeed;
			carY -= Math.sin(carAng)* carSpeed;

			carSpeed *= -.5;

		} // end of track found
	} // end of valid col and row
} // end of carTrackHandling func

function moveAll() {
	carMove();

	carTrackHandling();
}

function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}

function drawTracks() {

	for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

			if (trackGrid[arrayIndex] == 1) {
				colorRect(TRACK_W * eachCol, TRACK_H * eachRow,
					TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, TRACK_COLOR);
			} // end of is this track here
		} // end of for each track
	} // end of for each row

} // end of drawTracks func

function drawAll() {
	colorRect(0, 0, canvas.width, canvas.height, BG_COLOR); // clear screen
	drawTracks();

	//colorCircle(carX,carY, 10, 'white'); // draw ball
	if (carPicLoaded) {
		drawBitmapCenteredWithRotation(carPic, carX,carY, carAng)
	}
}
function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng){
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap,-useBitmap.width/2,-useBitmap.height/2);
	canvasContext.restore();
	console.log(useBitmap.width, carPic.width)

}
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, 10, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}