try {
// STRUNTA I RADEN OVAN!

// KODEN BÖRJAR HÄR!


// sum(n) = summan av alla tal från 0 upp till n
function sum(n) {
    // Kolla om n är mindre än 0:
    if (n < 0) {
        // n är mindre än 0; skriv ut ett felmeddelande:
        printError("n must be positive.");
        return "";
    } else {
        // n är inte mindre än 0; räkna ut summan:
        // Låt s = 0:
        var s = 0;
        // Låt i gå från 0, 1, 2, ... till n:
        for (var i = 0; i <= n; i++) {
            // Addera i till s:
            s = s + i;
        }
        return s;
    }
}



// Allt härefter ska programmet göra när vi kör det:

n = 100;

print("The sum of all integers up to " + n + ":");

print(sum(n));



// KODEN SLUTAR HÄR!












// STRUNTA I RADERNA NEDAN!
} catch (e) {
    handleError(e);
}
