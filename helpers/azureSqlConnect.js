'use strict'
const Request = require('tedious').Request;
const { log } = require('./log')

function executeStatement(connection) {

    return new Promise(function (resolve, reject) {


        let statement = "SELECT * FROM INFORMATION_SCHEMA.TABLES"
        log("execute Statement")
        let request = new Request(statement, function (err, rowCount, rows) {

            if (err) {
                log(err)
                reject(err)
            } else {
                log("row count = " + new String(rowCount))
                rows.forEach(row => {
                    log(JSON.stringify(row))
                });
                resolve()
            }
        })

        connection.execSql(request);

    })
}

module.exports = {
    executeStatement: executeStatement
}