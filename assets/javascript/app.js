/*
 * Author: Suki Sahota
 * Description: Trivia Game
 */
$(document).ready(function() {
    // GLOBAL VARIABLES
    // ============================
    let correct = 0;
    let incorrect = 0;
    let intervalId;
    let timer = 8;
    let index = -1;

    const questionsArray = ["What is the capital of California?", "What is California's state animal?",
                            "How many stars does the California state flag have?", "How big is California's economy?",
                            "California is smaller than two states. Which state below is one of the two states larger than California?"];
    const optionsArray = [["Hollywood", "Sacramento", "Los Angeles"], ["Grizzly Bear", "Bald Eagle", "Orca"],
                          ["1", "3", "2"], ["$970 Billion", "$2.9 Trillion", "$1.7 Trillion"], ["New York", "Florida", "Alaska"]];
    const answerKey = [1, 0, 0, 1, 2];


    // FUNCTIONS
    // ============================
    function loadNext() {
        // Increment our counter which determines which question we are on
        index++;
        // Check if index has gone out of bounds for the questionsArray array
        if (!(index < questionsArray.length)) {
            clearInterval(intervalId);
            $("#question").empty();
            $("#marks").empty();
            $("#marks").append(`Correct: ${ correct } `);
            $("#marks").append(`Incorrect: ${ incorrect }`);
            gameDecision();
            return;
        }

        // Prepare board for this round
        $("#marks").hide();
        $("#marks").empty();
        $(".options").show();
        
        // Dyncamically load question onto HTML
        $("#question").html("<h3>" + questionsArray[index] + "</h3>");

        // Dyncamically load options onto HTML
        $("#option-0").text(optionsArray[index][0]);
        $("#option-1").text(optionsArray[index][1]);
        $("#option-2").text(optionsArray[index][2]);
        $(".choice").show();

        // Ready timer for new round
        timer = 8;
        runQuestionTimer();
        $(".time").html("<h1>8</h1>");
        $(".time").show();
    }

    // Function to grade user's input as incorrect, correct, or out of time (which is essentially incorrect)
    function gradeUserInput(outcome) {
        // Prepare board for grade screen after a round of question
        $(".options").hide();
        $(".choice").hide();
        $(".choice").empty();
        $(".time").hide();
        $(".time").empty();
        $("#marks").show();
        // Incorrect answer
        if (outcome === 0) {
            incorrect++;
            $("#question").html("<h2> Nope! </h2>");
            $("#marks").html("<h2> The correct answer is: " + optionsArray[index][answerKey[index]] + "</h2>");
        } // Correct answer
        else if (outcome === 1) {
            $("#marks").hide();
            correct++;
            $("#question").html("<h2> Correct! </h2>");
        } // Out of time (incorrect)
        else if (outcome === 2) {
            incorrect++;
            $("#question").html("<h2> Out of Time! </h2>");
            $("#marks").html("<h2> The correct answer is: " + optionsArray[index][answerKey[index]] + "</h2>");
        }
        timer = 3;
        runGradeTimer();
    }

    // Run timer function for question and possible answers screen
    function runQuestionTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrementQuestionScreen, 1000);
    }

    // Timer decrement function for screen with question and possible answers
    function decrementQuestionScreen() {
        timer--;
        $(".time").html("<h1>" + timer + "</h1>");
        if (timer === 0) {
            clearInterval(intervalId);
            gradeUserInput(2);
        }
    }

    // Run timer function for grade screen
    function runGradeTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrementGradeScreen, 1000);
    }

    // Timer decrement function for screen when showing grade screen
    function decrementGradeScreen() {
        timer--;
        if (timer === 0) {
            clearInterval(intervalId);
            // Transition to question screen
            loadNext();
        }
    }

    function gameDecision() {
        $(".time").show();
        if (correct === 5){
            $(".time").html("<h1> Perfect score! Isn't California wonderful?! </h1>");
        } else if (correct > incorrect) {
            $(".time").html("<h1> Good try! </h1>");
        } else {
            $(".time").html("<h1> Brush up on your California Trivia and please try again! </h1>");
        }
        $("#marks").show();
    }
    

    // MAIN PROCESS
    // ============================
    $(document).on("click", ".choice", function() {
        if (parseInt($(this).attr("data-value")) === answerKey[index]) {
            gradeUserInput(1);
        } else {
            gradeUserInput(0);
        }
    });

    // Load first question onto screen
    loadNext();
});