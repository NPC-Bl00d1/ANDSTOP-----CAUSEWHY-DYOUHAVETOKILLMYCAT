var objects = [];
status = "";
video = "";

function preload(){

    video = createVideo('video.mp4');
   

}

function setup(){

    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();

}

function draw(){

    image(video, 0, 0, 480, 380);

    if(status != ""){

        objdetect.detect(video, gotResult);

        for (i = 0; i < objects.length; i++){

            document.getElementById("status").innerHTML = "Status: Object(s) detected!";
            document.getElementById("numobject").innerHTML = "Number of Objects: " + objects.length;

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

    }

}

function start(){

    objdetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object(s)";

}

function modelLoaded(){

    console.log("ModelLoaded!");

    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);

}

function gotResult(error, results){

    if(error){

        console.log(error);

    }
    console.log(results);
    objects = results;

}