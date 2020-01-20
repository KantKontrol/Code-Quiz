

var timerDisplay = document.getElementById("timer");
var quizTimer;

var quizNotComplete;
var currentQuestion;
var correctAnswer;

var quizTime = 60;

var qDisplay = document.getElementById("qAsk");

var buttons = document.getElementsByClassName("qBtn");


//hides quiz window to start
document.getElementById("quiz").style.display = "none";


document.getElementById("startBtn").addEventListener("click", function(){
    startQuiz();

});

function startQuizTimer(){

    quizTime = 60;

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
    addButtonListener();
    loadQuestion();

        

    


}

function addButtonListener(){

    for(var i = 0; i < buttons.length; i++){

        buttons[i].addEventListener("click", function(){

            var userChoice = event.target.innerHTML;
        
            if(userChoice == correctAnswer){
                choseCorrect();
            }
            else if(userChoice != correctAnswer){
                choseWrong();
            }
    
        })
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

    var newQuestion = qArray[ran];

    qArray.splice(ran);
    console.log("got question");
    return newQuestion;
}

function displayQuestion(question){


    qDisplay.innerHTML = question.q;

    for(var i = 0;i < buttons.length;i++){
        buttons[i].append(question.ans[i].choice);

        if(question.ans[i].correct){
            correctAnswer = question.ans[i].choice;
        }
    }


    console.log("display question");
}

function choseCorrect(){

}

function choseWrong(){

}




