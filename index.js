'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

var random = require("./EQUITY_L.json");
//const scrip_name = random.split(",");

restService.post('/finUNO', function(req, res) {
    var inputText = req.body.result.resolvedQuery;
    //var inputText = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: random[0].FIELD1,
        displayText: inputText,
        //source: 'webhook-financial-assistant'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
