var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

//checking whether the keyboard key has been pressed if yes then the game has started and calling the nextSequence function
$(document).keydown(function(){
    if(!started){
        // $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){ //checking which button is clicked
    var userChosenColour = $(this).attr("id"); //to get the id of the button which is clicked
    userClickedPattern.push(userChosenColour); //inserting the color name which is clicked and inserting it inside the variable userClickedPattern in the line 2
    playSound(userChosenColour); //calling the function playsound with parameter which is the name of the color
    animatePress(userChosenColour); //calling the function animatePress with parameter which is the name of the color
    checkAnswer(userClickedPattern.length-1); //calling the function checkAnswer with parameter which is the lenght of the userClickedPattern - 1 for getting the index 
});

//function for checkAnswer
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){ //comparing the value of both the arrays on same indexes
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){ //checking whether the sequence has been completed or not
            // while(userClickedPattern.length>0){
            //     userClickedPattern.pop();
            // }
            //calling the function nextSequence after the delay of 1000 milliseconds
            setTimeout( function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        //to add the class game-over for the flash of red color
        $("body").addClass("game-over"); 
        setTimeout( function() {
            $("body").removeClass("game-over");
        }, 200);
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart"); //changing the h1 to game over
        startOver(); //calling the function startOver
    }
}

//fucntion for startOver
function startOver(){
    //reseting the values to start new game
    level = 0;
    gamePattern = [];
    started = false;
}

//for creating the next sequence
function nextSequence(){ 
    userClickedPattern = []; //resets the users pattern
    level++; // for increasing the level
    $("#level-title").text("Level " + level); //to change the title to level of the game
    var randomNumber = Math.floor(Math.random()*4); //for getting the random numbers from 0 to 3
    var randomChosenColour = buttonColours[randomNumber]; //for getting the random color from variable buttonColours in the line 1
    gamePattern.push(randomChosenColour); //inserting the values inside the gamePattern array
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //to add the flash effect in the buttonColours
    var audio = new Audio("./sounds/" + randomChosenColour + ".mp3"); //to choose the audio of which colors needs to be played
    audio.play(); //to play sound
}

//function for playing the sound
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

//function for adding the animation in the button which is clicked by the user by adding the pressed class
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}