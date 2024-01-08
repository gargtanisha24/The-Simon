var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;


//Step 6:- Check whenever keypress occurs. Start the game and change the h1.
$(document).keypress(function(){
    if (!started)
    $("h1").text("Level " + level);
    nextSequence();
    started=true;
});


//Step 5:- Whenever btn clicked: carry out this function.
$(".btn").click(function(){

    // Step3-Get hold of the button id clicked by the user and push it into another array.

    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //Step4:-Play sound and animation effect.
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //Index of the last color chosen(recent color.)
    checkAnswer(userClickedPattern.length-1);
});

//Step 7:-Function to check the answer
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{

        //Step 8: Play the audio, change the h1 and add the class game-over to reflect the wrong effect.
        playSound("wrong");
        $("body").addClass("game-over");

        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
    };

// Function to generate a random color effect.
function nextSequence() {

    //Whenevr function occurs, start from new array and increase the level by one.
    userClickedPattern=[];
    level+=1;
    $("h1").text("Level" + level);

    // Step 1:-Select a random color from the array and push it into another array.

    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    // Step 2:- Provides the animation effect and play the sound
    //Get hold of the button type of the color selected.
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    
};

//Function to play the sound.
function playSound(name){
    var audio=new Audio("sounds/"+ name +".mp3");
    audio.play();
};

//Function to add the animation effect to the button
function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    },100);
};




//Step 9:- Function to restart the game

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
};
