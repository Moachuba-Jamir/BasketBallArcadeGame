// import { updateHscore } from './functions.js';


const ws = new WebSocket("ws://localhost:7070");


const p = document.getElementById('one');
const highScore = document.getElementById('hScore');
var score = 0;
var hScore = 0;
p.innerHTML = score;

// retrieving the highscore on browser refresh 
window.addEventListener('DOMContentLoaded', ()=>{
    hScore = localStorage.getItem('highscore');
    highScore.innerHTML = hScore;
});


ws.addEventListener('open', ()=>{
    console.log("The user has connected!!")
});


ws.addEventListener('message',({data})=>{
    // console.log(data);
   
    if(data == 1){
        score += 2;
        p.innerHTML = score;

        // setting high score
        if(score > hScore){
            localStorage.setItem('highscore', score);
        };

        // retrieving high score to display it 
        highScore.innerHTML = localStorage.getItem('highscore');
    };

});



