
/// <reference path="../typings/index.d.ts" />

requirejs.config({
    paths: {
        "jquery": "../node_modules/jquery/dist/jquery",
        "dataTables":"../node_modules/datatables.net/js/jquery.dataTables"
    }
});


requirejs(["helloworld"]);
requirejs(["secondModule"]);
