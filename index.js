'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

var scrips = require("./EQUITY_L.json");

restService.post('/finUNO', function(req, res) {
    var inputText = req.body.result.parameters.echoText;
    return res.json({
        speech : scrips[0].FIELD1,
        displayText : "I hope this works now atleast"
    })
    /*return res.json({
        speech: inputText,
        displayText: inputText,
        source: 'webhook-financial-assistant'
    });*/
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
