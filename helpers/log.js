'use strict'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// node V8 stack trace utilities
const stackTrace = require('stack-trace');
const stackDepth = 2;

function getLoggerFileName() {
    //console.log(process.cwd());
    let trace = stackTrace.get();
    let fileName = trace[stackDepth].getFileName();
    // keep only the last part of the file name
    return String(fileName).substr(String(process.cwd()).length + 1);
}

function getLoggerLineNumber() {
    //console.log(process.cwd());
    let trace = stackTrace.get();
    return trace[stackDepth].getLineNumber();
}

function log(data) {

    let dateTime = new Date();
    var date_options = { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "Europe/Paris", hour12: false };
    //console.log ( dateTime.toLocaleTimeString("fr-FR", date_options)  + ' - ' + data);
    let strMessage = '';
    strMessage = days[dateTime.getDay()] + ', ' + months[dateTime.getMonth()] + ' ' + dateTime.getDate() + ', ' + dateTime.getFullYear();
    strMessage += ', ';
    strMessage += String('00' + dateTime.getHours()).slice(-2);
    strMessage += ':' + String('00' + dateTime.getMinutes()).slice(-2);
    strMessage += ':' + String('00' + dateTime.getSeconds()).slice(-2);
    strMessage += ' - ' + getLoggerFileName();
    strMessage += '[' + getLoggerLineNumber() + ']';
    strMessage += ' - ' + String(data);
    console.log(strMessage);
}

module.exports = {
    log: log
}



