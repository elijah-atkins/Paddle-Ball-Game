var carPic = document.createElement("img");
var otherCarPic = document.createElement("img");
trackPics = [];

var picsToLoad = 0; // set automatically based on imageList length

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if(picsToLoad == 0){
        imageLoadingDoneSoStartGame();
    }
}
function beginLoadingImage(imgVar, fileName){
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = fileName;
}
function loadImageForTrackCode(trackCode, fileName){
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode],fileName);
}

function loadImages(){
    var imageList = [
        {varName: carPic, theFile: "./img/player1car.png"},
        {varName: otherCarPic, theFile: "./img/red-car.png"},

        {trackType: TRACK_ROAD, theFile: "./img/road-tile.png"},
        {trackType: TRACK_WALL, theFile: "./img/wall-tile.png"},
        {trackType: TRACK_GOAL, theFile: "./img/finish-tile.png"},
        {trackType: TRACK_GRASS, theFile: "./img/grass-tile.png"},
        {trackType: TRACK_EDGE, theFile: "./img/end-tile.png"}
        ];

    picsToLoad = imageList.length;
    for(let i=0; i<imageList.length; i++){
        if(imageList[i].varName != undefined){
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        }else{
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
        }
    }
}