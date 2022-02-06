song = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

score_LeftWrist = 0;
score_RightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(300, 250);

    video = createCapture(VIDEO);
    video.hide();   
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);   
}

function modelLoaded()
{
   console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if(score_RightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100)
        {
             document.getElementById("speed").innerHTML = "Speed = 0.5x";
             song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    
    }
   
    if(score_LeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        in_number_leftWristY = Number(leftWristY);
        remove_Decimals = floor(in_number_leftWristY);
        volume = remove_Decimals / 500;
        document.getElementById("volume").innerHTML = volume;
        song.setVolume(volume);
    }
    
}

function play()
{
    song.play();
    song.setVolume(1); 
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_LeftWrist = results[0].pose.keypoints[9].score;    
        console.log(score_LeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "LeftWristY = " + leftWristY);
        
        score_RightWrist = results[0].pose.keypoints[10].score;   
        console.log(score_RightWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + "RightWristY = " + rightWristY);
    }
}