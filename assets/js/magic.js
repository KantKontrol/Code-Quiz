

var timerDisplay = document.getElementById("timer");
var quizTimer;

var quizOver = false;
var currentQuestion;
var correctAnswer;
var penalty = 10;
var showWrong = false;
var wrongButton;

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

        if(showWrong){
            timerDisplay.style.color = "red";
            showWrong = false;
        }else{
            timerDisplay.style.color = "#4aaaa5";
        }

        if(quizTime <= 0){
            clearInterval(quizTimer);
            endQuiz();
        }

        quizTime--;

    }, 1000);
}

function startQuiz(){

    

    //displays quiz
    document.getElementById("quiz").style.display = "block";
    //hides intro
    document.getElementById("intro").style.display = "none";

    quizOver = false;

    setQuestionArray();
    startQuizTimer();
    addButtonListener();
    loadQuestion();

}

function addButtonListener(){

    for(var i = 0; i < buttons.length; i++){

        buttons[i].addEventListener("click", function(){

            var userChoice = event.target.innerHTML;
        
            if(userChoice == correctAnswer){
                loadQuestion();
            }
            else if(userChoice != correctAnswer){
                choseWrong();
                showWrong = true;
            }
    
        })
    }
}

function loadQuestion(){

    var gotQuestion = false;

    while(!gotQuestion){

        currentQuestion = getQuestion();

    
        if(currentQuestion === undefined){
            gotQuestion = true;
            endQuiz();
        }
        else if(!currentQuestion.used){

            displayQuestion(currentQuestion);

            gotQuestion = true;
            console.log("not used");
        }
        
        
        console.log("loading question");
    }



}

function getQuestion(){

    var ran = Math.floor(Math.random() * qArray.length);

    if(ran > 0){
        ran--;
    }

    var newQuestion = qArray[ran];
    qArray.splice(ran, 1); //removes question from array so it is not used again
    
    console.log("got question");
    return newQuestion;
}

function displayQuestion(question){


    qDisplay.innerHTML = question.q;

    for(var i = 0;i < buttons.length;i++){
        buttons[i].innerHTML = question.ans[i].choice;

        if(question.ans[i].correct){
            correctAnswer = question.ans[i].choice;
        }
    }


    console.log("display question");
}

function choseWrong(){

    quizTime-=penalty; //apllies penalty to time for answering incorrectly
    timerDisplay.innerHTML = "Time: " + quizTime;
}

function endQuiz(){
        //hides quiz
        document.getElementById("quiz").style.display = "none";
        //displays intro -- later will have to be highscores
        document.getElementById("intro").style.display = "block";
}




