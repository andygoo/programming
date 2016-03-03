try {
// STRUNTA I RADEN OVAN!

// KODEN BÖRJAR HÄR!


// f(x) = 3x - 5
function f(x) {
    return 3*x - 5;
}


// g(x) = x³ + 4x + 2
function g(x) {
    return x*x*x + 4*x + 2;
}


// square(x) = x²
function square(x) {
    return x*x;
}


// cube(x) = x³
function cube(x) {
    return x*x*x;
}


// Omkretsen av en cirkel:
// circumference(r) = 2πr
function circumference(r) {
    return 2 * pi * r;
}


// Arean av en cirkel:
// area(r) = πr²
function area(r) {
    return pi * r*r;
}




// Allt härefter ska programmet göra när vi kör det:

// Skriv ut "Hello World!" på skärmen:
print("Hello World!");


// Låt r vara 5:
r = 5;

// Låt O vara omkretsen av en cirkel med radien r:
O = circumference(r);

// Låt A vara arean av en cirkel med radien r:
A = area(r);

// Skriv ut r:
print(r);

// Skriv ut O:
print(O);

// Skriv ut A:
print(A);






// KODEN SLUTAR HÄR!












// STRUNTA I RADERNA NEDAN!
} catch (e) {
    handleError(e);
}
