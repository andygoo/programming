try {
// STRUNTA I RADEN OVAN!

// KODEN BÖRJAR HÄR!


// Några funktioner:

function f(x) {
    return x;
}

function g(x) {
    return x*x;
}

function h(x) {
    return x*x*x;
}




// Allt härefter ska programmet göra när vi kör det:

// Sätt maxvärdet på x:
setScale(2);

// Sätt precisionen/upplösningen på graferna:
setPrecision(0.1);

// Rita f(x):
drawGraph(f);

// Rita g(x):
drawGraph(g, "blue");

// Rita h(x):
drawGraphWithPoints(h, "green");





// KODEN SLUTAR HÄR!








// STRUNTA I RADERNA NEDAN!
} catch (e) {
    handleError(e);
}
