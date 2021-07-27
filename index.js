let gamePattern = [];
let playerPattern = [];
let turn;
let correct;
let flash;
let aiTurn;
let intervalId;
let strict = false;
let sound = true;
let on = false;
let win;

let display = document.querySelector("#display");
let button1 = document.querySelector("#button1");
let button2 = document.querySelector("#button2");
let button3 = document.querySelector("#button3");
let button4 = document.querySelector("#button4");
let powerButton = document.querySelector("#on");
let strictButton = document.querySelector("#strict");
let startButton = document.querySelector("#start");

strictButton.addEventListener("click", (event) => {
  if (strictButton.checked == true){
    strict = true;
  } else {
    strict = false;
    
  }
});

powerButton.addEventListener("click", (event) =>{
  if (powerButton.checked == true){
  on = true;
  display.innerHTML="--";
  } else{
    on=false;
    display.innerHTML="";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener("click", (event) => {
  if (on || win ){
    play();
  }
});

function play() {
  win = false;
  gamePattern = [];
  playerPattern = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  display.innerHTML = 1;
  correct = true;
  for (var i = 0; i < 20; i++) {
    gamePattern.push(Math.floor(Math.random()*4)+1);
  }
  aiTurn = true;
  
  intervalId = setInterval(aiPlaying, 800);
};

function aiPlaying(){
  on = false;
  if (flash == turn){
    clearInterval(intervalId);
    aiTurn = false;
    clearColor();
    on = true;
  }
  
  if (aiTurn){
    clearColor();
    setTimeout(() => {
      if (gamePattern[flash]==1) one();
      if (gamePattern[flash]==2) two();
      if (gamePattern[flash]==3) three();
      if (gamePattern[flash]==4) four();
      flash++;
    }, 200);
  }
}

function clearColor() {
  button1.style.backgroundColor = "darkgreen";
  button2.style.backgroundColor = "darkred";
  button3.style.backgroundColor = "goldenrod";
  button4.style.backgroundColor = "darkblue";
};

function one(){
  if (sound){
    let audio = document.querySelector("#sound1");
    audio.play();  
  }
  sound = true;
  button1.style.backgroundColor = "lightgreen";
}

function two() {
  if (sound) {
    let audio = document.querySelector("#sound2");
    audio.play();
  }
  sound = true;
  button2.style.backgroundColor = "tomato";
}

function three() {
  if (sound) {
    let audio = document.querySelector("#sound3");
    audio.play();
  }
  sound = true;
  button3.style.backgroundColor = "yellow";
}

function four() {
  if (sound) {
    let audio = document.querySelector("#sound4");
    audio.play();
  }
  sound = true;
  button4.style.backgroundColor = "lightskyblue";
}

button1.addEventListener("click", (event)=>{
  if (on){
    playerPattern.push(1);
    check();
    one();
    if (!win) {
      setTimeout(()=> {
        clearColor();
      }, 300);
    }
  } 
});

button2.addEventListener("click", (event)=>{
  if (on){
    playerPattern.push(2);
    check();
    two();
    if (!win) {
      setTimeout(()=> {
        clearColor();
      }, 300);
    }
  } 
});

button3.addEventListener("click", (event)=>{
  if (on){
    playerPattern.push(3);
    check();
    three();
    if (!win) {
      setTimeout(()=> {
        clearColor();
      }, 300);
    }
  } 
});

button4.addEventListener("click", (event)=>{
  if (on){
    playerPattern.push(4);
    check();
    four();
    if (!win) {
      setTimeout(()=> {
        clearColor();
      }, 300);
    }
  } 
})

function check() {
  if (playerPattern[playerPattern.length-1] != gamePattern[playerPattern.length-1]) {
    correct = false
  };
  if (playerPattern.length == 20 && correct) {
    winGame();
  };
  if (correct == false){
    flashColor();
    display.innerHTML="NO!";
    setTimeout(() => {
      display.innerHTML=turn;
      clearColor();

      if (strict){
        play();
      } else{
        aiTurn = true;
        flash =0;
        playerPattern = [];
        correct = true;
        intervalId =setInterval(aiPlaying, 800);
      }
    }, 800);
   
    sound = false;
  }
  if (turn == playerPattern.length && correct && !win){
    turn++;
    playerPattern = [];
    aiTurn = true;
    flash = 0
    display.innerHTML = turn;
    intervalId = setInterval(aiPlaying, 800)
  }
}

function winGame (){
  flashColor();
  display.innerHTML = "WIN!";
  on = false;
  win = true;
}

function flashColor() {
  button1.style.backgroundColor = "green";
  button2.style.backgroundColor = "red";
  button3.style.backgroundColor = "yellow";
  button4.style.backgroundColor = "skyblue";
};
















