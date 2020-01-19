//this is a js file of all the questions in the quiz


var question1 = {
    q: "JavaScript is interpreted by _________",
    a: { choice: "Client", correct: true },
    b: { choice: "Server", correct: false },
    c: { choice: "Object", correct: false},
    d: { choice: "None of the above", correct: false}
}

var question2 = {
    q: "JavaScript is interpreted by _________",
    a: { choice: "Client", correct: true },
    b: { choice: "Server", correct: false },
    c: { choice: "Object", correct: false},
    d: { choice: "None of the above", correct: false}
}

var qArray = [];

for(var i = 1; window["question" + i] !== undefined;i++){
    qArray.push(window["question" + i]);
}