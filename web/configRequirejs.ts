
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
