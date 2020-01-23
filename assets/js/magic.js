//Nicholas DeRissio Code-Quiz 1/22/2020

var timerDisplay = document.getElementById("timer");
var quizTimer;
var quizTime = 60;

var questionNumber = 0;
var currentQuestion;
var correctAnswer;
var showWrong = false;
var wrongButton;

var gameObj = {
    qs: [],
    over: true,
    time: 0
}

var username = "";
var endTime = -1;
var questionsCompleted = 0;

var hsUsers = JSON.parse(window.localStorage.getItem('highscores'));

if(hsUsers == null){ //incase item doesnt exist in local storage
    hsUsers = [];
}

var qDisplay = document.getElementById("qAsk");

var buttons = document.getElementsByClassName("qBtn");

addButtonListener(); //adds listeners to qBtns
setQuestionArray(); //puts questions from question.js into array

displayThis("block", "none", "none", "none");

document.getElementById("startBtn").addEventListener("click", function(){
    startQuiz();
});

document.getElementById("navHighscores").addEventListener("click", function(){

    if(gameObj.over){
        loadHighScores();
    }  
});

document.getElementById("return").addEventListener("click", function(){
    displayThis("block", "none", "none", "none");
});

document.getElementById("resetScore").addEventListener("click", function(){
    hsUsers = [];
    window.localStorage.setItem('highscores', JSON.stringify(hsUsers));
    loadHighScores();
});

document.getElementById("button-addon2").addEventListener("click", function(){

    username = document.getElementById("input").value;

    document.getElementById("input").value = "";

    if(username != ""){
        hsUsers.push(user = {

            name: username,
            time: endTime,
            qComplete: questionsCompleted
    
        });
    }

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

    }, 1000);
}

function startQuiz(){

    displayThis("none", "block", "none", "none");

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

        currentQuestion = getQuestion(questionNumber);
    
        if(currentQuestion == false){ //no question available
            endQuiz();
        }
        else {
            displayQuestion(currentQuestion);
        }
}

function getQuestion(num){ //gets random question from qArray and removes it so it is not used again

    let gameQuestions = gameObj.qs;

    if(questionNumber != gameQuestions.length){
        questionNumber++;
        return gameQuestions[num];
    }
    else{
        return false;
    }
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

    let penalty = 10;
    quizTime-=penalty; //apllies penalty to time for answering incorrectly
    timerDisplay.innerHTML = "Time: " + quizTime;
}

function endQuiz(){

        clearInterval(quizTimer);

        gameObj.over = true;

        questionsCompleted = questionNumber + "/" + gameObj.qs.length; //sets questions completed out of the amount of questions

        questionNumber = 0; //resets current question to start

        endTime = quizTime;//stores where the user ended quiz

        quizTime = 60; //resets quiz time

        timerDisplay.innerHTML = "Time: " + quizTime; //resets color and text of quiz timer
        timerDisplay.style.color = "#4aaaa5";

        displayThis("none", "none", "block", "none"); //hides un-wanted windows
}

function loadHighScores(){

    displayThis("none", "none", "none", "block"); //hides un-wanted windows
    
    document.getElementById("highscores").childNodes[3].innerHTML = "";

    for(var i = 0;i < hsUsers.length;i++){
        var div = document.createElement("div");

        div.setAttribute("class",  "uniform-color highscore-bar");

        div.innerHTML = "--> " + hsUsers[i].name + " Completed: " + hsUsers[i].qComplete + " in " + hsUsers[i].time + " seconds";

        document.getElementById("highscores").childNodes[3].appendChild(div);
    }
}

function displayThis(intro, quiz, input, highscores){

        document.getElementById("intro").style.display = intro;
        document.getElementById("quiz").style.display = quiz;
        document.getElementById("hsInput").style.display = input;
        document.getElementById("highscores").style.display = highscores;
}






