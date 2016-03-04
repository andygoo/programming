"use strict";

const pi = Math.PI;
const e  = Math.E;

Object.typeOf = (function typeOf(global) {
    return function(obj) {
        if (obj === global) {
            return "global";
        }
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };
})(this);

function isInt(n) {
    return Object.typeOf(n) === 'number' && n % 1 === 0;
}

function isString(s) {
    return Object.typeOf(s) === "string";
}

function round(number, decimals) {
    return Math.round(number * (Math.pow(10, decimals))) / (Math.pow(10, decimals));
}

function stringify(number) {
    return number.toString().replace(/\-/g, "−");
}

function print(str) {
	document.write("<p>" + str + "</p>");
}

function printError(str) {
	document.write('<p class="error">Error: '+str+'</p>');
}

function handleError(e) {
    console.error(e);
    printError(e.message);
}
