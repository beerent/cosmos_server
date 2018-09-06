var game_timer = 0;
var game_timer_on = true;
var breakTimer = false;

function setGameTimer($bool){
  game_timer_on = $bool;
}



function loadInnerHTML(url, pageElement) {
  try {
    req = new XMLHttpRequest();
    /* e.g. Firefox */
  } catch(e) {
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
      /* some versions IE */
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        /* some versions IE */
      } catch (e) {
        req = false;
      }
    }
  }
  req.onreadystatechange = function() {set(pageElement);};
  req.open("GET",url,true);
  req.send(null);
}

function set(pageElement) {
  if(req.status == 200) {
    output = req.responseText;
    document.getElementById(pageElement).innerHTML = output;
  }
}

function execute(url) {
  try {
    req = new XMLHttpRequest();
    /* e.g. Firefox */
  } catch(e) {
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
      /* some versions IE */
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        /* some versions IE */
      } catch (e) {
        req = false;
      }
    }
  }

  req.open("GET",url,true);
  req.send(null);
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startCountdown() {
  while(!breakTimer && game_timer_on && game_timer != 0){
    updateTimerWindow();
    await sleep(1000);
    game_timer -= 1;

  }
  if(breakTimer){
    breakTimer = false;
  }else{
    gameover();
  }
}

function updateTimerWindow(){
  element = document.getElementById('progress');
  element.innerHTML = (game_timer + " seconds remaining!");
}

function playGame(username){
  setGameTimer(true);
  setUsername(username);
  loadInnerHTML('./Game.php?u=' + username + "&r=" + 1, 'maindiv');
  
}

function registerAnswer(attempt_id, answer_id){
  breakTimer = true;
  execute("./registerAnswer.php?attempt_id=" + attempt_id + "&answer_id=" + answer_id, 'fakediv');
}

function gameoverWin(){
  setGameTimer(false);
  element = document.getElementById('progress');
  element.innerHTML = "YOU TRULY KNOW YOUR COSMOS!!" ;
  $("#false0").prop("disabled",true);
  $("#false1").prop("disabled",true);
  $("#false2").prop("disabled",true);
  $("#correct").prop("disabled",true);
  
  $('#forefit').css('display', 'none');
  $('#play_again').css('visibility', '');
  $('#to_leaderboard').css('visibility', '');
}

function gameover(){
  setGameTimer(false);
  element = document.getElementById('progress');
  element.innerHTML = "GAME OVER!" ;
  $("#false0").attr('class', 'btn-danger');
  $("#false0").prop("disabled",true);
  $("#false1").attr('class', 'btn-danger');
  $("#false1").prop("disabled",true);
  $("#false2").attr('class', 'btn-danger');
  $("#false2").prop("disabled",true);
  $("#correct").attr('class', 'btn-success');
  $("#correct").prop("disabled",true);
  
  $('#forefit').css('display', 'none');
  $('#play_again').css('visibility', '');
  $('#to_leaderboard').css('visibility', '');
}

function setRound(round){
  document.getElementById("round_div").innerHTML=round;
}

function GetValue(id) {
  return document.getElementById(id).value;
}

function setUsername(username){
  document.getElementById("username_points").innerHTML = username + " ";
}

function nextRound(attempt_id, round, previous_question_id, remaining_questions){
  if(remaining_questions <= 0){
    gameoverWin();
  }else{
    $('#forefit').css('display', 'block');
    $('#start').css('display', 'none');
    loadInnerHTML("./ActiveGame.php?a=" + attempt_id + "&r=" + round + "&p=" + previous_question_id, 'gamediv');
    setRound(round);
    resetGameTimer();
    updateTimerWindow();
    startCountdown();
  }
}

function AddBucket(bucketName){
  execute("./BucketHelper.php?option=add&name=" + bucketName, 'fakediv');
}

function resetGameTimer(){
  game_timer = 10;
}
