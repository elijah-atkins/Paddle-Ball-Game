var carPic = document.createElement("img");
var carPicLoaded = false;

var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.8;
const REVERSE_POWER = 0.6;
const TURN_RATE = .01;
const SPEED_LIMIT = 8;
const BREAK_LIMIT = -2;
