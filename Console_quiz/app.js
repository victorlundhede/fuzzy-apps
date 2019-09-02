//Wraps everything in an IIFI to ensure privacy and so the it does not interfere with other programmers code
(function () {
    //Builds a constructor function for the questions
    function Question(question, answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    //Creates a three questions
    let question1 = new Question("Which programming language is the best?", ["Python", "Javascript", "Java", "C++"], 1);
    let question2 = new Question("What is the most common choice in rock, paper, scissors?", ["Rock", "Paper", "Scissors"], 0);
    let question3 = new Question("Which animal is best?", ["Dogs", "Fish", "Birds", "Cats"], 3);

    //Adds questions to an array
    let questionArr = [question1, question2, question3];

    //Number to keep track of how many questions have been asked
    let qNumber = 1;

    //Function to change score with closure
    function score(){
        let sc = 0;
        return function(correct){
            if(correct) {
                sc++;
            }else{
                sc--;
            }
            return sc;
        }
    }

    let keepScore = score();
    //Adds checkAnswer method to all questions so they all have access to it
    Question.prototype.checkAnswer = function(userResponse, callback){
        let score;
        if(userResponse === "exit"){
        }else if(userResponse === this.correct){
            console.log("Correct!");
            score = callback(true);
        }else{
            console.log("FAIL! Try again");
            score = callback(false);
        }

        //Displays score after user has answered
        this.displayScore(score);
    };

    //Adds displayScore method to all questions
    Question.prototype.displayScore = function(score) {
        console.log("You have " + score + " points");
        console.log("=============================");
    };

    //Adds displayQuestion method to all questions
    Question.prototype.displayQuestion = function(){
        //Because this is a method on the question objects, this refers to the randomly choosen question
        console.log('Question ' + qNumber + ': ' + this.question);
        for(let i = 0; i < this.answers.length; i++){
            console.log(i + ': ' + this.answers[i]);
        }
        //Adds 1 to the question number
        qNumber++;
    };

    //Function that randomly chooses a question from the questionArr and asks the user to answer it
    function nextQuestion(){
        let random = Math.floor(Math.random()*questionArr.length);
        questionArr[random].displayQuestion();
        let userAnswer = prompt("What is the correct answer?");

        if(userAnswer !== "exit"){
            //userAnswer is by default a string so it needs to be converted to a number
            questionArr[random].checkAnswer(Number(userAnswer), keepScore);
            nextQuestion();
        }
    }
    nextQuestion();
})();


