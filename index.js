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
    var action = req.body.result.action;
    
    switch(action) {
            
        case "trade_happening" : 
            var buy_sell = req.body.result.contexts[0].parameters.buy_sell.original;
            var exchange = req.body.result.contexts[0].parameters.exchange.original;
            var price_type = req.body.result.contexts[0].parameters.price_type,original;
            var product_type = req.body.result.contexts[0].parameters.product_type.original;
            var quantity = req.body.result.contexts[0].parameters.quantity.original;
            var shares = req.body.result.contexts[0].parameters.shares.original;
            var validity = req.body.result.contexts[0].parameters.validity.original;
            var scripnames = req.body.result.parameters.scripnames;
            inputText = inputText.replace(buy_sell , "");
            inputText = inputText.replace(exchange , "");
            inputText = inputText.replace(price_type , "");
            inputText = inputText.replace(product_type , "");
            inputText = inputText.replace(quantity , "");
            inputText = inputText.replace(shares , "");
            inputText = inputText.replace(validity , "");
            do{
                var temp = inputText;
                inputText = inputText.replace(" ","");
            }while(temp!=inputText);
            for(var i=0 ; i < scrips.length ; i++){
                if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
                    scripnames = scrips[i].FIELD1;
            }
            
            var exchange_scrip_match = 0;
            if(exchange !== ""){
                for(var i=0 ; i < scrips.length ; i++){
                    if(scripnames === scrips[i].FIELD1 && exchange === scrips[i].FIELD3){
                        exchange_scrip_match = 1;
                        break;
                    }
                }
            }
    }
//--------------------------------------------------------------------------------------------------------    
    for(var i=0 ; i < scrips.length ; i++){
        if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
            return res.json({
                followupEvent : {
                    data : {
                        scripnames : "Using followup event for slot filling"
                    },
                    name : "slot_fill"
                }
                /*contextOut : [{
                    name : "tradecontextout",
                    parameters : {
                        scripnames : "Scripcheck Succcesful"
                    }
                }]*/
                //speech : scrips[i].FIELD1
            });
            
    }                     
//---------------------------------------------------------------------------------------------------------------    
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
