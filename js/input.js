const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mouseX = 0;
var mouseY = 0;

function setupInput(){
    canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	blueCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW,KEY_LEFT_ARROW)
	redCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW,KEY_LEFT_ARROW)

}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    
}

// function keySet(keyEvent, whichCar, setTo){
// 	switch(keyEvent.keyCode){
// 		case whichCar.controlKeyLeft:
// 			whichCar.keyHeld_TurnLeft = setTo;
// 			break;
// 		case whichCar.controlKeyRight:
// 			whichCar.keyHeld_TurnRight = setTo;
// 			break;
// 		case whichCar.controlKeyUp:
// 			whichCar.keyHeld_Gas = setTo;
// 			break;
// 		case whichCar.controlKeyDown:
// 			whichCar.keyHeld_Reverse = setTo;
// 			break;
// }
function keySet(keyEvent, whichCar, setTo) {
	if(keyEvent.keyCode == whichCar.controlKeyLeft) {
		whichCar.keyHeld_TurnLeft = setTo;
	}
	if(keyEvent.keyCode == whichCar.controlKeyRight) {
		whichCar.keyHeld_TurnRight = setTo;
	}
	if(keyEvent.keyCode == whichCar.controlKeyUp) {
		whichCar.keyHeld_Gas = setTo;
	}
	if(keyEvent.keyCode == whichCar.controlKeyDown) {
		whichCar.keyHeld_Reverse = setTo;
	}
}
function keyPressed(evt){
	keySet(evt, blueCar,true);
	keySet(evt, redCar,true);

	console.log("key pressed: "+evt.keyCode)
}
function keyReleased(evt){
	keySet(evt,blueCar,false);
	keySet(evt,redCar,false);

//	console.log("key released: "+evt.keyCode)
}