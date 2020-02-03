const TRACK_COLOR = 'blue'
const BG_COLOR = 'black'

var canvas, canvasContext;


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
			if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
				trackGrid[arrayIndex] = TRACK_ROAD;
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
		carAng -= TURN_RATE * carSpeed;
	}
	if(keyHeld_TurnRight) {
		carAng += TURN_RATE * carSpeed;
	}
	carX += Math.cos(carAng) * carSpeed;
	carY += Math.sin(carAng) * carSpeed;




}

function isWallAtColRow(col, row) {
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

		if (isWallAtColRow(carTrackCol, carTrackRow)) {
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

			if (trackGrid[arrayIndex] == TRACK_WALL) {
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
