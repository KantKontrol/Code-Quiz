//TODO:
//redo the way questions are pulled, game object
//make highscores neater and display nicer 
//add button to remove highscores?
//add more questions
//clean up dry code
//add music?
//add sound effects for right and wrong answers?


var timerDisplay = document.getElementById("timer");
var quizTimer;
var quizTime = 60;

var quizOver = true;
var currentQuestion;
var correctAnswer;
var penalty = 10;
var showWrong = false;
var wrongButton;

var gameObj = {
    qs: [],
    over: false,
    time: 0
}

var endTime = -1;


var hsUsers = JSON.parse(window.localStorage.getItem('highscores'));

if(hsUsers == null){ //incase item doesnt exist in local storage
    hsUsers = [];
}


var qDisplay = document.getElementById("qAsk");

var buttons = document.getElementsByClassName("qBtn");

addButtonListener(); //adds listeners to qBtns
setQuestionArray(); //puts questions from question.js into array

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

    if(gameObj.over){
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

   hsUsers.push(user = {
       name: username,
       time: endTime
   });

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

    gameObj.over = false;

    makeGameObject();
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

function setQuestionArray(){
    for(var i = 1; window["question" + i] !== undefined;i++){
        qArray.push(window["question" + i]);
    }
}

function makeGameObject(){

    let obj = {}; //creates empty object

    for(var i = 0;i < qArray.length;i++){ //fills gameObj array with empty spaces according to how many questions there are
        gameObj.qs[i] = "empty";
    }

    for(var i = 0;i < qArray.length;i++){

        let cloneQObj = Object.assign({}, qArray[i]); //clones question object in qArray and stores it in gameobjec array

        insertToGame(cloneQObj);  
    }

    console.log("gameObj array: " + gameObj.qs); //this is how you grab a question and answer
}

function insertToGame(obj){ //inserts obj to gameObj array at random empty index

    var inserted = false;

    while(!inserted){

        var ranIndex = Math.floor(Math.random() * (gameObj.qs.length));

        if(gameObj.qs[ranIndex] == "empty"){
            gameObj.qs[ranIndex] = obj;
            inserted = true;
        }
    }
}

function loadQuestion(){

        currentQuestion = getQuestion();
    
        if(currentQuestion == false){ //no question available
            endQuiz();
        }
        else if(!currentQuestion.used){
            displayQuestion(currentQuestion);
        }
}

function getQuestion(){ //gets random question from qArray and removes it so it is not used again
    
    let gotQuestion = false; 

    let gameQuestions = gameObj.qs;

    while(!gotQuestion){

        if(gameQuestions.length != 0){
            var ran = Math.floor(Math.random() * (gameQuestions.length-1));

            var newQuestion = gameObj.qs[ran];
            gameObj.qs.splice(ran, 1);

            gotQuestion = true;
        }
        else if(gameQuestions.length == 0){
            gotQuestion = true;
            return false;
        }
    }

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

        gameObj.over = true;

        endTime = quizTime;

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

        div.innerHTML = hsUsers[i].name + " Time: " + hsUsers[i].time;

        document.getElementById("highscores").childNodes[3].appendChild(div);
    }

    
}






