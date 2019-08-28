/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, gamePlaying;
init();


document.querySelector(".btn-roll").addEventListener('click', () => {
    if(gamePlaying) {
        //Generate random number
        let diceLeft = Math.floor(Math.random() * 6) + 1;
        let diceRight = Math.floor(Math.random() * 6) + 1;

        //Display the results
        let diceDOMLeft = document.querySelector('.left');
        let diceDOMRight = document.querySelector('.right');        //Loop over the two dices
        diceDOMLeft.style.display = 'block';
        diceDOMLeft.src = "dice-" + diceLeft + ".png";
        diceDOMRight.style.display = 'block';
        diceDOMRight.src = "dice-" + diceRight + ".png";

        // Reset score and change player IF 6 sixs are rolled in a row
        if(diceRight === 6 && diceLeft === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }else if (diceLeft !== 1 && diceRight !== 1) {
            //Update the round score IF the rolled number was NOT a 1
                //Add score
                roundScore += diceLeft + diceRight;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
    }
});
document.querySelector('.btn-hold').addEventListener('click', () => {
    if(gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        let input = document.querySelector("#winningScore").value;
        let winningScore;
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.left').style.display = 'none';
            document.querySelector('.right').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);
function nextPlayer(){
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.left').style.display = 'none';
    document.querySelector('.right').style.display = 'none';
}
function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.left').style.display = 'none';
    document.querySelector('.right').style.display = 'none';
    document.getElementById("score-0").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
