const TRACK_COLOR = 'blue'
const BG_COLOR = 'black'

var canvas, canvasContext;

var blueCar = new carClass();

window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0,canvas.clientWidth, canvas.clientHeight, "black");
	colorText("Loading images", canvas.width/2, canvas.height/2, "white")

	loadImages();
}
function imageLoadingDoneSoStartGame() {

	var framesPerSecond = 30;
	setInterval(updateAll, 1000 / framesPerSecond);

	setupInput();
	blueCar.reset();
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	blueCar.move();
	carTrackHandling(blueCar);
}

function drawAll() {

	drawTracks();
	blueCar.draw();
}
