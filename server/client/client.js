
import { startTimer, cD, countDown, pauseAllAudio, playSixty, myScore} from "./functions.js"

const ws = new WebSocket("ws://localhost:7070");
const p = document.getElementById('one');
const highScore = document.getElementById('hScore');
const thirty = document.getElementById('thirty');
const sixty = document.getElementById('sixty');
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
// default value if no timer is selected 
var userTimer = 31;


// setting userDefined Timer
thirty.addEventListener('click', ()=>{
    userTimer = parseInt(thirty.textContent) + 1;
    myModal.classList.remove('modal-backdrop');
    myModal.style.display = 'block !important';
    var msg = `Timer changed to ${userTimer -1} Seconds Press start to play! `;
    myModalBody.innerHTML = msg;
});

sixty.addEventListener('click', ()=>{
    userTimer = parseInt(sixty.textContent) + 1;
    myModal.classList.remove('modal-backdrop');
    myModal.style.display = 'block !important'; 
    var msg = `Timer changed to ${userTimer -1} Seconds Press start to play! `;
    myModalBody.innerHTML = msg;
    playSixty();
});


// retrieving the highscore on browser refresh 
window.addEventListener('DOMContentLoaded', ()=>{
    hScore = localStorage.getItem('highscore');
    highScore.innerHTML = hScore;
});


ws.addEventListener('open', ()=>{
    console.log("Client has connected to the server!!");
    
});

// displaying the default timer
gameTimer.innerHTML = userTimer - 1;

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

        // setting high score
        if(score > hScore){
            localStorage.setItem('highscore', score);
            myHscore.play();
            setTimeout(()=>{
                myHscore.muted = true;
            },  4000);
        }

        // retrieving high score to display it 
        highScore.innerHTML = localStorage.getItem('highscore');

           if(gameEnded === "Game Over!"){
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
});



// on User disconnect
ws.addEventListener('close', ()=>{
    console.log("%cError: server is inactive! ", 
    "background-color: red; font-size: 18px; text-align:center"+
    "border: 1px solid orange; border-radius: 10px;"+
    "padding-inline: 2%; padding-block: 1%;");

    console.log("%crun 'nodemon server.js' in the server Dir ",
                "font-size: 15px;padding-inline: 3%;font-family:cursive;"+
                "background-color: purple; border: 1px solid purple; border-radius: 10px")
});







