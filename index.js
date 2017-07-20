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
    var inputText= req.body.result.resolvedQuery;
    //var json_copy  = req;
    //json_copy.body.result.scripnames  = "Aditya";
    //res = JSON.stringify(json_copy);
    
    for(var i=0;i<scrips.length;i++){
        if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
            return res.json({
                speech : scrip[i].FIELD1,
                displayText : inputText
            });
            
    }
     return res.json({
        speech: "Random stuff......",
        displayText: scrips[0].FIELD1,
        source : inputText
    });
});
 
restService.listen((process.env.PORT || 8000), function() {
     console.log("Server up and listening");
     });
