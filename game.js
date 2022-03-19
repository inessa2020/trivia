//When they open the game, user sees Score 0 on top , button to click for Start 
// start button --> once they win it can be a start new game button again
    //event listener on the button - query by Id 
let score=0
let winScore=100
let questionIndex=0;
let gameOverTimeout;
let timeLeft=0

    
const newGame=document.getElementById("start")
newGame.addEventListener("click", startGame)
    
    
function addControl(){
        //how do i get this to happen only once per game? 
            //conditional:
    //let controls=document.getElementById("controls")
    
    const nextQue=document.getElementById("next")
    //nextQue.addEventListener("click", skip)
    if (nextQue.hasAttribute("hidden")) {
        nextQue.removeAttribute("hidden")
        nextQue.addEventListener("click", skipQuestion)
    }

    const time=document.getElementById("time")
    if (time.hasAttribute("hidden")) {
        time.removeAttribute("hidden")}
}
    
let questions=[]
//let gameRunning= false
function startGame() {
    let url=`https://opentdb.com/api.php?amount=30&category=12&difficulty=easy&type=multiple`
    //getQuestions(url)
    //fetch is asyncronous - the rest of the code isn't waiting for it and that's why i am getting errors
    //how do i change it so that this happens first and only then the rest of the function?

    //**************** alternate: return a promise? will we learn this later?

    //questions and answers
    // stretch goal- when we do easy/medium/hard will be able to add this to the properties
//sretch goal: use trivia API ~ https://opentdb.com/api_config.php (less unique due to their categories but to try use API )


    //want to run this when user presses new game to not repeat que each game
    fetch(url).then(res => res.json()).then(data => {
            // console.log(data.results)
            // questions=data.results;
            // console.log(`get que / que`+ questions)
        // let results= data.results
        // console.log(results)
        // results.forEach(result => questions.push(result))
    
            //should set the questions. why isn't it?
            //it does seem to work when you press new game tho just not start game
            //console.log(`start game / que: `+ questions)
            //why does it show this????:  start game / que: [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object O
            // the way i did it turned the array into a string
            //try SPREAD OPERATOR to avoid - it creates new array that's the same as one you are copying

        questions= [...data.results]
        //console.log(questions)

        startHelper()
    })
    .catch(err => {console.log("something went wrong...", err)})
}

function startHelper(){
    score=0
    let scoreBoard1=document.getElementById("score1")
    scoreBoard1.innerHTML=score.toString().padStart(4, '0')
    
    questionIndex=0
    //gameRunning=true
        //console.log("test")
        // start button --> new game button
    newGame.innerHTML="New Game"
    
    addControl()
    
        //question pops up
    setQuestion(questionIndex)
    setAnswers(questionIndex)
        // next question, come up

    //starting a new timer 
    gameOverTimeout=setTimeout(gameOver, 600000);
    //gameOverTimeout is like ID of time out. keep track
    setInterval(timerChange, 1000)
    timeLeft=600;
    //like a clock, calls it over and over until you clear the interval
    //every second timer change 
    setTimer(600);
}

function setQuestion(num){
    //change what is in the <p> to the question.
    //let task= document.querySelector("#questions").firstChild
    let task= document.querySelector("#questions > p") 
    //console.log(questions[num])
    task.innerHTML=questions[num].question
}
    
function setAnswers(num){
        //append the possible answers as a list
    let ansElement=document.querySelector("#answers")
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild);
        } //note from online: don't set the parent inner HTML to '' because it doesn't remove the event handlers
    
            //list for answers
    let answersForUser=[]

    let right=questions[num].correct_answer
    let emptyObj={};
    emptyObj.answer=right;
    emptyObj.status=true;
    answersForUser.push(emptyObj)
        
    let wrong=questions[num].incorrect_answers
    wrong.forEach(ans => {
        let emptyObj={};
        emptyObj.answer=ans;
        emptyObj.status=false;
        answersForUser.push(emptyObj)
    })
        
    //console.log(answersForUser)
        
    //MAKE RANDOMIZED THE ANSWER ORDER --> randomiize the elements
    answersForUser=randomizer(answersForUser)


        //for each answer, add it to the list thing. 
    answersForUser.forEach(ans => {
        let answerLi= document.createElement("li") 
        let answerButton= document.createElement("button")
        answerButton.innerHTML=ans.answer
            //for screen readers button is better than list item with event listener~ comes w. more stuff for inspecting by screen readers
        answerLi.appendChild(answerButton)
        ansElement.appendChild(answerLi)
            //still need to add some code for the screen readers to know there's new stuff 
            //would add to the div to let screen reader know there will be new controls there 


    
        // For a question, you can click the answer. 
        //event listener on the answers
            //if (ans.answers.status==true){
            //if (questions[num].answers.status==true){
        //console.log(ans)
        if (ans.status==true){
            answerButton.addEventListener("click", clickRightAnswer)
        }
        else{
            answerButton.addEventListener("click", clickWrongAnswer)
        }
        /*
        ******************************
        Why no () for the function?
        these are reference to a function, not running the function (not calling / executing)
        tells the browser, when you click it to go to that function but not right away 
        ******************************
        */
    
    /*
        //if the answer is correct --> launch correct sequence when clicked
        if (ans.answers.status=true){clickRightAnswer()}
        //if answer is incorrect --> launch incorrect sequence when clicked
        else{clickWrongAnswer()}
    */
    
        })
}

function timerChange(){
    if(timeLeft>0){
        timeLeft -= 1;
        setTimer(timeLeft)
    }
}

function setTimer(timer){
    const timeView=document.getElementById("seconds");
    timeView.innerHTML=timer;
}


    /* //MAKE RANDOMIZED THE ANSWER ORDER 
    //every question has answers, 4 answers. can make a temporary array with the order of the que / sequence of answers
    // randomizing from 0 to 3 
    //run it and assign the sequence ? 
    //iterate through items of the array and depending of the value give it an index of the answer 
    //for loop instead of for each 
    */
// those suggestions were from the office hours ^ 
function randomizer(answers){
    let originalOrder=[...answers];
    //used the API site to make sure questions are MC not t/f so there's always 4
    numbers=[0,1,2,3]
    let randOne= numbers[Math.floor(Math.random()*numbers.length)]
    let randTwo= numbers[Math.floor(Math.random()*numbers.length)]
    //console.log(originalOrder[randOne]);
    //console.log(randOne, randTwo)
    //https://flaviocopes.com/javascript-swap-array-elements/
    //[originalOrder[randOne],originalOrder[randTwo]]=[originalOrder[randTwo],originalOrder[randOne]]
    //^ printing after this gives: [object Error]
    let tempHold= originalOrder[randOne]
    originalOrder[randOne]=originalOrder[randTwo]
    originalOrder[randTwo]=tempHold
    //console.log(`changed order: ` + originalOrder) 
    //gives "changed order: [object Object],[object Object],[object Object],[object Object]" 
    //BUT code seems to be working. 
    //console.log(originalOrder[0]) 
    return originalOrder;
  }

    
    
    // It will tell you if you were right.
        //color change on the right answer ?
        // points += or -= 
function clickRightAnswer(){
        // 10 points added per question (for now)
    setScore(10);
    gameContinue()
}
    
function clickWrongAnswer(){
    //get it wrong, not skipping, penalty -10
    setScore(-10);
    gameContinue()
}
    
function skipQuestion(){
    setScore(-5);
    gameContinue();
}
    
function setScore(num){
        // set the state 
    score +=num
        //console.log(score)
        //render --> dom manipulation
    let scoreBoard1=document.getElementById("score1")
    
    if (score>=0){scoreBoard1.innerHTML=score.toString().padStart(4, '0')}
    else{scoreBoard1.innerHTML=`-`+ (Math.abs(score)).toString().padStart(4, '0')}
    
    // Score Tracker
        //starting with 1 player (stretch goal 2 on same computer taking turns)
        //start with 7 questions, 5 right to win ?
       
       
        //skip question --> penalty -5. shows the answer ?
}

function gameContinue(){
    if(score>=winScore){
        youWin()
            //console.log(`win`)
    }
    else{
        if(questionIndex<(questions.length-1)){
            questionIndex++
            setQuestion(questionIndex)
            setAnswers(questionIndex)
                //console.log(questionIndex)
        }
        else{
            let task= document.querySelector("#questions > p") 
            task.innerHTML=`There are no more questions.`
                //clear board
            clearBoard();
        }
    }
}
    
    // A "You Win" screen at a certain number of points.
        //preset const # points to win ex. 50 points
    
function youWin(){
    document.querySelector("#questions > p").innerHTML=`WINNER`
    clearBoard()
}

function gameOver(){
    document.querySelector("#questions > p").innerHTML=`Game Over! Out of time`
    clearBoard()
}


function clearBoard(){
        //clear board
        //get rid of skip question (no more que) 
    let ansElement=document.querySelector("#answers")
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild);
    }

    const nextQue=document.getElementById("next")
    nextQue.hidden=true

    //clear the time out before if there is one... before this one
    clearTimeout(gameOverTimeout)
    //telling the browser which time out to clear 
}


//DEBUG:
// time going too fast sometimes - only when it's not the first game! 
// time does not go back to 0 when you win or lose. It keeps counting until you press new game.