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
            if(exchange === "" || buy_sell === "" || quantity === "")
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
                       contextOut : [{
                           name : "holdings_-_scrip_specific_dialog_params_scripnames",
                           lifespan : 0
                       },
                       {
                           name : "holdings_-_scrip_specific_dialog_context",
                           lifespan : 0
                       },
                       {
                           name : "9287948f-f373-4b45-b72e-0e0d4b1332dd_id_dialog_context",
                           lifespan : 0
                       }],
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
            
        case "market_alert" :
            var alert_if = req.body.result.parameters.alert_if;
            var less_than_greater_than = req.body.result.parameters.less_than_greater_than;
            var exchange = req.body.result.parameters.exchange;
            var value = req.body.result.parameters.value;
            var scripnames = req.body.result.parameters.scripnames;
            var exchange_possibilities = "The stock you have chosen is not available on ";
            exchange_possibilities = exchange_possibilities.concat(exchange);
            exchange_possibilities = exchange_possibilities.concat(". Please choose from the following :");
            inputText = inputText.toUpperCase();
            inputText = inputText.replace(alert_if.toUpperCase() , "");
            inputText = inputText.replace(less_than_greater_than.toUpperCase() , "");
            inputText = inputText.replace(exchange.toUpperCase() , "");
            inputText = inputText.replace(value.toUpperCase() , "");
            for(var i=0 ; i < scrips.length ; i++){
                if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
                    scripnames = scrips[i].FIELD1;
            }
            if(exchange === "" || buy_sell === "" || quantity === "")
                return res.json({
                    contextOut : [{
                        name : "market_alert_contextout",
                        parameters : {
                            scripnames : scripnames
                        },
                        lifespan : 1
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
                        name : "market_alert_contextout",
                        parameters : {
                            scripnames : scripnames
                        },
                        lifespan : 1
                    }],
                    speech : exchange_possibilities,
                    displayText : exchange_possibilities
                });
            if(scripnames !== "" && exchange !== "" && alert_if !== "" && value !== "" && less_than_greater_than !== ""){
                
                return res.json({
                    contextOut : [{
                        name : "market_alert_dialog_context",
                        lifespan : 0
                        },
                        {
                        name : "f82d7c2b-f7ed-41c1-90c2-2b9d5cb5d894_id_dialog_context",
                        lifespan : 0
                        },
                        {
                        name  : "market_alert_contextout",
                        lifespan : 0    
                    }],
                    followupEvent : {
                        data : {
                            alert_if : alert_if,
                            exchange : exchange,
                            less_than_greater_than : less_than_greater_than,
                            scripnames : scripnames,
                            value : value
                        },
                        name : "market_alert_event_followup"
                    }
                });
            }
        case "orderbook_scrip_specific" :
            var orderbook_fields = req.body.result.parameters.orderbook_fields;
            var scripnames = req.body.result.parameters.scripnames;
            inputText = inputText.toUpperCase();
            inputText = inputText.replace(orderbook_fields.toUpperCase() , "");
            for(var i=0 ; i < scrips.length ; i++){
                if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
                    scripnames = scrips[i].FIELD1;
            }
            if(scripnames === "")
                return res.json({
                    contextOut : [{
                        name : "orderbook_scrip_specific_contextout",
                        parameters : {
                            scripnames : scripnames
                        }
                    }]
                });
            return res.json({
                contextOut : [{
                    name : "orderbook_scrip_specific_contextout",
                    lifespan : 0
                },
                {
                    name : "84bc8d81-4673-4cfe-8048-d83bf239f72e_id_dialog_context",
                    lifespan : 0          
                },
                {
                    name : "orderbook-scrip_specific_dialog_context",
                    lifespan : 0
                }],
                followupEvent : {
                    data : {
                        orderbook_fields : orderbook_fields,
                        scripnames  : scripnames
                    },
                    name : "orderbook_scrip_specific_event_followup"
                }
            });
            
    }//switch case end
});//post() method end
 
restService.listen((process.env.PORT || 8000), function() {
     console.log("Server up and listening");
     });
