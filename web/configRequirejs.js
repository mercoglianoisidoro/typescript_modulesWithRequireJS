/// <reference path="../typings/index.d.ts" />
requirejs.config({
    paths: {
        "jquery": "../node_modules/jquery/dist/jquery",
        "dataTables": "../node_modules/datatables.net/js/jquery.dataTables"
    }
});
requirejs(["helloworld"]);
requirejs(["secondModule"]);
//example ajaxCall
requirejs(['ajaxCall', 'helloworld'], function (ajaxCall) {
    try {
        var urlTest = "http://10.0.3.110/workspaces/workspace_php/mercoglianoisidoro_api/index.php/save_data";
        var call = new ajaxCall(urlTest);
        call.setMethod('POST');
        call.setDataDoSend({ 'param1': "val1" });
        console.log('result=', call.execute());
    }
    catch (error) {
        console.error('error during call', error);
    }
});
