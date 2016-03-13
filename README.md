![Example Text](/res/example-text.png?raw=true "Example text")

![Example Graph](/res/example-graph.png?raw=true "An example graph")



--------

# KONSTANTER


## `pi`

Talet *π* (~3.14).



## `e`

Talet *e* (~2.72).



--------

# KOMMANDON


## `print(str)`

Skriver ut `str`.

#### Exempel:
* `print("Hej!")` skriver ut `Hej!`.
* `print(5)` skriver ut `5`.
* `print(20+8)` skriver ut `28`.



## `printError(str)`

Skriver ut `str` i röd text.

#### Exempel:
* `print("Tusan!")` skriver ut `Tusan!` i röd text.



## `drawPoint(x, y, color)`

Ritar en punkt vid (`x`, `y`) med färgen `color`. Om ingen färg anges blir punkten
röd.

#### Exempel:
* `drawPoint(5, 1, "black")` ritar en svart punkt vid (5, 1).



## `drawLine(x1, y1, x2, y2, color)`

Ritar en linje från (`x1`, `y1`) till (`x2`, `y2`) med färgen `color`. Om ingen färg anges
blir linjen röd.

#### Exempel:
* `drawLine(0, 0, 5, 1, "red")` ritar en röd linje från origo till (5, 1).



## `drawGraph(f, color)`

Ritar grafen för funktionen `f` med färgen `color`. Om ingen färg anges blir grafen
röd.

#### Exempel:

    function f(x) {
        return x*x;
    }

* `drawGraph(f, "red")` ritar *f*(*x*) = *x*² med röd färg.



## `drawGraphWithPoints(f, color)`

Precis som `drawGraph`, fast med synliga punkter.



## `drawGraphWithIntPoints(f, color)`

Precis som `drawGraphWithPoints`, fast med punkter enbart då x är heltal.



## `drawDerivative(f, color)`

Ritar grafen för derivatan till funktionen `f` med färgen `color`. Om ingen färg
anges blir grafen röd.

#### Exempel:

    function f(x) {
        return x*x;
    }

* `drawDerivative(f, "green")` ritar *f* ′(*x*) = 2*x* med grön färg.



## `drawDerivativeWithPoints(f, color)`

Precis som `drawDerivative`, fast med synliga punkter.



## `drawDerivativeWithIntPoints(f, color)`

Precis som `drawDerivativeWithPoints`, fast med punkter enbart då x är heltal.



## `drawSecondDerivative(f, color)`

Ritar grafen för andraderivatan till funktionen `f` med färgen `color`. Om ingen
färg anges blir grafen röd.

#### Exempel:

    function f(x) {
        return x*x;
    }

* `drawSecondDerivative(f, "blue")` ritar *f* ″(*x*) = 2 med blå färg.



## `drawSecondDerivativeWithPoints(f, color)`

Precis som `drawSecondDerivative`, fast med synliga punkter.



## `drawSecondDerivativeWithIntPoints(f, color)`

Precis som `drawSecondDerivativeWithPoints`, fast med punkter enbart då x är
heltal.



## `saveAsImage()`

Skapar en bild av allt som ritats, som man sedan kan spara.



## `saveAsImageWithBackground(color)`

Precis som saveAsImage, fast med bakgrundsfärgen color.

#### Exempel:
* `saveAsImageWithBackground("white")` skapar en bild med vit bakgrund.



--------

# HJÄLPFUNKTIONER


## `ask(str)`

Ställer frågan `str` till användaren och returnerar svaret, eller `null` om
användaren väljer att inte svara.

#### Exempel:
* name = `ask("Vad heter du?")`
* age = `ask("Hur gammal är du?")`



## `sqrt(x)`

Returnerar kvadratroten ur `x`.

#### Exempel:
* `sqrt(25)` returnerar `5`.
* `sqrt(2)` returnerar `1.4142135623730951`.



## `isInt(n)`

Returnerar `true` om `n` är ett heltal, annars `false`.

#### Exempel:
* `isInt(5)` returnerar `true`.
* `isInt(1.5)` returnerar `false`.
* `isInt("hej")` returnerar `false`.



## `isString(str)`

Returnerar `true` om `str` är en sträng, annars `false`.

#### Exempel:
* `isString("hej")` returnerar `true`.
* `isString(15)` returnerar `false`.



## `round(n, d)`

Returnerar talet `n` avrundat till `d` decimaler.

#### Exempel:
* `round(56.31516, 2)` returnerar `56.32`.
* `round(75.00004, 1)` returnerar `75`.



## `stringify(n)`

Omvandlar talet `n` till en sträng med riktiga minustecken.

#### Exempel:
* `stringify(-45.3)` returnerar `"−45.3"`.
