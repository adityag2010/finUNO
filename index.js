'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

var scrips = require("./EQUITY_L.json");

restService.use(bodyParser.json());

restService.post('/finUNO', function(req, res) {
    //var inputText = req.body.result.resolvedQuery;
    return res.json({
        speech: "WTF",
        displayText: scrips[0].FIELD1;
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
