
import { startTimer, cD, countDown, pauseAllAudio, playSixty, myScore, displayForm, submitScore, updatescore} from "./functions.js"

const ws = new WebSocket("ws://localhost:7070");


const p = document.getElementById('one');
const highScore = document.getElementById('hScore');
const thirty = document.getElementById('thirty');
const sixty = document.getElementById('sixty');
const ninety = document.getElementById('ninety');
const showTimer = document.getElementById('showTimer');
const tick = document.getElementById('tick');
const gameTimer = document.getElementById('gameTimer');
const myHscore = document.getElementById('hScoreAudio');
const btns = document.querySelectorAll('.btns');
const submitHscore = document.getElementById('submitHscore');
const userName = document.getElementById('userName');
var myModalBody = document.getElementById('notify');
var myModal = document.getElementById('exampleModal')
var score = 0;
var hScore = 0;
p.innerHTML = score;
var gameStarted = false;
var gameEnded;
var newHighscore = false;
var gameOver = false;
var isUserTimer = false;
var hScore30 = localStorage.getItem('highscore30');
var hScore60 = localStorage.getItem('highscore60');
var hScore90 = localStorage.getItem('highscore90');
var dept;
var is30  = false, is60 = false, is90 = false;

// default value if no timer is selected 
var userTimer  = parseInt(localStorage.getItem('userTimer'));

// setting userDefined Timer
thirty.addEventListener('click', ()=>{
    isUserTimer = true;
    userTimer = 30;
    localStorage.setItem('userTimer', 30);
    myModal.classList.remove('modal-backdrop');
    myModal.style.display = 'block !important';
    var msg = `Timer changed to ${userTimer} Seconds Press start to play! `;
    myModalBody.innerHTML = msg;
    highScore.innerHTML = localStorage.getItem('highscore30');
    gameTimer.innerHTML = userTimer;
    showTimer.innerHTML = `${userTimer}  seconds`;
});


sixty.addEventListener('click', ()=>{
    isUserTimer = true;
    userTimer = 60;
    localStorage.setItem('userTimer', 60);
    myModal.classList.remove('modal-backdrop');
    myModal.style.display = 'block !important'; 
    var msg = `Timer changed to ${userTimer} Seconds Press start to play! `;
    myModalBody.innerHTML = msg;
    playSixty();
    highScore.innerHTML = localStorage.getItem('highscore60');
    gameTimer.innerHTML = userTimer;
    showTimer.innerHTML = `${userTimer}  seconds`;
});


ninety.addEventListener('click', ()=>{
    isUserTimer = true;
    userTimer = 90;
    localStorage.setItem('userTimer', 90);
    myModal.classList.remove('modal-backdrop');
    myModal.style.display = 'block !important'; 
    var msg = `Timer changed to ${userTimer} Seconds Press start to play! `;
    myModalBody.innerHTML = msg;
    highScore.innerHTML = localStorage.getItem('highscore90');
    gameTimer.innerHTML = userTimer;
    showTimer.innerHTML =`${userTimer}  seconds`;
});


// adding eventListener to the submit buttons on Highscore
btns.forEach((button)=>{
    button.addEventListener('click', ()=>{
        let val = button.innerHTML;
        switch(val){
            case 'BCA':
                dept = 'BCA';
                break;
            case 'MCA':
                dept = 'MCA';
                break;
            case 'BA':
                dept = 'BA';
                break;
            case 'B.COM':
                dept = 'B.COM';
            break;
            case 'MBA':
                dept = 'MBA';
                break;
            case 'MA':
                dept = 'MA';
            break;
            default:
                console.log('Default option');
                break;
        }
    })
});

// on HighScore submit
// pending error handling 
submitHscore.addEventListener('click', ()=>{
    let name = userName.value;
    if(dept != '' && name != ''){
        console.log(`name : ${name}`);
        console.log(`department: ${dept}`);
        // we store the values in the local storage
        if(is30 === true){
            console.log(hScore30);
            updatescore(name, dept, hScore30);

        }else if (is60 === true){
            console.log(hScore60);
            updatescore(name, dept, hScore60);
        }else if(is90 === true){
            console.log(hScore90);
            updatescore(name, dept, hScore90);
        }else{
            console.warn("error could not retrieve the highscore from an game modes!");
        }
    } 
    else{
        console.log("Enter both your name and department!");
    }

});
// setting initial highscore localstorage values on browser load 
window.addEventListener('DOMContentLoaded', ()=>{
    highScore.innerHTML = hScore;

    // for 30 second mode
    if(!localStorage.getItem('highscore30')){
        localStorage.setItem("highscore30", hScore);
    }
    // for 60 second mode
    if(!localStorage.getItem('highscore60')){
        localStorage.setItem('highscore60', hScore);
    }
    // for 90 second mode
    if(!localStorage.getItem('highscore90')){
        localStorage.setItem('highscore90', hScore);
    }
    if(!localStorage.getItem('userHighScore30')){
        localStorage.setItem('userHighScore30', '');
    }
    if(!localStorage.getItem('userHighScore60')){
        localStorage.setItem('userHighScore60', '');
    }
    if(!localStorage.getItem('userHighScore90')){
        localStorage.setItem('userHighScore90', '');
    }

    switch(userTimer){
        case 30:
            console.log(userTimer);
            highScore.innerHTML = localStorage.getItem('highscore30');
            showTimer.innerHTML = `${userTimer}  seconds`;
            break;
        case 60:
            console.log(userTimer);
            highScore.innerHTML = localStorage.getItem('highscore60');
            showTimer.innerHTML = `${userTimer}  seconds`;
            break;
        case 90:
            console.log(userTimer);
            highScore.innerHTML = localStorage.getItem('highscore90');
            showTimer.innerHTML = `${userTimer}  seconds`;
               break;
        default:
            console.log(userTimer);
            console.log("switch case has default value");
    }

});


ws.addEventListener('open', ()=>{
    console.log("Client has connected to the server!!");
    
});


// displaying the default timer
gameTimer.innerHTML = userTimer;

if(gameEnded === "Game Over!"){
    setTimeout(()=>{
        gameTimer.innerHTML = userTimer;
    }, 4000);
}



ws.addEventListener('message',({data})=>{
        //setting state for game modes 
        switch(userTimer){
            case 30:
                is30 = true;
                is60 = false;
                is90 = false;
                break;
            case 60:
                is60 = true;
                is30 = false;
                is90 = false;
                break;
            case 90:
                is90 = true;
                is30 = false;
                is60 = false;
                break;
        }

    gameEnded = gameTimer.innerHTML;
    //user scores
    if(data.includes('1') && gameStarted === true && gameEnded != "Game Over!"){
        score += 2;
        p.innerHTML = score;
        myScore();
    
        // high score
        if((score > hScore30) && userTimer === 30){
            newHighscore = true;
            localStorage.setItem('highscore30', score);
            highScore.innerHTML = score;
            myHscore.play();
            setTimeout(()=>{
                myHscore.muted = true;
            },  4000);
        }

        else if((score > hScore60) && userTimer === 60){
            newHighscore = true;
            localStorage.setItem('highscore60', score);
            highScore.innerHTML = score;
            myHscore.play();
            setTimeout(()=>{
                myHscore.muted = true;
            },  4000);
        }

        else if((score > hScore90) && userTimer === 90){
            newHighscore = true;
            localStorage.setItem('highscore90', score);
            highScore.innerHTML = score;
            myHscore.play();
            setTimeout(()=>{
                myHscore.muted = true;
            },  4000);
        }

           if(gameEnded === "Game Over!"){
            gameOver = true;
            myModal.style.display = 'block';
            myModal.classList.remove('modal-backdrop');
        }
    };


    // start button is pressed 
    if(data.includes('s')){
        gameStarted = false;
        score = 0;
        pauseAllAudio();
        p.innerHTML = 0;
        setTimeout(()=>{
            console.log("%c Game Started!","background-color: green; font-size: 25px; text-align:center"+ "border: 1px solid orange; border-radius: 10px;"+ "padding-inline: 1%; padding-block: 1%");
        },1000);
        countDown();
        myModal.style.display = 'none';
        myModal.classList.add('modal-backdrop');

    // Game start
    cD();
    if(gameTimer.innerHTML === "Let's GO!!"){
        var gogo = setInterval(()=>{
            gameTimer.innerHTML = "Let's GO !!";
            tick.pause();
        }, 100);
        setTimeout(()=>{
            clearInterval(gogo);
        }, 4000)
     }
  
     setTimeout(()=>{
        gameStarted = true;
        startTimer(userTimer); 
    }, 3000);

  
     }  

    //  if the game ends with a new highscore 
     if(gameEnded === 'Game Over!' &&  newHighscore === true){
        // Redirect to another HTML page
       setTimeout(()=>{
        submitScore();
        displayForm();
       }, 2000);
    }
    
 
});





// on User disconnect
ws.addEventListener('close', ()=>{
    console.log("%cError: server is inactive! ", "background-color: red; font-size: 18px; text-align:center"+"border: 1px solid orange; border-radius: 10px;"+"padding-inline: 2%; padding-block: 1%;");

    console.log("%crun 'nodemon server.js' in the server Dir ","font-size: 15px;padding-inline: 3%;font-family:cursive;"+"background-color: purple; border: 1px solid purple; border-radius: 10px")
});







