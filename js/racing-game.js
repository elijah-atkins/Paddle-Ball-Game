const TRACK_COLOR = 'blue'
const BG_COLOR = 'black'

var canvas, canvasContext;


window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(updateAll, 1000 / framesPerSecond);

	setupInput();
	loadImages();
	carReset();
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	carMove();
	carTrackHandling();
}

function drawAll() {

	drawTracks();
	carDraw();
}
