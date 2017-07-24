'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

//var scrips = require("./EQUITY_L.json");

restService.use(bodyParser.json());

restService.post('/finUNO', function(req, res) {
    var scrips = require("./EQUITY_L.json");
    var inputText= req.body.result.resolvedQuery;
    /*var buy_sell = req.body.result.parameters.buy_sell;
    var exchange = req.body.result.parameters.exchange;
    var quantity = req.body.result.parameters.quantity;
    var price_type = req.body.result.parameters.price_type;
    var product_type = req.body.result.parameters.product_type;
    var shares = req.body.result.parameters.shares;
    var validity = req.body.result.parameters.validity;
   */
    for(var i=0 ; i < scrips.length ; i++){
        if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
            return res.json({
                contextOut : [{
                    name : "tradecontextout",
                    parameters : {
                        scripnames : "Scripcheck Succcesful"
                    }
                }]
                //speech : scrips[i].FIELD1
            });
            
    }                     
     /*return res.json({    
         followupEvent : {
             name : "trade_slot",
             data : {
                 scripnames : "Gupta"
             }
         }
     });*/
});
 
restService.listen((process.env.PORT || 8000), function() {
     console.log("Server up and listening");
     });
