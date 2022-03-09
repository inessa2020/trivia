//When they open the game, user sees Score 0 on top , button to click for Start 
// start button --> once they win it can be a start new game button again
    //event listener on the button - query by Id 
const newGame=document.getElementById("start")
newGame.addEventListener("click", startGame)


function addControls(){
    //how do i get this to happen only once per game? 
        //conditional:
    let controls=document.getElementById("controls")
    if (controls.children.length===1){

    // Next question button // skip question button once new game
        //event listener on button- query by Id 
        //this button only appears/shows when the game is started
        //wrap buttons in div. add button to controls div 
        const next=document.createElement("button") 
        next.innerHTML= "Next Question"
        next.setAttribute('id', 'next')
        document.getElementById("controls").appendChild(next)
    }
}

function startGame() {
    //console.log("test")

    //question pops up

    // next question, come up
    addControls()

}

//questions and answers
    //array of objects
    // an object with question, right answer, other answers in an array
    // ALTERNATE: 
    //object w/ question key &  array of answers and each one is an object that has a property on it determining true/false
    // stretch goal- when we do easy/medium/hard will be able to add this to the properties
    //sretch goal: use trivia API ~ https://opentdb.com/api_config.php (less unique due to their categories but to try use API )
    let questions=[
        { question: "She was referred to as Amazing Grace due to her accomplishments and naval rank.  She developed the first compiler for an electronic computer. Who is she?",
            answers: [{answer: "Grace Hopper", status: true}, {answer: "Grace Jones", status: false}, {answer: "Grace Coolidge", status: false}] },
        { question: "Approximately how much of the time are men offered higher salaries in tech than women? (2020)",
            answers: [{answer: "3% of the time", status: false}, {answer: "59% of the time", status: true}, {answer: "47% of the time", status: false}] },
        {question: "Who is the first black women to head a Fortune 500 company, Xerox Corporation?",
            answers: [{answer: "Marion Sandler", status: false}, {answer: "Linda Wachner", status: false}, {answer: "Ursula Burns", status: true}] }
    ]


    function answerQuestion(){
    //change what is in the <p> to the question.
// For a question, you can click the answer. 
    //event listener on the answers
    //list for answers
// It will tell you if you were right.
    //color change on the right answer ?
    // points += or -= 
    }


// Score Tracker
    //starting with 1 player (stretch goal 2 on same computer taking turns)
    // 10 points added per question (for now)
    //start with 7 questions, 5 right to win
    //skip question --> penalty -5. shows the answer ?
    //get it wrong, not skipping, penalty -10-

// A "You Win" screen at a certain number of points.
    //preset const # points to win ex. 50 points