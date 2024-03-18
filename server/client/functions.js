// global variables
const gameTimer = document.getElementById("gameTimer");
var intervalId;
const playTimer = document.getElementById("timer");
const start = document.getElementById("start");
const buzzer = document.getElementById("buzzer");
const sixtyVoice = document.getElementById("sixtyVoice");
const tick = document.getElementById("tick");
const score = document.getElementById("score");
const formContainer = document.getElementById("formContainer");

const submitHscore = document.getElementById("submitHscore");
const name = document.getElementById("name");
const dept = document.getElementById("dept");
const currentHscore = document.getElementById("currentHscore");
// for updating leader boards
var table30Name = document.getElementById("30Name");
var table30Dept = document.getElementById("30dept");
var table30Score = document.getElementById("30score");

var table60Name = document.getElementById("60Name");
var table60Dept = document.getElementById("60dept");
var table60Score = document.getElementById("60score");

var table90Name = document.getElementById("90Name");
var table90Dept = document.getElementById("90dept");
var table90Score = document.getElementById("90score");

const thirty = document.getElementById("thirty");
const sixty = document.getElementById("sixty");
const ninety = document.getElementById("ninety");
const myLeader = document.getElementById("myleader");


// game functions
export function startTimer(userTimer) {
  if (intervalId) clearInterval(intervalId);
  var timer = userTimer;
  intervalId = setInterval(() => {
    timer -= 1;
    if (timer >= 0) {
      gameTimer.innerHTML = timer;
      if (timer >= 11) {
        tick.play();
        playTimer.pause();
      } else {
        playTimer.play();
        tick.pause();
      }
    } else if (timer < 0) {
      clearInterval(intervalId);
      gameTimer.style.fontSize = "2rem";
      gameTimer.style.paddingBlock = "10%";
      gameTimer.innerHTML = "Game Over!";
      pauseAllAudio();
      buzzer.play();
      console.log(
        "%c Game Over!",
        "background-color: purple; font-size: 25px; text-align:center" +
          "border: 1px solid orange; border-radius: 10px; margin-block:10px;" +
          "padding-inline: 1%; padding-block: 2%"
      );
    }
  }, 1000);
}

export function updatescore(userName, userDept, score) {

  if (userName === 0 && userDept === 0) {
    name.innerHTML = "------";
    dept.innerHTML = "------";
    currentHscore.innerHTML = score;
  } else {
    name.innerHTML = userName;
    dept.innerHTML = userDept;
    currentHscore.innerHTML = score;
  }
}

export function cD() {
  gameTimer.innerHTML = "Let's GO!!";
}

//audio
export function countDown() {
  start.play();
}

export function pauseAllAudio() {
  start.pause();
  start.currentTime = 0;
  playTimer.pause();
  playTimer.currentTime = 0;
  buzzer.pause();
  buzzer.currentTime = 0;
  tick.pause();
  tick.currentTime = 0;
}

export function myScore() {
  score.play();
}

export function displayForm() {
  formContainer.style.display = "flex";
  formContainer.style.alignItems = "center";
  formContainer.style.justifyContent = "center";
}

export function hideForm() {
  formContainer.style.display = "none";
  formContainer.style.visibility = "hidden";
}

export function updateLeaderboards() {
  var for30 = localStorage.getItem('highscore30');
  var for60 = localStorage.getItem('highscore60');
  var for90 = localStorage.getItem('highscore90');

  var user30 = JSON.parse(localStorage.getItem('userHighScore30'));
  var user60 = JSON.parse(localStorage.getItem("userHighScore60"));
  var user90 = JSON.parse(localStorage.getItem("userHighScore90"));

  if (user30 != 0) {
      table30Name.innerHTML = user30[0];
      table30Dept.innerHTML = user30[1];
      table30Score.innerHTML = for30;
  } else {
      table30Name.innerHTML = '-----';
      table30Dept.innerHTML = '-----';
      table30Score.innerHTML = '-----';
  }

  if (user60 != 0) {
    table60Name.innerHTML = user60[0];
    table60Dept.innerHTML = user60[1];
    table60Score.innerHTML = for60;
  } else {
      table60Name.innerHTML = "-----";
      table60Dept.innerHTML = "-----";
      table60Score.innerHTML = "-----";
}

  if (user90 != 0) {
    table90Name.innerHTML = user90[0];
    table90Dept.innerHTML = user90[1];
    table90Score.innerHTML = for90;
  } else {
     table90Name.innerHTML = "-----";
     table90Dept.innerHTML = "-----";
     table90Score.innerHTML = "-----";
 }
}

export function checkBtn(myUserTimer) {
    switch (myUserTimer) {
      case 30:
        thirty.style.pointerEvents = "none";
        sixty.style.pointerEvents = "auto";
        ninety.style.pointerEvents = "auto";
        thirty.style.backgroundColor = "rgba(2, 181, 187, 0.9)";
        ninety.style.backgroundColor = "rgba(100, 1, 79, 0.74)";
        sixty.style.backgroundColor = "rgba(100, 1, 79, 0.74)";
        break;

      case 60:
        thirty.style.pointerEvents = "auto";
        sixty.style.pointerEvents = "none";
        ninety.style.pointerEvents = "auto";
        thirty.style.backgroundColor = "rgba(100, 1, 79, 0.74)";
        ninety.style.backgroundColor = "rgba(100, 1, 79, 0.74)";
        sixty.style.backgroundColor = "rgba(2, 181, 187, 0.9)";
        break;

      case 90:
        thirty.style.pointerEvents = "auto";
        sixty.style.pointerEvents = "auto";
        ninety.style.pointerEvents = "none";
        ninety.style.backgroundColor = "rgba(2, 181, 187, 0.9)";
        thirty.style.backgroundColor = "rgba(100, 1, 79, 0.74)";
        sixty.style.backgroundColor = "rgba(100, 1, 79, 0.74)";
        break;

      default:
        console.log("timer button error handling: something went wrong! ");
    }
}