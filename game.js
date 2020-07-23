var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    if(userChosenColor === "restart" && started == false){
      $("#level-title").text("Level "+level);
      nextSequence();
      started = true;
    }else{
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userClickedPattern.length-1);
    }
});
// $(document).keypress(function(){
//   if(!started){
//     $("#level-title").text("Level "+level);
//     nextSequence();
//     started = true;
//   }
// });

// $(".btn").click(function(){
//     var userChosenColor = $(this).attr("id");
//     userClickedPattern.push(userChosenColor);
//     playSound(userChosenColor);
//     animatePress(userChosenColor);
//     checkAnswer(userClickedPattern.length-1);
// });

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong")
    playSound("wrong");
    $("body").addClass("game-red");
    setTimeout(function(){
      $("body").removeClass("game-red");
    },100);
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press Restart button to play again.");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
  },100);
}
// <!---------- Vikram Sarkar -------------!>
