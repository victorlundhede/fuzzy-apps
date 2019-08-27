/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, gamePlaying, prevDice;
init();


document.querySelector(".btn-roll").addEventListener('click', () => {
    if(gamePlaying) {
        //Generate random number
        let dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice, prevDice);

        //Display the results
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = "dice-" + dice + ".png";
        // Reset score and change player IF 6 sixs are rolled in a row
        if(dice === 6 && prevDice === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }else {
            //Update the round score IF the rolled number was NOT a 1
            if (dice !== 1) {
                //Add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                prevDice = 0;
                nextPlayer();
            }
        }
        prevDice = dice;
    }
});
document.querySelector('.btn-hold').addEventListener('click', () => {
    if(gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            prevDice = 0;
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

    document.querySelector('.dice').style.display = 'none';
}
function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    prevDice = 0;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById("score-0").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('remove');
    document.querySelector('.player-1-panel').classList.remove('remove');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
