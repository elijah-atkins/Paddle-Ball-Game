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
    imgVar.src = "./img/"+fileName;
}
function loadImageForTrackCode(trackCode, fileName){
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode],fileName);
}

function loadImages(){
    var imageList = [
        {varName: carPic, theFile: "player1car.png"},
        {varName: otherCarPic, theFile: "red-car.png"},

        {trackType: TRACK_ROAD, theFile: "road-tile.png"},
        {trackType: TRACK_WALL, theFile: "wall-tile.png"},
        {trackType: TRACK_GOAL, theFile: "finish-tile.png"},
        {trackType: TRACK_GRASS, theFile: "grass-tile.png"},
        {trackType: TRACK_EDGE, theFile: "end-tile.png"},
        {trackType: TRACK_BOOST, theFile: "speed-tile.png"},
        {trackType: TRACK_MUD, theFile: "mud-tile.png"}
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