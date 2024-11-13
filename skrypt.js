var id_zamowienia = 0;
    
function zaznaczBrak() {
    var wiersze = document.querySelectorAll("#prawy > table > tbody > tr");
    for (var i = 0; i < wiersze.length; i++) {
        var dostepnaIlosc = wiersze[i].children[2].textContent;
        if
        (dostepnaIlosc == 0) {
            wiersze[i].children[2].style.backgroundColor = "red";
        }
        else if (dostepnaIlosc > 0 && dostepnaIlosc < 5) {
            wiersze[i].children[2].style.backgroundColor = "yellow";
        }
        else {
            wiersze[i].children[2].style.backgroundColor = "Honeydew";
        }
    }
}

function aktualizuj(elem) {
    var nazwaProduktu = elem.parentElement.parentElement.children[0].textContent;
    var obecnaIlosc = parseInt(elem.parentElement.parentElement.children[2].textContent);
    var nowaIlosc = prompt("Podaj nową ilość dla produktu '" + nazwaProduktu + "':", obecnaIlosc);
    if (nowaIlosc != null) {
        if (isNaN(nowaIlosc)) {
            alert("Podana wartość nie jest liczbą!");
        }
        else {
            elem.parentElement.parentElement.children[2].textContent = nowaIlosc;
            zaznaczBrak();
        }
    }
}

function zamawiaj(elem) {
    id_zamowienia++;
    var nazwaProduktu = elem.parentElement.parentElement.children[0].textContent;
    alert("Zamówienie nr: " + id_zamowienia + " Produkt: " + nazwaProduktu);
}