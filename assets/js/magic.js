

var timerDisplay = document.getElementById("timer");
var quizTimer;
var quizTime = 60;

var quizOver = true;
var currentQuestion;
var correctAnswer;
var penalty = 10;
var showWrong = false;
var wrongButton;


var hsUsers = JSON.parse(window.localStorage.getItem('highscores'));

if(hsUsers == null){ //incase item doesnt exist in local storage
    hsUsers = [];
}


var qDisplay = document.getElementById("qAsk");

var buttons = document.getElementsByClassName("qBtn");

addButtonListener(); //adds listeners to qBtns

//hides quiz window to start
document.getElementById("quiz").style.display = "none";
//hides high score input
document.getElementById("hsInput").style.display = "none";
//hides highscores page
document.getElementById("highscores").style.display = "none";


document.getElementById("startBtn").addEventListener("click", function(){
    startQuiz();
});

document.getElementById("navHighscores").addEventListener("click", function(){

    if(quizOver){
        loadHighScores();
    }
    
});

document.getElementById("return").addEventListener("click", function(){
    document.getElementById("highscores").style.display = "none";
    document.getElementById("intro").style.display = "block";
});

document.getElementById("button-addon2").addEventListener("click", function(){
   var username = document.getElementById("input").value;

   document.getElementById("input").value = "";

   hsUsers.push(username);

   window.localStorage.setItem('highscores', JSON.stringify(hsUsers));

    loadHighScores();
});

function startQuizTimer(){

    quizTime = 60;

    quizTimer = setInterval(function(){

        quizTime--;

        timerDisplay.innerHTML = "Time: " + quizTime;

        if(showWrong){
            timerDisplay.style.color = "red";
            showWrong = false;
        }else{
            timerDisplay.style.color = "#4aaaa5";
        }

        if(quizTime <= 0){
            endQuiz();
        }

        console.log("quiz time " + quizTime);

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
        }
        
    }

}

function getQuestion(){ //gets random question from qArray and removes it so it is not used again

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
}

function choseWrong(){

    quizTime-=penalty; //apllies penalty to time for answering incorrectly
    timerDisplay.innerHTML = "Time: " + quizTime;
    console.log("applied penalty!" + penalty);
}

function endQuiz(){

        //stops quiz timer
        clearInterval(quizTimer);

        quizOver = true;

        quizTime = 60; //resets quiz time

        timerDisplay.innerHTML = "Time: " + quizTime; //resets color and text of quiz timer
        timerDisplay.style.color = "#4aaaa5";

        //hides quiz
        document.getElementById("quiz").style.display = "none";
        //displays intro -- later will have to be highscores
        document.getElementById("hsInput").style.display = "block";
}

function loadHighScores(){

    //hides input and shows scores
    //hides quiz window to start
    //hides quiz window to start
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("hsInput").style.display = "none";
    document.getElementById("highscores").style.display = "block";

    document.getElementById("highscores").childNodes[3].innerHTML = "";

    console.log( document.getElementById("highscores").childNodes[3]);
    

    for(var i = 0;i < hsUsers.length;i++){
        var div = document.createElement("div");

        div.setAttribute("class",  "uniform-color highscore-bar");

        div.innerHTML = hsUsers[i];

        document.getElementById("highscores").childNodes[3].appendChild(div);
    }

    
}




