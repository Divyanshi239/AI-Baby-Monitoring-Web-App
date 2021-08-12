status = "";
audio = "";

objects = [];

function preload()
{
    audio = loadSound("Feel It.mp3");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);    
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded() {
    console.log("Model Is Initialized!!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    
    image(video, 0, 0, 380, 380);

    /*text("Dog", 100, 75);
    fill("orange");
    stroke("red");
    noFill();
    rect(90, 60, 300, 430);


    text("Cat", 300, 110);
    fill("orange");
    noFill();
    rect(290, 90, 230, 400);*/

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            if(objects[i].label = "person")
            {
            document.getElementById("status").innerHTML = "Status: Baby Detected";
            audio.stop();
            }
            else
            {
                document.getElementById("status").innerHTML = "Status: Baby Not Detected";
                audio.play();
            }

            if(objects.length == 0)
            {
                document.getElementById("status").innerHTML = "Status: Baby Not Detected";
                audio.play();
            }
            /* document.getElementById("number_of_objects").
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            console.log(percent);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); */
        }
    }
}
