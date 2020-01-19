

var timerDisplay = document.getElementById("timer");
var quizTimer;


//hide quiz
document.getElementById("quiz").style.display = "none";





document.getElementById("startBtn").addEventListener("click", function(){
    startQuiz();

});

function startQuizTimer(){
    var quizTime = 60;

    quizTimer = setInterval(function(){

        timerDisplay.innerHTML = "Time: " + quizTime;

        if(quizTime == 0){
            clearInterval(quizTimer);
        }

        quizTime--;

    }, 1000);
}

function startQuiz(){

    startQuizTimer();

    //displays quiz
    document.getElementById("quiz").style.display = "block";
    //hides intro
    document.getElementById("intro").style.display = "none";



    

}


