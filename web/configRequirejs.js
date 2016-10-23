/// <reference path="../typings/index.d.ts" />
define(["require", "exports", "./helloworld", "./secondModule"], function (require, exports, helloworld, secondModule) {
    "use strict";
    console.log(helloworld);
    console.log(secondModule);
    //import ajaxCall = require("./ajaxCall");console.log(ajaxCall);
    //example ajaxCall
    requirejs(['ajaxCall', 'helloworld'], function (ajaxCall) {
        try {
            var urlTest = "http://www.mercoglianoisidoro.com/api/saved_data/json";
            var call = new ajaxCall(urlTest);
            //call.setMethod('GET');         call.setDataDoSend({'param1':"val1"})
            console.log('result=', call.executeSync());
        }
        catch (error) {
            console.error('error during call', error);
        }
    });
});
