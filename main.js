img="";
Status="";
object=[];
function preload(){
song=loadSound("alarm_clock_mild2_16.mp3");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();

objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="status: detecting objects";
}

function draw(){
image(video,0,0,380,380);
if(Status!=" "){
    R=random(255);
    G=random(255);
    B=random(255);
    objectDetector.detect(video,gotResults);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="status : objects detected";
        fill(R,G,B);
        percent=floor(object[i].confidence*100);
        text(object[i].label +" "+percent+"%",object[i].x+15,object[i].y+15);
        noFill();
        stroke(R,G,B);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
   
if(object[i].label=="person"){
    document.getElementById("baby").innerHTML="baby found";
song.stop();
}
else{
    document.getElementById("baby").innerHTML="baby not found";
    song.play();   
}
if(object.length==0){
    document.getElementById("baby").innerHTML="baby not found";
    song.play();   
}
}
}
}
function modelLoaded(){
console.log("Model Loaded!");
Status=true;

}
function gotResults(error,results){
    if(error){
     console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
