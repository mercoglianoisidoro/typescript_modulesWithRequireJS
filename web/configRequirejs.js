requirejs.config({
    paths: {
        "jquery": "../node_modules/jquery/dist/jquery",
        "dataTables": "../node_modules/datatables.net/js/jquery.dataTables"
    }
});
requirejs(["helloworld"]);
requirejs(["secondModule"]);
//example ajaxCall
requirejs(["ajaxCall"], function (ajaxCall) {
    //workaround:
    ajaxCall = ajaxCall.ajaxCall;
    try {
        var urlTest = "http://localhost:3000/web/index.html";
        var call = new ajaxCall(urlTest);
        console.log('result=', call.execute());
    }
    catch (error) {
        console.error('error during call', error);
    }
});
