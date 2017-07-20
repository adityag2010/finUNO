'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

var scrips = require("./EQUITY_L.json");
//const scrip_name = random.split(",");

restService.post('/finUNO', function(req, res) {
    /*var random = "buy 20microns on nse";
    return res.json({
        speech : random.toLowerCase().search((scrips[0].FIELD2).toLowerCase())
    });*/
    var inputText = req.body.result.resolvedQuery;
    var json_copy = req;
    json_copy.body.result.scripnames = "Aditya";
    json_copy.body.result.fulfillment.speech = "Hi this is Aditya";
    res.send(json_copy);
    //req.body.result.scripnames = :"aditya";
    //var inputText = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    for(var i=0;i<scrips.length;i++){
        if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
          res.send(JSON.stringify(json_copy));
            /* return res.json({
                //scripnames : scrips[i].FIELD1,
                //speech : scrips[i].FIELD1,
                displayText : scrips[i].FIELD1
                
            });*/
    }
    /*return res.json({
        speech: scrips[0].FIELD1,
        //displayText: inputText,
        //source: 'webhook-financial-assistant'
    });*/
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
