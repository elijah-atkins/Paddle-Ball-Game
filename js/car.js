var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.92;
const DRIVE_POWER = 0.8;
const REVERSE_POWER = 0.6;
const TURN_RATE = .1;
const SPEED_LIMIT = 8;
const BREAK_LIMIT = -2;
const MIN_SPEED_TO_TURN = 2;

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
	if(Math.abs(carSpeed)>MIN_SPEED_TO_TURN){
		if(keyHeld_TurnLeft) {
			carAng -= TURN_RATE;
		}
		if(keyHeld_TurnRight) {
			carAng += TURN_RATE;
		}
	}
	if(Math.abs(carSpeed)<MIN_SPEED_TO_TURN){
		if(keyHeld_TurnLeft) {
			carAng -= TURN_RATE * carSpeed/2;
		}
		if(keyHeld_TurnRight) {
			carAng += TURN_RATE * carSpeed/2;
		}
	}
	carX += Math.cos(carAng) * carSpeed;
	carY += Math.sin(carAng) * carSpeed;
}

function carDraw() {
	drawBitmapCenteredWithRotation(carPic, carX,carY, carAng)
}
