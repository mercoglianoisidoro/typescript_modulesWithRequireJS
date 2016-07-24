define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    console.debug("helloworld loaded");
    function start(selector) {
        $(selector).html('HELLO WORLD');
    }
    exports.start = start;
    ;
    start('#test');
});
