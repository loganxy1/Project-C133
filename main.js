img = "";
status = "";
objectList = [];

function preload(){
    img = loadImage("cow.jpg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status Detecting Object";
}

function modelLoaded(){
    console.log("Model loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function draw(){
    image(img, 0, 0, 640, 420);

    if(status!=""){
        for(var i=0;i<objectList.length;i++){
            stroke("cyan");
            noFill();
            rect(objectList[i].x, objectList[i].y, objectList[i].width, objectList[i].height);
            fill("black");
            stroke("black");
            textSize(20);
            percent = Math.floor(objectList[i].confidence * 100);
            text(objectList[i].label +"  "+ percent+"%", objectList[i].x + 18, objectList[i].y + 18);
            document.getElementById("status").innerHTML = "Status: Objects Detected";
        }
    }
    /*stroke("Green");
    noFill();
    rect(200, 250, 350, 100);
    text("Bench", 215, 265);
    textSize(20);

    stroke("cyan");
    noFill();
    rect(200, 90, 350, 150);
    text("Mirror", 215,105);
    textSize(20);

    stroke("coral");
    noFill();
    rect(60, 100, 80, 200);
    text("Plant", 75,115);
    textSize(20);

    stroke("firebrick");
    noFill();
    rect(275, 300, 150, 75);
    text("Sandals", 295, 315);
    textSize(20);

    stroke("midnightblue");
    noFill();
    rect(350, 235, 150, 100);
    text("Handbag", 365, 250);
    textSize(20);

    stroke("red");
    noFill();
    rect(100, 80, 250, 300);
    text("Dog", 115, 95);
    textSize(20);

    stroke("red");
    noFill();
    rect(300, 80, 250, 300);
    text("Cat", 315, 95);
    textSize(20);

    stroke("blue");
    noFill();
    rect(250, 300, 250, 100);
    text("Cup", 265, 315);
    textSize(20);*/
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objectList = results;
    }
}