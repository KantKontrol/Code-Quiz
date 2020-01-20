//this is a js file of all the questions in the quiz


var question1 = {
    q: "JavaScript is interpreted by _________",
    ans : [ { choice: "1) Client", correct: true },
            { choice: "2) Server", correct: false },
            { choice: "3) Object", correct: false},
            { choice: "4) None of the above", correct: false}],
    used: false
}

var question2 = {
    q: "Why do JavaScript and Java have similar name?",
    ans : [ { choice: "1) JavaScript is a stripped-down version of Java", correct: false },
            { choice: "2) JavaScript's syntax is loosely based on Java's", correct: true },
            { choice: "3) They both originated on the island of Java", correct: false},
            { choice: "4) None of the above", correct: false}],
    used: false
}

var question3 = {
    q: "What are variables used for in JavaScript Programs?",
    ans : [ { choice: "1) Storing numbers, dates, or other values", correct: true },
            { choice: "2) Varying randomly", correct: false },
            { choice: "3) Causing high-school algebra flashbacks", correct: false},
            { choice: "4) None of the above", correct: false}],
    used: false
}

var qArray = [];

function setQuestionArray(){
    for(var i = 1; window["question" + i] !== undefined;i++){
        qArray.push(window["question" + i]);
    }
}





