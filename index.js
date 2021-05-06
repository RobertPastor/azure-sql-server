#!/usr/bin/env node
"use strict";
const { log } = require('./helpers/log')
const { executeStatement } = require('./helpers/azureSqlConnect');
const { connect } = require('./helpers/azureSqlConnect')

const configurationData = require('./configuration.json');

log(JSON.stringify(configurationData))

connect(configurationData)
    .then(connection => {
        executeStatement(connection)
            .then(_ => {
                log("all is finished")
                connection.close()
            })
            .catch(err => {
                log(err)

            })
    })
    .catch(err => {
        log(err)
    })
