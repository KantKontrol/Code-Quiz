//this is a js file of all the questions in the quiz


var question1 = {
    q: "JavaScript is interpreted by _________",
    ans : [ { choice: "Client", correct: true },
            { choice: "Server", correct: false },
            { choice: "Object", correct: false},
            { choice: "None of the above", correct: false}],
    used: false
}

var question2 = {
    q: "Why so JavaScript and Java have similar name?",
    ans : [ { choice: "JavaScript is a stripped-down version of Java", correct: false },
            { choice: "JavaScript's syntax is loosely based on Java's", correct: true },
            { choice: "They both originated on the island of Java", correct: false},
            { choice: "None of the above", correct: false}],
    used: false
}

var question3 = {
    q: "What are variables used for in JavaScript Programs?",
    ans : [ { choice: "Storing numbers, dates, or other values", correct: true },
            { choice: "Varying randomly", correct: false },
            { choice: "Causing high-school algebra flashbacks", correct: false},
            { choice: "None of the above", correct: false}],
    used: false
}

var qArray = [];

for(var i = 1; window["question" + i] !== undefined;i++){
    qArray.push(window["question" + i]);
}

