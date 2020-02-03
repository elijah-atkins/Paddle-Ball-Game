var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var carPic = document.createElement("img");
var goalPic = document.createElement("img");
var grassPic = document.createElement("img");
var edgePic = document.createElement("img");

var picsToLoad = 0; // set automatically based on imageList length

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if(picsToLoad == 0){
        imageLoadingDoneSoStartGame();
    }
}
function beginLoadingImage(imgVar, filename){
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = filename;
}

function loadImages(){
    var imageList = [
        {varName: carPic, theFile: "./img/player1car.png"},
        {varName: roadPic, theFile: "./img/road-tile.png"},
        {varName: wallPic, theFile: "./img/wall-tile.png"},
        {varName: goalPic, theFile: "./img/finish-tile.png"},
        {varName: grassPic, theFile: "./img/grass-tile.png"},
        {varName: edgePic, theFile: "./img/end-tile.png"}
        ];

    picsToLoad = imageList.length;
    for(let i=0; i<imageList.length; i++){
        beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
}