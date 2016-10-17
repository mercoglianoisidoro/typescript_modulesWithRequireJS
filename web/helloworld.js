/**
author : Isidoro Mercogliano
*/
define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    /// <reference path="../typings/index.d.ts" />
    console.debug("helloworld loaded");
    function start(selector) {
        $(selector).html('HELLO WORLD');
    }
    exports.start = start;
    ;
    start('#test');
});
