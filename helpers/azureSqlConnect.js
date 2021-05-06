'use strict'
const Request = require('tedious').Request;
const Connection = require('tedious').Connection;
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

function connect(configurationData) {

    log(JSON.stringify(configurationData))
    const config = {
        server: configurationData.server, // or "localhost"

        options: {
            encrypt: true,
            database: configurationData.database,
            port: configurationData.port,
            rowCollectionOnRequestCompletion: true

        },
        authentication: {
            type: "default",
            options: {
                userName: configurationData.user,
                password: configurationData.password,
            }
        }
    };

    config.options.debug = {
        packet: true,
        data: true,
        payload: true,
        token: true,
        log: true
    }

    return new Promise(function (resolve, reject) {

        var connection = new Connection(config);

        // Setup event handler when the connection is established. 
        connection.on('connect', function (err) {
            if (err) {
                log('Error: ', err)
                reject(err)
            } else {
                // If no error, then good to go...
                log("connection is OK")
                resolve(connection)
            }
        });

        connection.on('error', function (err) {
            reject(err)
        })

        connection.on('debug', function (text) {
            log(text)
        });

        // Initialize the connection.
        connection.connect();
    })

}

module.exports = {
    executeStatement: executeStatement,
    connect: connect
}