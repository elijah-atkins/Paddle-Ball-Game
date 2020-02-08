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
	this.name = "Untitled Car";
	this.myCarPic; //Which car picture to use

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey){
		this.controlKeyUp = upKey; 
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}


	this.reset = function(whichImage, carName) {
		this.name = carName;
		this.myCarPic = whichImage;
		this.speed = 0;
		this.keyHeld_Gas = false;
		this.keyHeld_Reverse = false;
		this.keyHeld_TurnLeft = false;
		this.keyHeld_TurnRight = false;
		
		for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.ang = -Math.PI/2;
					this.x = eachCol * TRACK_W + TRACK_W / 2;
					this.y = eachRow * TRACK_H + TRACK_H / 2;
					return;
				}// end of player start if
			}//end of col for
		}//end of row for
		console.log("NO PLAYER START FOUND!");
	}//end car Reset

	this.move = function() {
		this.speed *= GROUNDSPEED_DECAY_MULT;
		if(this.keyHeld_Gas && this.speed < SPEED_LIMIT) {
			this.speed += DRIVE_POWER;
		}
		if(this.keyHeld_Reverse && this.speed > BREAK_LIMIT) {
			this.speed -= REVERSE_POWER;
		}
		if(Math.abs(this.speed)>MIN_SPEED_TO_TURN){
			if(this.keyHeld_TurnLeft) {
				this.ang -= TURN_RATE;
			}
			if(this.keyHeld_TurnRight) {
				this.ang += TURN_RATE;
			}
		}
		if(Math.abs(this.speed)<MIN_SPEED_TO_TURN){
			if(this.keyHeld_TurnLeft) {
				this.ang -= TURN_RATE * this.speed/2;
			}
			if(this.keyHeld_TurnRight) {
				this.ang += TURN_RATE * this.speed/2;
			}
		}
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;

		carTrackHandling(this);
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.x,this.y, this.ang)
	}
}