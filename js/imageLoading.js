var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var carPic = document.createElement("img");
var carPicLoaded = false;

function carImageLoad(){
    carPic.onload = function () {
		carPicLoaded = true;
	}
	carPic.src = "./img/player1car.png";
}
function trackLoadImages(){
    roadPic.src ="./img/road-tile.png";
    wallPic.src ="./img/wall-tile.png";

}

function loadImages(){
    carImageLoad();
    trackLoadImages();
}