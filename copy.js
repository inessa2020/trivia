//When they open the game, user sees Score 0 on top , button to click for Start 
// start button --> once they win it can be a start new game button again
    //event listener on the button - query by Id 
let score=0
let winScore=30
let questionIndex=0;

//questions and answers
    // stretch goal- when we do easy/medium/hard will be able to add this to the properties
//sretch goal: use trivia API ~ https://opentdb.com/api_config.php (less unique due to their categories but to try use API )
let questions=[]
function getQuestions(url){
    fetch(url).then(res => res.json()).then(data => {
        questions=data;
        console.log(questions)
    })
        .catch(err => {console.log("something went wrong...", err)})
}
    
const newGame=document.getElementById("start")
newGame.addEventListener("click", startGame)
    
const nextQue=document.getElementById("next")
    //nextQue.addEventListener("click", skip)
    
function addControl(){
        //how do i get this to happen only once per game? 
            //conditional:
    let controls=document.getElementById("controls")
        /*
        if (controls.children.length===1){
        //if (gameRunning){
        // Next question button // skip question button once new game
            //event listener on button- query by Id 
            //this button only appears/shows when the game is started
            //wrap buttons in div. add button to controls div 
            const next=document.createElement("button") 
            next.innerHTML= "Next Question"
            next.setAttribute('id', 'next')
            document.getElementById("controls").appendChild(next)
        } */
    
    if (nextQue.hasAttribute("hidden")) {
        nextQue.removeAttribute("hidden")
        nextQue.addEventListener("click", skipQuestion)
    }
}
    
let gameRunning= false
function startGame() {
    let url=`https://opentdb.com/api.php?amount=15&category=12&difficulty=easy`
    getQuestions(url)

    score=0
    let scoreBoard1=document.getElementById("score1")
    scoreBoard1.innerHTML=score.toString().padStart(4, '0')
    
    questionIndex=0
    gameRunning=true
        //console.log("test")
        // start button --> new game button
    newGame.innerHTML="New Game"
    
    addControl()
    
        //question pops up
    setQuestion(questionIndex)
    setAnswers(questionIndex)
        // next question, come up
}

    
function setQuestion(num){
    //change what is in the <p> to the question.
    //let task= document.querySelector("#questions").firstChild
    let task= document.querySelector("#questions > p") 
    let key=num
    //console.log(questions)
    //console.log(questions.results[num].question)
    task.innerHTML=questions.results[num].question
}
    
function setAnswers(num){
        //append the possible answers as a list
    let ansElement=document.querySelector("#answers")
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild);
        } //note from online: don't set the parent inner HTML to '' because it doesn't remove the event handlers
    
            //list for answers
    let answersForUser=[]
    let right=questions.results[num].correct_answer
    let emptyObj={};
    emptyObj.answer=right;
    emptyObj.status=true;
    answersForUser.push(emptyObj)
        
    let wrong=questions.results[num].incorrect_answers
    wrong.forEach(ans => {
        let emptyObj={};
        emptyObj.answer=ans;
        emptyObj.status=false;
        answersForUser.push(emptyObj)
    })
        
    console.log(answersForUser)
        
        
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
}
    
    // Score Tracker
        //starting with 1 player (stretch goal 2 on same computer taking turns)
        //start with 7 questions, 5 right to win ?
       
       
        //skip question --> penalty -5. shows the answer ?
    
    
    /* //stretch goal? :
    function randomizer(choices){
        //to randomize questions
    }
    */
    
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
    
function clearBoard(){
        //clear board
        //get rid of skip question (no more que) 
    let ansElement=document.querySelector("#answers")
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild);
    }
    nextQue.hidden=true
}