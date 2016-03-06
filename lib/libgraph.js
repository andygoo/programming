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
        return 1 / dx;
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

        var xLabelTop  = canvas.height/2 + 20;
        var yLabelLeft = canvas.width /2 - 10;
        this.context.fillStyle = this.textColor;
        this.context.textAlign = "center";
        this.context.fillText( stringify(this.x_min()*4/4), canvas.width*0/8, xLabelTop );
        this.context.fillText( stringify(this.x_min()*3/4), canvas.width*1/8, xLabelTop );
        this.context.fillText( stringify(this.x_min()*2/4), canvas.width*2/8, xLabelTop );
        this.context.fillText( stringify(this.x_min()*1/4), canvas.width*3/8, xLabelTop );
        this.context.fillText( stringify(this.x_max()*1/4), canvas.width*5/8, xLabelTop );
        this.context.fillText( stringify(this.x_max()*2/4), canvas.width*6/8, xLabelTop );
        this.context.fillText( stringify(this.x_max()*3/4), canvas.width*7/8, xLabelTop );
        this.context.fillText( stringify(this.x_max()*4/4), canvas.width*8/8, xLabelTop );
        this.context.textAlign = "right";
        this.context.textBaseline = "middle";
        this.context.fillText( stringify(this.y_min()*4/4), yLabelLeft, canvas.height*8/8 );
        this.context.fillText( stringify(this.y_min()*3/4), yLabelLeft, canvas.height*7/8 );
        this.context.fillText( stringify(this.y_min()*2/4), yLabelLeft, canvas.height*6/8 );
        this.context.fillText( stringify(this.y_min()*1/4), yLabelLeft, canvas.height*5/8 );
        this.context.fillText( stringify(this.y_max()*1/4), yLabelLeft, canvas.height*3/8 );
        this.context.fillText( stringify(this.y_max()*2/4), yLabelLeft, canvas.height*2/8 );
        this.context.fillText( stringify(this.y_max()*3/4), yLabelLeft, canvas.height*1/8 );
        this.context.fillText( stringify(this.y_max()*4/4), yLabelLeft, canvas.height*0/8 );
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
        if (this.xMax / p <= this.maxScalePrecisionRatio) {
            this.dx = p;
            console.log("Precision was set to "+p+".");
        } else {
            var fallbackPrecision = this.xMax / 1000;
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

    /*
     * Draws the graph for the specified function with the specified color.
     * If points === 1, the graph will have visible points for integer x values only.
     * If points === 2, it will have visible points for "all" x values.
     * Otherwise, it will have no visible points.
     */
    drawGraph(f, color, points) {
        console.log("Drawing "+(color||this.defaultGraphColor)+" graph"+(points ? " with points" : "")+" in interval " + this.x_min() + " < x < " + this.x_max()+"...");
        var x, x_int;
        var dx = this.dx;
        var cf = GraphSheet.correctionFactor(dx);
        this.setColor(color);
        this.context.beginPath();
        // *2 so the graph does not appear cut off at the edges:
        for (x_int = Math.floor(this.x_min())*2*cf; x_int <= Math.ceil(this.x_max())*2*cf; x_int++) {
            x = x_int/cf;
            this._drawLine(x, f(x));
        }
        this.context.stroke();
        if (points === 1) {
            // Draw points only for integer x values:
            for (x_int = Math.floor(this.x_min())*2*cf; x_int <= Math.ceil(this.x_max())*2*cf; x_int++) {
                x = x_int/cf;
                if (isInt(x)) {
                    this._drawPoint(x, f(x));
                }
            }
        } else if (points === 2) {
            // Draw points for all x values:
            for (x_int = Math.floor(this.x_min())*2*cf; x_int <= Math.ceil(this.x_max())*2*cf; x_int++) {
                x = x_int/cf;
                this._drawPoint(x, f(x));
            }
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

var canvas = document.getElementById("canvas");
if (canvas instanceof HTMLCanvasElement) {
    var exampleSheet = new GraphSheet(canvas);
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
