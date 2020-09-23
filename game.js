var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userChosenColor;
var userClickedPattern = [];
var started = true;
var level = 1;

$(document).keydown(function() {

  if (started === true) {
    started = false;
    nextSequence();
  }
})


$(".btn").click(function() {
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success!");
    } else {
      playSound("wrong");
      $("h1").html("Game Over. Press Any Key to Restart.")
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)
      startOver();

    }

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }


}

function nextSequence() {
  userClickedPattern=[];
  $("#level-title").html("Level " + level++);
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut().fadeIn();
  playSound(randomChosenColor);
}



function playSound(nameOfTrack) {
  var playAudio = new Audio("sounds/" + nameOfTrack + ".mp3");
  playAudio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}


function startOver()
{
  level=0;
  gamePattern=[];
  started=true;
}
