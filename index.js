#!/usr/bin/env node
"use strict";
const { log } = require('./helpers/log')
const { executeStatement } = require('./helpers/azureSqlConnect');

const Connection = require('tedious').Connection;

const configurationData = require('./configuration.json');

log(JSON.stringify(configurationData))

var config = {
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

var connection = new Connection(config);

// Setup event handler when the connection is established. 
connection.on('connect', function (err) {
    if (err) {
        log('Error: ', err)
    } else {
        // If no error, then good to go...
        log("connection is OK")
        executeStatement(connection)
            .then(_ => {
                log("all is finished")
                connection.close()
            })
            .catch(err => {
                log(err)
            })

    }
});

connection.on('debug', function (text) {
    log(text)
});

// Initialize the connection.
connection.connect();