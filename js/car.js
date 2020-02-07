const GROUNDSPEED_DECAY_MULT = 0.92;
const DRIVE_POWER = 0.7;
const REVERSE_POWER = 0.6;
const TURN_RATE = .13;
const SPEED_LIMIT = 9;
const BREAK_LIMIT = -2;
const MIN_SPEED_TO_TURN = 2;

function carClass(){

	this.x = 75;
	this.y = 75;
	this.ang = 0;
	this.speed = 0;

	this.reset = function() {
		for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.ang = -Math.PI/2;
					this.x = eachCol * TRACK_W + TRACK_W / 2;
					this.y = eachRow * TRACK_H + TRACK_H / 2;
				}// end of player start if
			}//end of col for
		}//end of row for
	}//end car Reset

	this.move = function() {
		this.speed *= GROUNDSPEED_DECAY_MULT;
		if(keyHeld_Gas && this.speed < SPEED_LIMIT) {
			this.speed += DRIVE_POWER;
		}
		if(keyHeld_Reverse && this.speed > BREAK_LIMIT) {
			this.speed -= REVERSE_POWER;
		}
		if(Math.abs(this.speed)>MIN_SPEED_TO_TURN){
			if(keyHeld_TurnLeft) {
				this.ang -= TURN_RATE;
			}
			if(keyHeld_TurnRight) {
				this.ang += TURN_RATE;
			}
		}
		if(Math.abs(this.speed)<MIN_SPEED_TO_TURN){
			if(keyHeld_TurnLeft) {
				this.ang -= TURN_RATE * this.speed/2;
			}
			if(keyHeld_TurnRight) {
				this.ang += TURN_RATE * this.speed/2;
			}
		}
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(carPic, this.x,this.y, this.ang)
	}
}