let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

function initializeDeck() {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
    deck = [];
    
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }

    deck = deck.sort(() => Math.random() - 0.5);  // Tasowanie kart
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    hand.forEach(card => {
        if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
            score += 10;
        } else if (card.value === 'A') {
            aces += 1;
            score += 11;
        } else {
            score += parseInt(card.value);
        }
    });

    while (score > 21 && aces) {
        score -= 10;
        aces -= 1;
    }

    return score;
}

function renderCards(hand, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';

    hand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = `${card.value}${card.suit}`;
        cardDiv.className = 'card';
        element.appendChild(cardDiv);
    });
}

function updateScores() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);

    document.getElementById('player-score').innerText = `Wynik: ${playerScore}`;
    document.getElementById('dealer-score').innerText = `Wynik: ${dealerScore}`;
}

function checkGameOver() {
    if (playerScore > 21) {
        document.getElementById('message').innerText = 'Gracz przegrał!';
        gameOver = true;
    } else if (dealerScore > 21) {
        document.getElementById('message').innerText = 'Krupier przegrał!';
        gameOver = true;
    } else if (dealerScore >= 17) {
        if (playerScore > dealerScore) {
            document.getElementById('message').innerText = 'Gracz wygrał!';
        } else if (playerScore === dealerScore) {
            document.getElementById('message').innerText = 'Remis!';
        } else {
            document.getElementById('message').innerText = 'Krupier wygrał!';
        }
        gameOver = true;
    }
}

function hit() {
    if (!gameOver) {
        playerHand.push(deck.pop());
        renderCards(playerHand, 'player-cards');
        updateScores();
        checkGameOver();
    }
}

function stand() {
    if (!gameOver) {
        while (dealerScore < 17) {
            dealerHand.push(deck.pop());
            renderCards(dealerHand, 'dealer-cards');
            updateScores();
        }
        checkGameOver();
    }
}

function restart() {
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    gameOver = false;
    document.getElementById('message').innerText = '';

    initializeDeck();

    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());

    renderCards(playerHand, 'player-cards');
    renderCards(dealerHand, 'dealer-cards');
    updateScores();
}

document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stand);
document.getElementById('restart').addEventListener('click', restart);

// Inicjalizacja gry
initializeDeck();
restart();
