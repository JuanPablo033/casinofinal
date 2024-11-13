let winnings = [];
let opensRemaining = 5;

function openBox() {
    if (opensRemaining <= 0) {
        alert("Nie masz więcej otwarć skrzynek!");
        return;
    }

    const box = document.getElementById("box");
    const result = document.getElementById("result");
    const winningsTable = document.getElementById("winningsTable");
    const opensRemainingDisplay = document.getElementById("opensRemaining");

    // Dodaj animację
    box.classList.add("open");
    box.querySelector("#label").innerText = "Otwarte!";

    // Wylosuj nagrodę po 1.5 sekundy
    setTimeout(() => {
        const rewards = ["Złoto", "Diament", "Rubin", "Iphone 59 Ultra Super Pro MAX", "Złote pantalony", "Porsche 2137", "Numer do mojej matki: +48 883 439 098", "Teczka z sianem", "5 free spin", "100 Punktów", "500 Punktów"];
        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
        
        // Wyświetl nagrodę
        result.innerText = `Wygrałeś: ${randomReward}`;
        
        // Dodaj wygraną do tabeli
        winnings.push(randomReward);
        updateWinningsTable(winningsTable);

        // Zmniejsz liczbę otwarć
        opensRemaining--;

        // Jeśli wylosowano "5 free spin", dodaj dodatkowe otwarcia
        if (randomReward === "5 free spin") {
            opensRemaining += 5;
            alert("Zdobyłeś 5 dodatkowych otwarć skrzynki!");
        }

        // Zaktualizuj wyświetlaną liczbę otwarć
        opensRemainingDisplay.innerText = opensRemaining;

        // Resetuj skrzynkę po chwili
        setTimeout(() => {
            box.classList.remove("open");
            box.querySelector("#label").innerText = `Pozostałe otwarcia: ${opensRemaining}`;
            result.innerText = "";
        }, 3000);
    }, 1500);
}

function updateWinningsTable(table) {
    // Czyść tabelę
    table.innerHTML = "";
    winnings.forEach(winning => {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.innerText = winning;
        row.appendChild(cell);
        table.appendChild(row);
    });
}
