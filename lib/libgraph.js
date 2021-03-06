"use strict";

class GraphSheet {
    constructor(canvas) {
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new TypeError(canvas + " is not a canvas element.");
        }
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.dotRadius = 5;
        this.lineThickness = 4;
        this.defaultGraphColor = "red";
        this.axisColor = "rgb(100, 100, 100)";
        this.textColor = "rgb(50, 50, 50)";
        this.dx = 0.01;
        this.xMax = 4;
        this.context.font = "20px sans-serif";
        this.context.textBaseline = "middle";
        this.context.lineWidth = this.lineThickness;
        this.hackThickness = 2;
        this.hackLength = 10;
        this.maxScalePrecisionRatio = 1000;
        this.drawAxes();
    }

    static correctionFactor(dx) {
        var cf = 1;
        while (!isInt(cf * dx)) {
            cf *= 10;
        }
        return cf;
    }

    // Returns f′(x):
    deriv(f, x, dx) {
        var dx = dx || .000001;
        return (f(x+dx) - f(x)) / dx;
    }

    x_max() { return  this.xMax;    }
    x_min() { return -this.x_max(); }
    y_max() { return  this.xMax;    }
    y_min() { return -this.y_max(); }
    x_max_symmetric_int() {
        var cf = GraphSheet.correctionFactor(this.dx);
        var xmsi = 0;
        while (xmsi < this.x_max()*cf) {
            xmsi += this.dx*cf;
        }
        return xmsi;

    }
    x_min_symmetric_int() {
        return -this.x_max_symmetric_int();
    }

    setColor(color) {
        if (isString(color)) {
            this.context.fillStyle = color;
            this.context.strokeStyle = color;
        } else {
            this.context.fillStyle = this.defaultGraphColor;
            this.context.strokeStyle = this.defaultGraphColor;
        }
    }

    unsetColor() {
        this.setColor(this.defaultGraphColor);
    }

    stepSize() {
        return (this.canvas.width / 2) / this.xMax;
    }

    drawHack_x(ratio) {
        this.context.fillRect(canvas.width*ratio - this.hackThickness/2, canvas.height/2 - this.hackLength/2, this.hackThickness, this.hackLength);        
    }

    drawHack_y(ratio) {
        this.context.fillRect(canvas.width/2 - this.hackLength/2, canvas.height*ratio - this.hackThickness/2, this.hackLength, this.hackThickness);        
    }

    drawAxes() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.fillStyle = this.axisColor;
        this.context.fillRect(0, canvas.height/2 - 1, canvas.width, 2); // x axis
        this.context.fillRect(canvas.width/2 - 1, 0, 2, canvas.height); // y axis
        for (var i = 0; i <= 8; i++) {
            this.drawHack_x(i/8);
            this.drawHack_y(i/8);
        }

        var cf = GraphSheet.correctionFactor(this.dx);
        var xLabelTop  = canvas.height/2 + 20;
        var yLabelLeft = canvas.width /2 - 10;
        this.context.fillStyle = this.textColor;
        this.context.textAlign = "center";
        this.context.fillText( stringify((this.x_min()*cf*4/4) / cf), canvas.width*0/8, xLabelTop );
        this.context.fillText( stringify((this.x_min()*cf*3/4) / cf), canvas.width*1/8, xLabelTop );
        this.context.fillText( stringify((this.x_min()*cf*2/4) / cf), canvas.width*2/8, xLabelTop );
        this.context.fillText( stringify((this.x_min()*cf*1/4) / cf), canvas.width*3/8, xLabelTop );
        this.context.fillText( stringify((this.x_max()*cf*1/4) / cf), canvas.width*5/8, xLabelTop );
        this.context.fillText( stringify((this.x_max()*cf*2/4) / cf), canvas.width*6/8, xLabelTop );
        this.context.fillText( stringify((this.x_max()*cf*3/4) / cf), canvas.width*7/8, xLabelTop );
        this.context.fillText( stringify((this.x_max()*cf*4/4) / cf), canvas.width*8/8, xLabelTop );
        this.context.textAlign = "right";
        this.context.textBaseline = "middle";
        this.context.fillText( stringify((this.y_min()*cf*4/4) / cf), yLabelLeft, canvas.height*8/8 );
        this.context.fillText( stringify((this.y_min()*cf*3/4) / cf), yLabelLeft, canvas.height*7/8 );
        this.context.fillText( stringify((this.y_min()*cf*2/4) / cf), yLabelLeft, canvas.height*6/8 );
        this.context.fillText( stringify((this.y_min()*cf*1/4) / cf), yLabelLeft, canvas.height*5/8 );
        this.context.fillText( stringify((this.y_max()*cf*1/4) / cf), yLabelLeft, canvas.height*3/8 );
        this.context.fillText( stringify((this.y_max()*cf*2/4) / cf), yLabelLeft, canvas.height*2/8 );
        this.context.fillText( stringify((this.y_max()*cf*3/4) / cf), yLabelLeft, canvas.height*1/8 );
        this.context.fillText( stringify((this.y_max()*cf*4/4) / cf), yLabelLeft, canvas.height*0/8 );
    }

    translateX(x) {
        return (this.canvas.width / 2) + x * this.stepSize();
    }

    translateY(y) {
        return (this.canvas.height / 2) - y * this.stepSize();
    }

    setScale(s) {
        if (s / this.dx > this.maxScalePrecisionRatio) {
            var fallbackPrecision = s / 1000;
            console.warn("Current precision ("+this.dx+") is too high for that scale ("+s+"). Setting precision to "+fallbackPrecision+".");
            this.dx = fallbackPrecision;
        }
        this.xMax = s;
        this.drawAxes();
        console.log("Scale was set to "+s+".");
    }

    setPrecision(p) {
        var p_rounded = round(p, 5);
        if (this.xMax / p_rounded <= this.maxScalePrecisionRatio) {
            this.dx = p_rounded;
            if (p === p_rounded) {
                console.log("Precision was set to "+p_rounded+".");
            } else {
                console.warn("Precision was set to "+p_rounded+".");
            }
        } else {
            var fallbackPrecision = this.xMax / 100;
            this.dx = fallbackPrecision;
            console.warn("That precision ("+p+") is too high for the current scale ("+this.xMax+"). Setting precision to "+fallbackPrecision+".");
        }
    }

    drawPoint(x, y, color) {
        this.setColor(color);
        this._drawPoint(x, y);
    }

    drawLine(x1, y1, x2, y2, color) {
        this.setColor(color);
        this.context.beginPath();
        this.context.moveTo(this.translateX(x1), this.translateY(y1));
        this._drawLine(x2, y2);
        this.context.stroke();
    }

    _drawPoint(x, y) {
        this.context.beginPath();
        this.context.arc(this.translateX(x), this.translateY(y), this.dotRadius, 0, 2*pi);
        this.context.fill();
    }

    _drawLine(x2, y2) {
        this.context.lineTo(this.translateX(x2), this.translateY(y2));
    }

    // f is the function we're drawing;
    // fun specifies what will be done for every x value, e.g. draw a point at (x, f(x)) or draw a line to (x, f(x)):
    forAllXes(f, fun) {
        var x, x_int;
        var x_min_int = this.x_min_symmetric_int();
        var x_max_int = this.x_max_symmetric_int();
        var cf = GraphSheet.correctionFactor(this.dx);
        for (x_int = x_min_int; x_int <= x_max_int; x_int += this.dx*cf) {
            x = x_int/cf;
            fun.call(this, x, f(x));
        }
    }

    /*
     * Draws the graph for the specified function with the specified color.
     * If points === 1, the graph will have visible points for integer x values only.
     * If points === 2, it will have visible points for "all" x values.
     * Otherwise, it will have no visible points.
     */
    drawGraph(f, color, points) {
        var pointsStr = "";
        if (points === 1) {
            pointsStr = " with points for integer x's";
        } else if (points === 2) {
            pointsStr = " with points";
        }
        console.log("Drawing "+(color||this.defaultGraphColor)+" graph"+pointsStr+" in interval "+stringify(this.x_min())+" < x < "+stringify(this.x_max())+"...");
        var x, x_int;
        var dx = this.dx;
        var cf = GraphSheet.correctionFactor(dx);
        this.setColor(color);
        // Draw lines constituting graph:
        this.context.beginPath();
        this.forAllXes(f, this._drawLine);
        this.context.stroke();
        if (points === 1) {
            // Draw points only for integer x values:
            this.forAllXes(f, function(x) {
                if (isInt(x)) {
                    this._drawPoint(x, f(x));
                }
            });
        } else if (points === 2) {
            // Draw points for all x values:
            this.forAllXes(f, this._drawPoint);
        }
        this.unsetColor();
        console.log("Done.");
    }

    drawDerivative(f, color, points) {
        var self = this;
        var f_prim = function(x) {
            return self.deriv(f, x);
        }
        this.drawGraph(f_prim, color, points);
    }

    drawSecondDerivative(f, color, points) {
        var self = this;
        var f_prim = function(x) {
            return self.deriv(f, x);
        }
        this.drawDerivative(f_prim, color, points);
    }

    toImage(background) {
        if (isString(background)) {
            var canvasWithBackground = document.createElement("canvas");
            canvasWithBackground.width = this.canvas.width;
            canvasWithBackground.height = this.canvas.height;
            var cwbContext = canvasWithBackground.getContext("2d");
            cwbContext.fillStyle = background;
            cwbContext.fillRect(0, 0, canvasWithBackground.width, canvasWithBackground.height);
            cwbContext.drawImage(this.canvas, 0, 0);
            return canvasWithBackground.toDataURL();
        } else {
            return this.canvas.toDataURL();
        }
    }
}

var canvasID = "canvas";
var canvas = document.getElementById(canvasID);
if (canvas instanceof HTMLCanvasElement) {
    var exampleSheet = new GraphSheet(canvas);
} else {
    handleError(new Error("Could not find canvas element with ID "+canvasID+"."));
}

function drawPoint(x, y, color) {
    exampleSheet.drawPoint(x, y, color);
}

function drawLine(x1, y1, x2, y2, color) {
    exampleSheet.drawLine(x1, y1, x2, y2, color);
}

function drawGraph(f, color) {
    exampleSheet.drawGraph(f, color);
}

function drawGraphWithPoints(f, color) {
    exampleSheet.drawGraph(f, color, 2);
}

function drawGraphWithIntPoints(f, color) {
    exampleSheet.drawGraph(f, color, 1);
}

function drawDerivative(f, color) {
    exampleSheet.drawDerivative(f, color);
}

function drawDerivativeWithPoints(f, color) {
    exampleSheet.drawDerivative(f, color, 2);
}

function drawDerivativeWithIntPoints(f, color) {
    exampleSheet.drawDerivative(f, color, 1);
}

function drawSecondDerivative(f, color) {
    exampleSheet.drawSecondDerivative(f, color);
}

function drawSecondDerivativeWithPoints(f, color) {
    exampleSheet.drawSecondDerivative(f, color, 2);
}

function drawSecondDerivativeWithIntPoints(f, color) {
    exampleSheet.drawSecondDerivative(f, color, 1);
}

function setScale(s) {
    exampleSheet.setScale(s);
}

function setPrecision(p) {
    exampleSheet.setPrecision(p);
}

function saveAsImage() {
    window.open(exampleSheet.toImage());
}

function saveAsImageWithBackground(color) {
    window.open(exampleSheet.toImage((color || "white")));
}
