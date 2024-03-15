
import { startTimer, cD, countDown, pauseAllAudio, playSixty, myScore} from "./functions.js"

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


// retrieving the highscore on browser refresh 
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
    gameEnded = gameTimer.innerHTML;
    //user scores
    if(data.includes('1') && gameStarted === true && gameEnded != "Game Over!"){
        score += 2;
        p.innerHTML = score;
        myScore();

        // high score
        if(score > hScore && userTimer === 30){
            newHighscore = true;
            localStorage.setItem('highscore30', score);
            myHscore.play();
            setTimeout(()=>{
                myHscore.muted = true;
            },  4000);
        }

        if(score > hScore && userTimer === 60){
            newHighscore = true;
            localStorage.setItem('highscore60', score);
            myHscore.play();
            setTimeout(()=>{
                myHscore.muted = true;
            },  4000);
        }
        if(score > hScore && userTimer === 90){
            newHighscore = true;
            localStorage.setItem('highscore90', score);
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
     if(gameEnded === 'Game Over!' &&  newHighscore === true){
        // Redirect to another HTML page
       setTimeout(()=>{
        window.location.href = './leaderboards.html';
       }, 5000);
    }
    
 
});





// on User disconnect
ws.addEventListener('close', ()=>{
    console.log("%cError: server is inactive! ", "background-color: red; font-size: 18px; text-align:center"+"border: 1px solid orange; border-radius: 10px;"+"padding-inline: 2%; padding-block: 1%;");

    console.log("%crun 'nodemon server.js' in the server Dir ","font-size: 15px;padding-inline: 3%;font-family:cursive;"+"background-color: purple; border: 1px solid purple; border-radius: 10px")
});







