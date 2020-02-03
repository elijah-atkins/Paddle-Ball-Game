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