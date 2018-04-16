/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scoresPlayer, currentScore, activePlayer, gamePlaying, finalScore;

var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');
var btnNew = document.querySelector('.btn-new');
var dice1 = document.querySelector('.dice1');
var dice2 = document.querySelector('.dice2');

init();

btnRoll.addEventListener('click',function(){
    if(!gamePlaying)
    {
        return false;
    }

    var number1 = Math.floor(Math.random() * 6) + 1;
    dice1.style.display = 'block';
    dice1.src = `dice-${number1}.png`;

    var number2 = Math.floor(Math.random() * 6) + 1;
    dice2.style.display = 'block';
    dice2.src = `dice-${number2}.png`;

    if(number1 !== 1 && number2 !== 1)
    {
        currentScore += (number1 + number2);
        document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    }
    else
    {
        currentScore = 0;
        document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        nextPlayer();
        dice1.style.display = 'none';
        dice2.style.display = 'none';
    }
})

btnHold.addEventListener('click',function(){
    if(!gamePlaying)
    {
        return false;
    }
    var goal = document.getElementById("score");
    if(goal.value)
    {
        finalScore = goal.value;
    }

    scoresPlayer[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = scoresPlayer[activePlayer];
    if(scoresPlayer[activePlayer] >= finalScore)
    {
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
        document.querySelector(`#name-${activePlayer}`).textContent = "Winner !!!!";
        document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
        gamePlaying = false;
    }
    else
    {
        currentScore = 0;
        document.getElementById(`current-${activePlayer}`).textContent = '0';
        nextPlayer();
    }
    dice1.style.display = 'none';
    dice2.style.display = 'none';
})

btnNew.addEventListener('click',function(){
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove("winner");
    document.querySelector(`.player-0-panel`).classList.add("active");
    document.querySelector(`#name-0`).textContent = "Player 1";
    document.querySelector(`#name-1`).textContent = "Player 2";
    gamePlaying = true;
    init();
})

function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(`.player-0-panel`).classList.remove("active");
    document.querySelector(`.player-1-panel`).classList.remove("active");
    document.querySelector(`.player-${activePlayer}-panel`).classList.add("active");
}

function init()
{
    scoresPlayer = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    finalScore = 100;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    dice1.style.display = 'none';
    dice2.style.display = 'none';
    
}

// Code by Nam Handsome