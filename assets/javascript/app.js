$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        generateHTML();
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event) {
        //answeredQuestion = true;
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event) {
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);   
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); 
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
  
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }

    function wait() {
        if (questionCounter < 6) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            resetGame();
            finalScreen();
        }
    }
    
    var startScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = ["What name did Robin go by as a Pop Star?", "Which character is known as Beercules?", "What is the name of the movie that was created based upon Ted and Stella?", "What is the name of Ted and Barney's bar?", "What color is Ted's umbrella?", "What college does Marshall attain his law degree?", "What is the only song on Barney's 'Get Psyched' mix?"];
    var answerArray = [["Robin Sparkles", "Robin Scherbatsky", "Robyn Sparklet", "Robin Glitters"], ["Ted","Marshall","Robin","Barney"], ["The Wedding Groom", "The Lost Bride", "The Wedding Bride", "The Bride Wedding"], ["Suit Up!","Was","Puzzles","Bar Bro"], ["Green", "Black", "Orange", "Yellow"], ["Colombia","Harvard","Weslyan","Yale"], ["Guns N Roses - 'Paradise City'", "Bon Jovi - 'You Give Love A Bad Name'", "Twisted Sister - 'I Wanna Rock'", "AC/DC - 'Thunderstruck"]];
    var correctAnswers = ["A. Robin Sparkles", "B. Marshall", "C. The Wedding Bride", "C. Puzzles", "D. Yellow", "A. Colombia", "B. Bon Jovi - 'You Give Love A Bad Name'"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;