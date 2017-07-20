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
    var json_copy = req;
    var random = json_copy.body.result.resolvedQuery;
    json_copy.body.result.parameters.scripnames = "Aditya";
    //random = json_copy.body.result.parameters.scripnames;
    //res = json_copy;
    
    for(var i=0;i<scrips.length;i++){
        if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
            return res.json({
              /*  result : {
                    parameters : {
                        scripnames : "Aditya"
                    },
                    fulfillment : {
                        speech : scrip[i].FIELD1,
                        displayText : inputText
                    }*/
                speech : scrip[i].FIELD1
            });
            
    }                     
     return res.json({
        tradeContextOut : {
         scripnames : "Aditya"
        } 
        speech: "Random stuff......",
        displayText: scrips[0].FIELD1,
        source : random
    });
});
 
restService.listen((process.env.PORT || 8000), function() {
     console.log("Server up and listening");
     });
