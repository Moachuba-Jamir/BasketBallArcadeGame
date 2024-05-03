import {
  startTimer,
  cD,
  countDown,
  pauseAllAudio,
  myScore,
  displayForm,
  updatescore,
  hideForm,
  updateLeaderboards,
  checkBtn,
} from "./functions.js";

const ws = new WebSocket("ws://localhost:7070");

const p = document.getElementById("one");
const highScore = document.getElementById("hScore");
const thirty = document.getElementById("thirty");
const sixty = document.getElementById("sixty");
const ninety = document.getElementById("ninety");
const showTimer = document.getElementById("showTimer");
const tick = document.getElementById("tick");
const gameTimer = document.getElementById("gameTimer");
const myHscore = document.getElementById("hScoreAudio");
const btns = document.querySelectorAll(".btns");
const submitHscore = document.getElementById("submitHscore");
const leaderModal = document.getElementById("leaderBoardModal");
const hscoreTable = document.getElementById("hscoreTable");
const userName = document.getElementById("userName");
const audio30 = document.getElementById("audio30");
const audio60 = document.getElementById("audio60");
const audio90 = document.getElementById("audio90");
const myScoreStyle = document.querySelector(".score");
const myhScoreStyle = document.querySelector(".hScore");
const press2Start = document.getElementById("press2Start");
const myLeader = document.getElementById("myleader");
const tutorial = document.querySelector(".tutorial");
const tutorial1 = document.getElementById("gameRules");
const press = document.getElementById("press");
const formContainer = document.getElementById('formContainer');
var score = 0;
var hScore = 0;
p.innerHTML = score;
var gameStarted = false;
var gameEnded;
var newHighscore = false;
var gameOver = false;
var dept;
var is30 = false,
  is60 = false,
  is90 = false;
var user30 = [],
  user60 = [],
  user90 = [];

var msg = "Press start 2 Play!",
  msg1 = "Game Started!";
var showRules = false;
var isSubmit = false;

function addHighScore(myuserTimer, myHscore) {
  let myUser = JSON.parse(localStorage.getItem(`userHighScore${myuserTimer}`));
  if (myUser === 0) {
    updatescore(0, 0, myHscore);
  } else {
    updatescore(myUser[0], myUser[1], myHscore);
  }
}
// default value if no timer is selected
var userTimer = parseInt(localStorage.getItem("userTimer"));

//leaderboards click event listener
myLeader.addEventListener("click", () => {
  press.play();
  press.currentTime = 0;
});

// adding eventListener to the submit buttons on Highscore
btns.forEach((button) => {
  button.addEventListener("click", () => {
    let val = button.innerHTML;
    switch (val) {
      case "BCA":
        dept = "BCA";
        press.play();
        press.currentTime = 0;
        break;
      case "MCA":
        dept = "MCA";
        press.play();
        press.currentTime = 0;
        break;
      case "BA":
        dept = "BA";
        press.play();
        press.currentTime = 0;
        break;
      case "B.COM":
        dept = "B.COM";
        press.play();
        press.currentTime = 0;
        break;
      case "MBA":
        dept = "MBA";
        press.play();
        press.currentTime = 0;
        break;
      case "MA":
        dept = "MA";
        press.play();
        press.currentTime = 0;
        break;
      default:
        console.log("Default option");
        break;
    }
  });
});

// userTimer
thirty.addEventListener("click", () => {
  // audio fx
  gameStarted = false;
  audio60.pause();
  audio90.pause();
  audio30.currentTime = 0;
  audio30.play();
  press.play();
  press.currentTime = 0;
  userTimer = 30;
  localStorage.setItem("userTimer", 30);
  highScore.innerHTML = localStorage.getItem("highscore30");
  let myHscore = localStorage.getItem("highscore30");
  addHighScore(userTimer, myHscore);
  gameTimer.innerHTML = userTimer;
  showTimer.innerHTML = `${userTimer}  seconds`;
  hscoreTable.classList.add("fade-in");
  setTimeout(() => {
    hscoreTable.classList.remove("fade-in");
  }, 2500);

  // disabling the timerSelection button if timer is already selected
  checkBtn(userTimer);
});

sixty.addEventListener("click", () => {
  gameStarted = false;
  // audio fx
  audio90.pause();
  audio30.pause();
  audio60.currentTime = 0;
  audio60.play();
  press.play();
  press.currentTime = 0;
  userTimer = 60;
  localStorage.setItem("userTimer", 60);
  highScore.innerHTML = localStorage.getItem("highscore60");
  let myHscore = localStorage.getItem("highscore60");
  addHighScore(userTimer, myHscore);
  gameTimer.innerHTML = userTimer;
  showTimer.innerHTML = `${userTimer}  seconds`;
  hscoreTable.classList.add("fade-in");
  setTimeout(() => {
    hscoreTable.classList.remove("fade-in");
  }, 1500);
  // disabling the timerSelection button if timer is already selected
  checkBtn(userTimer);
});

ninety.addEventListener("click", () => {
  gameStarted = false;
  //audio fx
  audio30.pause();
  audio60.pause();
  audio90.currentTime = 0;
  audio90.play();
  press.play();
  press.currentTime = 0;
  userTimer = 90;
  localStorage.setItem("userTimer", 90);
  highScore.innerHTML = localStorage.getItem("highscore90");
  let myHscore = localStorage.getItem("highscore90");
  addHighScore(userTimer, myHscore);
  gameTimer.innerHTML = userTimer;
  showTimer.innerHTML = `${userTimer}  seconds`;
  hscoreTable.classList.add("fade-in");
  setTimeout(() => {
    hscoreTable.classList.remove("fade-in");
  }, 2500);
  // disabling the timerSelection button if timer is already selected
  checkBtn(userTimer);
});

// on HighScore submit
submitHscore.addEventListener("click", () => {
  press.play();
  press.currentTime = 0;
  let name = userName.value;
  // we store the values in the local storage
  if (is30 === true) {
    let userNewScore = localStorage.getItem("highscore30");
    // error handling
    if (name != "" && dept != "") {
      updatescore(name, dept, userNewScore);
      hideForm();
      isSubmit = true;
      newHighscore = false;
    } else {
      alert("Kindly enter both your name and department....");
    }
    user30 = [];
    user30.push(name, dept);
    console.log(`from submit:  ${user30}`);
    localStorage.setItem("userHighScore30", JSON.stringify(user30));
  } else if (is60 === true) {
    let userNewScore = localStorage.getItem("highscore60");

    // error handling
    if (name != "" && dept != "") {
      updatescore(name, dept, userNewScore);
      hideForm();
      isSubmit = true;
      newHighscore = false;
    } else {
      alert("Kindly enter both your name and department....");
    }
    user30 = [];
    user60.push(name, dept);
    console.log(`from submit:  ${user60}`);
    localStorage.setItem("userHighScore60", JSON.stringify(user60));
  } else if (is90 === true) {
    let userNewScore = localStorage.getItem("highscore90");
    if (name != "" && dept != "") {
      updatescore(name, dept, userNewScore);
      hideForm();
      isSubmit = true;
      newHighscore = false;
    } else {
      alert("Kindly enter both your name and department....");
    }
    user30 = [];
    user90.push(name, dept);
    console.log(`from submit:  ${user90}`);
    localStorage.setItem("userHighScore90", JSON.stringify(user90));
  } else {
    console.warn("error could not retrieve the highscore from current game modes!");
  }

  // displayForm();
  // update the leaderboards
  updateLeaderboards();
});

// setting initial highscore localstorage values on browser load
window.addEventListener("DOMContentLoaded", () => {
  checkBtn(userTimer);
  press2Start.innerHTML = msg;

  // setting userDefined Timer

  if (is30 === true) {
    highScore.innerHTML = localStorage.getItem("highscore30");
  } else if (is60 === true) {
    highScore.innerHTML = localStorage.getItem("highscore60");
  } else {
    highScore.innerHTML = localStorage.getItem("highscore90");
  }

  // updating the leaderboards
  updateLeaderboards();

  // for 30 second mode
  if (!localStorage.getItem("highscore30")) {
    localStorage.setItem("highscore30", hScore);
  }
  // for 60 second mode
  if (!localStorage.getItem("highscore60")) {
    localStorage.setItem("highscore60", hScore);
  }
  // for 90 second mode
  if (!localStorage.getItem("highscore90")) {
    localStorage.setItem("highscore90", hScore);
  }

  // retrieving high score for diff time modes
  if (!localStorage.getItem("userHighScore30")) {
    localStorage.setItem("userHighScore30", "0");
  }
  if (!localStorage.getItem("userHighScore60")) {
    localStorage.setItem("userHighScore60", "0");
  }

  if (!localStorage.getItem("userHighScore90")) {
    localStorage.setItem("userHighScore90", "0");
  }

  switch (userTimer) {
    case 30:
      console.log(userTimer);
      highScore.innerHTML = localStorage.getItem("highscore30");
      let myHscore30 = localStorage.getItem("highscore30");
      showTimer.innerHTML = `${userTimer}  seconds`;
      addHighScore(userTimer, myHscore30);
      break;

    case 60:
      console.log(userTimer);
      highScore.innerHTML = localStorage.getItem("highscore60");
      let myHscore60 = localStorage.getItem("highscore60");
      showTimer.innerHTML = `${userTimer}  seconds`;
      addHighScore(userTimer, myHscore60);
      break;
    case 90:
      console.log(userTimer);
      highScore.innerHTML = localStorage.getItem("highscore90");
      let myHscore90 = localStorage.getItem("highscore90");
      showTimer.innerHTML = `${userTimer}  seconds`;
      addHighScore(userTimer, myHscore90);
      break;
    default:
      console.log(userTimer);
      console.log("switch case has default value");
  }
});

// adding event listener rules
tutorial1.addEventListener("click", () => {
  press.play();
  press.currentTime = 0;
  tutorial.classList.add("fade-in");
  tutorial.style.display = "block";
  tutorial1.style.pointerEvents = "none";
  setTimeout(() => {
    showRules = true;
  }, 10);
});

window.addEventListener("click", () => {
  if (showRules === true) {
    tutorial.style.display = "none";
    tutorial1.style.pointerEvents = "auto";
    showRules = false;
  }
});

ws.addEventListener("open", () => {
  console.log("Client has connected to the server!!");
});

// displaying the default timer
gameTimer.innerHTML = userTimer;

setTimeout(() => {
  gameTimer.innerHTML = userTimer;
}, 4000);

ws.addEventListener("message", ({ data }) => {
  var hScore30 = localStorage.getItem("highscore30");
  var hScore60 = localStorage.getItem("highscore60");
  var hScore90 = localStorage.getItem("highscore90");
  if (userTimer === 30) {
    highScore.innerHTML = localStorage.getItem("highscore30");
  } else if (userTimer === 60) {
    highScore.innerHTML = localStorage.getItem("highscore60");
  } else {
    highScore.innerHTML = localStorage.getItem("highscore90");
  }
  console.log(data);
  //setting state for game modes
  switch (userTimer) {
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
  if (data.includes("1") && gameStarted === true && gameEnded != "Game Over!") {
    score += 2;
    p.innerHTML = score;
    myScore();
    myScoreStyle.classList.add("neon-ball");
    setTimeout(() => {
      myScoreStyle.classList.remove("neon-ball");
    }, 800);

    // high score
    if (score > hScore30 && userTimer === 30) {
      newHighscore = true;
      localStorage.setItem("highscore30", score);
      highScore.innerHTML = score;
      myHscore.play();
      setTimeout(() => {
        myHscore.pause();
        myHscore.currentTime = 0;
      }, 2000);
    } else if (score > hScore60 && userTimer === 60) {
      newHighscore = true;
      localStorage.setItem("highscore60", score);
      highScore.innerHTML = score;
      myHscore.play();
      setTimeout(() => {
        myHscore.pause();
        myHscore.currentTime = 0;
      }, 2000);
    } else if (score > hScore90 && userTimer === 90) {
      newHighscore = true;
      localStorage.setItem("highscore90", score);
      highScore.innerHTML = score;
      myHscore.play();
      setTimeout(() => {
        myHscore.pause();
        myHscore.currentTime = 0;
      }, 2000);
    }
  }

  // start button is pressed
  if (data.includes("s")) {
    newHighscore = false;
    isSubmit = false;
    tutorial.style.display = "none";
    thirty.style.pointerEvents = "none";
    sixty.style.pointerEvents = "none";
    ninety.style.pointerEvents = "none";
    myLeader.style.pointerEvents = "none";
    press2Start.innerHTML = msg1;
    leaderModal.classList.add("fade-out");
    gameStarted = false;
    score = 0;
    pauseAllAudio();
    p.innerHTML = 0;
    setTimeout(() => {
      console.log(
        "%c Game Started!",
        "background-color: green; font-size: 25px; text-align:center" +
          "border: 1px solid orange; border-radius: 10px;" +
          "padding-inline: 1%; padding-block: 1%"
      );
    }, 1000);
    countDown();
    // Game start
    cD();
    if (gameTimer.innerHTML === "Let's GO!!") {
      var gogo = setInterval(() => {
        gameTimer.style.fontSize = "2rem";
        gameTimer.style.paddingBlock = "10%";
        gameTimer.innerHTML = "Let's GO !!";
        tick.pause();
      }, 100);
      setTimeout(() => {
        clearInterval(gogo);
        gameTimer.style.paddingBlock = "4%";
        gameTimer.style.fontSize = "4.4rem";
      }, 4000);
    }

    setTimeout(() => {
      gameStarted = true;
      startTimer(userTimer);
    }, 3000);
  }

  // if game is over :
  if (gameEnded === "Game Over!" || gameEnded === userTimer) {
    thirty.style.pointerEvents = "auto";
    sixty.style.pointerEvents = "auto";
    ninety.style.pointerEvents = "auto";
    myLeader.style.pointerEvents = "auto";
    leaderModal.classList.remove("fade-out");
    gameTimer.style.color = "black";
    gameOver = true;
    press2Start.innerHTML = "Press start 2 play Again!!";
    // myLeader.style.pointerEvents = 'auto';
    console.log(thirty.style.pointerEvents);
  }

  //  if the game ends with a new highscore
  if (gameEnded === "Game Over!" && newHighscore === true) {
    press2Start.innerHTML = "New High Score!";
  }

  if (
    gameEnded === "Game Over!" &&
    newHighscore === true &&
    isSubmit === true
  ) {
    hideForm();
  } else if (
    gameEnded === "Game Over!" &&
    newHighscore === true &&
    isSubmit === false
  ) {
    displayForm();
  }
});

// on User disconnect
ws.addEventListener("close", () => {
  console.log(
    "%cError: server is inactive! ",
    "background-color: red; font-size: 18px; text-align:center" +
      "border: 1px solid orange; border-radius: 10px;" +
      "padding-inline: 2%; padding-block: 1%;"
  );

  console.log(
    "%crun 'nodemon server.js' in the server Dir ",
    "font-size: 15px;padding-inline: 3%;font-family:cursive;" +
      "background-color: purple; border: 1px solid purple; border-radius: 10px"
  );
});
