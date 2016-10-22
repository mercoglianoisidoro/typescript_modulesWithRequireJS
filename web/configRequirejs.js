/// <reference path="../typings/index.d.ts" />
define(["require", "exports", "./helloworld", "./secondModule"], function (require, exports, helloworld, secondModule) {
    "use strict";
    console.log(helloworld);
    console.log(secondModule);
});
//import ajaxCall = require("./ajaxCall");console.log(ajaxCall);
//example ajaxCall
// requirejs(['ajaxCall','helloworld'], function(ajaxCall) {
//
//     try {
//         var urlTest = "http://10.0.3.110/workspaces/workspace_php/mercoglianoisidoro_api/index.php/save_data";
//
//         var call = new ajaxCall(urlTest);
//         call.setMethod('POST');
//         call.setDataDoSend({'param1':"val1"})
//
//         console.log('result=', call.execute());
//     } catch (error) {
//         console.error('error during call', error);
//     }
// });
