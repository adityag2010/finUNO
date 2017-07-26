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
            var buy_sell = req.body.result.parameters.buy_sell;
            var exchange = req.body.result.parameters.exchange;
            var price_type = req.body.result.parameters.price_type;
            var product_type = req.body.result.parameters.product_type;
            var quantity = req.body.result.parameters.quantity;
            var shares = req.body.result.parameters.shares;
            var validity = req.body.result.parameters.validity;
            var scripnames = req.body.result.parameters.scripnames;
            var exchange_possibilities = "The stock you have chosen is not available on ";
            exchange_possibilities = exchange_possibilities.concat(exchange);
            exchange_possibilities = exchange_possibilities.concat(". Please choose from the following :");
            inputText = inputText.toUpperCase();
            inputText = inputText.replace(buy_sell.toUpperCase() , "");
            inputText = inputText.replace(exchange.toUpperCase() , "");
            inputText = inputText.replace(price_type.toUpperCase() , "");
            inputText = inputText.replace(product_type.toUpperCase() , "");
            inputText = inputText.replace(quantity.toUpperCase() , "");
            inputText = inputText.replace(shares.toUpperCase() , "");
            inputText = inputText.replace(validity.toUpperCase() , "");
           /* do{
                var temp = inputText;
                inputText = inputText.replace(" ","");
            }while(temp!==inputText); */
            for(var i=0 ; i < scrips.length ; i++){
                if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
                    scripnames = scrips[i].FIELD1;
            }
            if(req.body.result.parameters.exchange === "" || buy_sell === "" || quantity === "")
                return res.json({
                    contextOut : [{
                        name : "tradecontextout",
                        parameters : {
                            scripnames : scripnames
                        }
                    }]
                });            
            var exchange_scrip_match = 0;
            if(exchange !== "" && scripnames !== ""){
                for(var i=0 ; i < scrips.length ; i++){
                    if(scripnames === scrips[i].FIELD1){
                        exchange_possibilities = exchange_possibilities.concat(" ");
                        exchange_possibilities = exchange_possibilities.concat(scrips[i].FIELD3);
                        if((exchange.toUpperCase()) === scrips[i].FIELD3){
                            exchange_scrip_match = 1;
                            break;
                        }
                    }
                }
            }
            if(exchange_scrip_match === 0 && scripnames !== "")
                return res.json({
                    contextOut : [{
                        name : "tradecontextout",
                        parameters : {
                            scripnames : scripnames
                        }
                    }],
                    speech : exchange_possibilities,
                    displayText : exchange_possibilities
                });
            if(scripnames !== "" && exchange !== "" && buy_sell !== "" && quantity !== ""){
                
                return res.json({
                    contextOut : [{
                        name : "trade_dialog_context",
                        lifespan : 0
                        },
                        {
                        name : "a044aca4-554d-4acb-a8cf-ce1ac6c1f625_id_dialog_context",
                        lifespan : 0  
                        },
                        {
                        name : "trade_dialog_params_scripnames1",
                        lifespan : 0    
                        },
                        {
                        name : "tradecontextout",
                        lifespan : 0    
                        },
                        {
                            name : "trade_dialog_params_exchange",
                            lifespan : 0
                    }],
                    followupEvent : {
                        data : {
                            buy_sell : buy_sell,
                            exchange : exchange,
                            quantity : quantity,
                            scripnames : scripnames,
                            price_type : price_type,
                            product_type : product_type,
                            validity : validity,
                            shares : shares
                        },
                        name : "trade_slot_fill"
                    }
                });
            }
        case "holdings_scrip_specific" :
            var scripnames = req.body.result.parameters.scripnames;
            var shares = req.body.result.parameters.shares;
            inputText = inputText.toUpperCase();
            //inputText = inputText.replace(scripnames.toUpperCase() , "");
            inputText = inputText.replace(shares.toUpperCase() , "");
           /* do{
                var temp = inputText;
                inputText = inputText.replace(" ","");
            }while(temp!==inputText);*/
            for(var i=0 ; i < scrips.length ; i++){
               if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1){
                   scripnames = scrips[i].FIELD1;
                   return res.json({
                       followupEvent : {
                           data : {
                               scripnames : scripnames,
                               shares : shares
                           },
                           name : "holdings_scrip_specific_event_followup"
                       }
                   });
               }
            }
            
    }
});
 
restService.listen((process.env.PORT || 8000), function() {
     console.log("Server up and listening");
     });
