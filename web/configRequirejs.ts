
/// <reference path="../typings/index.d.ts" />


//direct call to js function
//requirejs(["helloworld"]);
//requirejs(["secondModule"]);

//using typescript import
//require .config must be put outside this file
import helloworld = require("./helloworld");console.log(helloworld);
import secondModule = require("./secondModule");console.log(secondModule);

//import ajaxCall = require("./ajaxCall");console.log(ajaxCall);


//example ajaxCall
 // requirejs(['../dev_modules/ajaxCall/dist/ajaxCall','helloworld'], function(ajaxCall) {
 //     try {
 //         var urlTest = "http://www.mercoglianoisidoro.com/api/saved_data/json";
 //         var call = new ajaxCall(urlTest);
 //         //call.setMethod('GET'); call.setDataDoSend({'param1':"val1"})
 //         console.log('result=', call.executeSync());
 //     } catch (error) {
 //         console.error('error during call', error);
 //     }
 // });
