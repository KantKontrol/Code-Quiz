

var timerDisplay = document.getElementById("timer");
var quizTimer;

var quizNotComplete;
var currentQuestion;




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

    

    //displays quiz
    document.getElementById("quiz").style.display = "block";
    //hides intro
    document.getElementById("intro").style.display = "none";

    startQuizTimer();

    quizNotComplete = true;

    if(quizNotComplete){

        loadQuestion();

        

    }


}

function loadQuestion(){

    var gotQuestion = false;

    while(!gotQuestion){

        currentQuestion = getQuestion();

        if(!currentQuestion.used){

            displayQuestion(currentQuestion);

            gotQuestion = true;
            console.log("not used");
        }
        
        
        console.log("loading question");
    }



}

function getQuestion(){

    var ran = Math.floor(Math.random() * (qArray.length-1));
    console.log("got question");
    return qArray[ran];
}

function displayQuestion(question){

    let buttons = document.getElementsByClassName("qBtn");

    document.getElementById("qAsk").innerHTML = question.q;

    for(var i = 0;i < buttons.length;i++){
        buttons[i].append(question.ans[i].choice);
    }

    
    console.log("display question");
}




