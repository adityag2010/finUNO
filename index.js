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
            
        case "trade_happening" : //case statement--------------------------------------
            
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
            inputText = inputText.replace("TRADE" , "");
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
            break;
            
        case "holdings_scrip_specific" : //case statement-------------------------------------
            
            var scripnames = req.body.result.parameters.scripnames;
            var shares = req.body.result.parameters.shares;
            inputText = inputText.toUpperCase();
            inputText = inputText.replace(shares.toUpperCase() , "");
            inputText = inputText.replace("HOLDINGS" , "");
            inputText = inputText.replace("HOLDING" , "");
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
            break;
            
        case "market_alert" : //case statement---------------------------------------
            
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
            inputText = inputText.replace("ALERT ME" , "");
            inputText = inputText.replace("ALERT" , "");
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
            break;
            
        case "orderbook_scrip_specific" : //case statement-----------------------------------
            
            var orderbook_fields = req.body.result.parameters.orderbook_fields;
            var scripnames = req.body.result.parameters.scripnames;
            inputText = inputText.toUpperCase();
            inputText = inputText.replace(orderbook_fields.toUpperCase() , "");
            inputText = inputText.replace("ORDERBOOK" , "");
            inputText = inputText.replace("ORDER BOOK" , "");
            inputText = inputText.replace("ORDERS" , "");
            inputText = inputText.replace("ORDER" , "");
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
            break;
            
        case "positions_scrip_specific" : //case statement--------------------------------------------
            
            var scripnames = req.body.result.parameters.scripnames;
            inputText = inputText.toUpperCase();
            inputText = inputText.replace("POSITIONS" , "");
            inputText = inputText.replace("POSITION" , "");
            for(var i=0 ; i < scrips.length ; i++){
                if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
                    scripnames = scrips[i].FIELD1;
            }
            if(scripnames === "")
                return res.json({
                    contextOut : [{
                        name : "positions_scrip_specific_contextout",
                        parameters : {
                            scripnames : scripnames
                        }
                    }]
                });
            return res.json({
                contextOut : [{
                    name : "positions_scrip_specific_contextout",
                    lifespan : 0
                },
                {
                    name : "dcb4cb9a-2a48-459f-9ee0-f5866f19c4de_id_dialog_context",
                    lifespan : 0          
                },
                {
                    name : "positions-scrip_specific_dialog_context",
                    lifespan : 0
                }],
                followupEvent : {
                    data : {
                        scripnames  : scripnames
                    },
                    name : "positions_scrip_specific_event_followup"
                }
            });
            break;
            
        case "tradebook_scrip_specific" : //case statement----------------------------------------
            var scripnames = req.body.result.parameters.scripnames;
            inputText = inputText.toUpperCase();
            inputText = inputText.replace("TRADEBOOK" , "");
            inputText = inputText.replace("TRADE BOOK" , "");
            inputText = inputText.replace("TRADES" , "");
            inputText = inputText.replace("TRADE" , "");
            for(var i=0 ; i < scrips.length ; i++){
                if((inputText.toLowerCase()).search((scrips[i].FIELD1).toLowerCase()) !== -1 || (inputText.toLowerCase()).search((scrips[i].FIELD2).toLowerCase()) !== -1)
                    scripnames = scrips[i].FIELD1;
            }
            if(scripnames === "")
                return res.json({
                    contextOut : [{
                        name : "tradebook_scrip_specific_contextout",
                        parameters : {
                            scripnames : scripnames
                        }
                    }]
                });
            return res.json({
                contextOut : [{
                    name : "tradebook_scrip_specific_contextout",
                    lifespan : 0
                },
                {
                    name : "e34d58c9-7f41-4fd5-ad1c-d4260ba38bbd_id_dialog_context",
                    lifespan : 0          
                },
                {
                    name : "tradebook-scrip_specific_dialog_context",
                    lifespan : 0
                }],
                followupEvent : {
                    data : {
                        scripnames  : scripnames
                    },
                    name : "tradebook_scrip_specific_event_followup"
                }
            });
            break;
            
        case "quotes_happening" : //case statement------------------------------------------------
            var chart_type = req.body.result.parameters.chart_type;
            var exchange = req.body.result.parameters.exchange;
            var quotes_fields = req.body.result.parameters.quotes_fields;
            var scripnames = req.body.result.parameters.scripnames;
            var exchange_possibilities = "The stock you have chosen is not available on ";
            exchange_possibilities = exchange_possibilities.concat(exchange);
            exchange_possibilities = exchange_possibilities.concat(". Please choose from the following :");
            inputText = inputText.toUpperCase();
            inputText = inputText.replace(chart_type.toUpperCase() , "");
            inputText = inputText.replace(exchange.toUpperCase() , "");
            inputText = inputText.replace(quotes_fields.toUpperCase() , "");
            inputText = inputText.replace("QUOTES" , "");
            inputText = inputText.replace("QUOTE" , "");
            inputText = inputText.replace("TODAY'S" , "");
            inputText = inputText.replace("TODAYS" , "");
            inputText = inputText.replace("TODAY" , "");
            inputText = inputText.replace("DAY" , "");
            inputText = inputText.replace("THE" , "");

    }//switch case end
});//post() method end
 
restService.listen((process.env.PORT || 8000), function() {
     console.log("Server up and listening");
     });
