// Copyright 2016 Keith DeLong (n8xd)
// Apache 2.0 license - http://www.apache.org/licenses/LICENSE-2.0
'use strict';
exports.handler = function( event, context ) {
   var https = require( 'https' );
   var STappID = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
   var STtoken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
   
   if (event.request.intent.name == "Sparky") {
        var Operator = event.request.intent.slots.Operator.value;
        var Device = event.request.intent.slots.Device.value;
        var url = 'https://graph.api.smartthings.com/api/smartapps/installations/' + STappID + '/' + Device + '/' + Operator + '?access_token=' + STtoken;
        https.get( url, function( response ) {
            response.on( 'data', function( data ) {
                var resJSON = JSON.parse(data);
                var speechText = "I don't understand";
                if (resJSON.talk2me) { speechText = resJSON.talk2me; }
                console.log(speechText);
                output(speechText, context);
                console.log("after the fact");
            } );
        } );
    } else {
       output("Another intent goes here.", context)
    }
};


function output( text, context ) {
   var response = {
      outputSpeech: {
         type: "PlainText",
         text: text
      },
      card: {
         type: "Simple",
         title: "System Data",
         content: text
      },
   shouldEndSession: true
   };
   context.succeed( { response: response } );
}
