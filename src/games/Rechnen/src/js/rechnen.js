var punkte = 0;
var runden = 0;
var level = 1;
var ergebnis;

stelleAufgabe();

function stelleAufgabe() {
    let zahl1 = Math.ceil( Math.random() * level * 5);
    let zahl2 = Math.ceil( Math.random() * level * 5);
    let operator = level > 7 ? Math.floor( Math.random()*4) : Math.floor( Math.random() * 2);
    
    runden++;
    level = punkte > 1 ? Math.floor(punkte / 2) : 1;
    
    document.getElementById("Eingabe").style.background = "white";
    document.getElementById("Eingabe").value = "";

    switch (operator) {
        case 0:
            ergebnis = addieren(zahl1, zahl2);
            break;
        case 1:
            ergebnis = subtrahieren(zahl1, zahl2);
            break;
        case 2:
            ergebnis = multiplizieren(zahl1, zahl2);
            break;
        case 3:
            ergebnis = dividieren(zahl1, zahl2);
            break;
        default:
            ausgeben("Falsch");
    }
}

function pruefeEingabe() {
    var eingabe = document.getElementById("Eingabe").value;
    if (eingabe == ergebnis) {
        document.getElementById("Eingabe").style.background = "green";
        punkte++;
        setTimeout(stelleAufgabe, 1000);
        return false;
    } else {
        document.getElementById("Eingabe").style.background = "red";
        document.getElementById("Frage").innerHTML = ergebnis;
        if(punkte > 0) punkte--;
        setTimeout(stelleAufgabe, 2500);
        return false;
    }

}

function ausgeben(text) {
    document.getElementById("Frage").innerHTML = text;
    document.getElementById("Antworten").innerHTML = `Level ${level} Punkte ${punkte} Runde ${runden}`;
}

function addieren(zahl1, zahl2) {
    while(zahl1 < level * 1.5) zahl1 = Math.ceil( Math.random() * level * 5);
    while(zahl2 < level * 1.5) zahl2 = Math.ceil( Math.random() * level * 2.5);

    ausgeben(zahl1 + " + " + zahl2);
    return zahl1 + zahl2;
}

function subtrahieren(zahl1, zahl2) {
    while(zahl1 < level * 3.5) zahl1 = Math.ceil( Math.random() * level * 5);
    while(zahl2 < level * 1.5 || zahl2 >= (zahl1 * 0.75)) zahl2 = Math.ceil( Math.random() * level * 3.5);
    
    ausgeben(zahl1 + " - " + zahl2);
    return zahl1 - zahl2;
}

function multiplizieren(zahl1, zahl2){
    while(zahl1 * zahl2 >= level * 15 || zahl1 < level/3 || zahl2 < level/3) {
        zahl1 = Math.ceil( Math.random() * level);
        zahl2 = Math.ceil( Math.random() * level);
    }

    ausgeben(zahl1 + " * " + zahl2);
    return zahl1 * zahl2;
}

function dividieren(zahl1, zahl2){
    while(Math.ceil(zahl1 / zahl2) < 3 || zahl1 < level * 2.5 || zahl2 <= Math.ceil(level / 10)) {
        zahl1 = Math.ceil( Math.random() * level * 5);
        zahl2 = Math.ceil( Math.random() * level / 2);
    }
    while(zahl1 % zahl2 != 0) zahl1++; 

    ausgeben(zahl1 + " / " + zahl2);
    return zahl1 / zahl2;
}