// global variables
const gameTimer = document.getElementById('gameTimer');
var intervalId;
const playTimer = document.getElementById('timer');
const start = document.getElementById('start');
const buzzer = document.getElementById('buzzer');
const sixtyVoice = document.getElementById('sixtyVoice');
const tick = document.getElementById('tick');
const score = document.getElementById('score');
const formContainer = document.getElementById("formContainer");
const submitHscore = document.getElementById('submitHscore');


// game functions
 export function startTimer(userTimer){
    if(intervalId) clearInterval(intervalId);
    var timer = userTimer;
    intervalId =  setInterval(()=>{
        timer  -= 1;
        if (timer >= 0){
            gameTimer.innerHTML = timer;
            if(timer >= 11){
                tick.play();
                playTimer.pause();
            }else  {
                playTimer.play();
                tick.pause();
            }
         }else if(timer < 0) {
            clearInterval(intervalId);   
               gameTimer.innerHTML = "Game Over!"; 
               pauseAllAudio();
               buzzer.play();
               console.log("%c Game Over!",
               "background-color: purple; font-size: 25px; text-align:center"+
               "border: 1px solid orange; border-radius: 10px; margin-block:10px;"+
               "padding-inline: 1%; padding-block: 2%");
         } 
    }, 1000);
};



export function cD(){
    gameTimer.innerHTML = "Let's GO!!";
}

//audio 
export function countDown(){
    start.play();
}

export function pauseAllAudio(){
    start.pause();
    start.currentTime = 0;  
    playTimer.pause();
    playTimer.currentTime = 0;
    buzzer.pause();
    buzzer.currentTime = 0;
    tick.pause();
    tick.currentTime = 0;
}

export function playSixty(){
    sixtyVoice.play();
}

export function myScore(){
    score.play();
}


export function displayForm(){
    formContainer.style.display ="flex";
    formContainer.style.alignItems ="center";
    formContainer.style.justifyContent ="center";
}


export function submitScore(){
    submitHscore.addEventListener('click', ()=>{
        window.location.href='./leaderboards.html';
    })
}


